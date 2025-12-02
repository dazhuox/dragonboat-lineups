// src/utils.js

/**
 * Converts a paddler's numerical height into a categorical height for trim scoring.
 * @param {string} heightCm - Paddler height in centimeters (as a string).
 * @returns {('short'|'normal'|'tall')} The height category.
 */
export const categorizeHeight = (heightCm) => {
    const height = parseInt(heightCm, 10);
    // These thresholds are approximate for competitive teams and can be fine-tuned.
    if (height < 170) return 'short'; 
    if (height >= 170 && height <= 188) return 'normal';
    return 'tall'; 
};

/**
 * Gets the relevant strength metric based on the selected race distance.
 * @param {object} paddler - The paddler object.
 * @param {string} distance - The selected race distance ('200m', '500m', '2000m').
 * @returns {number} The relevant strength rating (1-10).
 */
export const getRaceStrength = (paddler, distance) => {
    if (distance === '200m') return paddler.sprintStrength || 5; // Default to 5 if not set
    if (distance === '2000m') return paddler.enduranceStrength || 5;
    return paddler.generalStrength || 5; 
};

/**
 * Defines the preferred height category for a given seat position, based on boat trim (front-loading).
 * @param {number} position - The position number (1 is front, 10 is back).
 * @returns {('short'|'normal'|'tall')} The preferred height.
 */
export const getHeightPreference = (position) => {
    // Front (1) and back (9-10) prefer shorter paddlers to keep the nose and tail light.
    if (position === 1 || position >= 9) return 'short'; 
    // Mid-section (5-7) is the power-house trim sweet spot, preferring tall paddlers.
    if (position === 5 || position === 6 || position === 7) return 'tall'; 
    return 'normal'; // Positions 2, 3, 4, 8 are flexible/secondary power.
};

/**
 * Scores a placement based on how well the paddler's height matches the position's trim preference.
 * @param {string} paddlerHeightCm - The paddler's height.
 * @param {string} positionPreference - The preferred height category for the seat.
 * @returns {number} The height match score (positive is good, negative is bad).
 */
export const getHeightMatchScore = (paddlerHeightCm, positionPreference) => {
    const paddlerCategory = categorizeHeight(paddlerHeightCm);
    let score = 0;

    if (paddlerCategory === positionPreference) score += 10;
    
    // Penalties for poor fits (e.g., placing tall paddlers in the front/back)
    if (positionPreference === 'short' && paddlerCategory === 'tall') score -= 15;
    if (positionPreference === 'tall' && paddlerCategory === 'short') score -= 15;
    
    return score;
};

/**
 * Calculates the total weight, count, and imbalance for the current boat configuration.
 * @param {Array} positions - The array of seat positions with assigned paddlers.
 * @returns {object} The weight summary.
 */
export const calculateWeights = (positions) => {
    let leftWeight = 0;
    let rightWeight = 0;
    let leftCount = 0;
    let rightCount = 0;

    positions.forEach(pos => {
        if (pos.left) {
            leftWeight += pos.left.weight;
            leftCount++;
        }
        if (pos.right) {
            rightWeight += pos.right.weight;
            rightCount++;
        }
    });

    return { 
        leftWeight, 
        rightWeight, 
        leftCount, 
        rightCount, 
        imbalance: Math.abs(leftWeight - rightWeight) 
    };
};

/**
 * Logic to filter and group paddlers based on the selected boat configuration, 
 * enforcing gender balance where necessary.
 * @param {Array} paddlerList - The full list of paddlers.
 * @param {string} config - The selected configuration key.
 * @returns {object} { boats: Array, unassigned: Array }
 */
export const prepareBoats = (paddlerList, config) => {
    
    // Split and sort by strength (general strength is the baseline)
    const men = paddlerList.filter(p => p.gender === 'male').sort((a, b) => (b.generalStrength || 0) - (a.generalStrength || 0));
    const women = paddlerList.filter(p => p.gender === 'female').sort((a, b) => (b.generalStrength || 0) - (a.generalStrength || 0));
    const allPaddlersSorted = [...men, ...women].sort((a, b) => (b.generalStrength || 0) - (a.generalStrength || 0));

    if (config === '1_mixed_standard') {
        // Enforce 10M/10W split for the standard mixed boat (20 seats)
        const boatMen = men.slice(0, 10);
        const boatWomen = women.slice(0, 10);
        const boatPaddlers = [...boatMen, ...boatWomen];
        
        // Collect remaining unassigned paddlers
        const unassignedMen = men.slice(10);
        const unassignedWomen = women.slice(10);

        return {
            boats: [{ name: 'Boat 1 (Standard Mixed 10M/10W)', paddlers: boatPaddlers, size: 10 }],
            unassigned: [...unassignedMen, ...unassignedWomen]
        };
    }

    if (config === '2_gender_boats') {
        // Build one standard Men's boat and one standard Women's boat
        const boatMen = men.slice(0, 20);
        const boatWomen = women.slice(0, 20);

        return {
            boats: [
                { name: 'Boat M (Standard)', paddlers: boatMen, size: 10 },
                { name: 'Boat W (Standard)', paddlers: boatWomen, size: 10 }
            ],
            unassigned: [...men.slice(20), ...women.slice(20)]
        };
    }
    
    if (config === 'mixed_standard_small') {
        // Boat 1 (Standard Mixed): 10M/10W
        const boat1Men = men.slice(0, 10);
        const boat1Women = women.slice(0, 10);
        const boat1Paddlers = [...boat1Men, ...boat1Women];
        
        // Boat 2 (Small Mixed): 5M/5W (5 rows = 10 seats)
        const boat2Men = men.slice(10, 15);
        const boat2Women = women.slice(10, 15);
        const boat2Paddlers = [...boat2Men, ...boat2Women];
        
        // Collect remaining unassigned paddlers
        const unassignedMen = men.slice(15);
        const unassignedWomen = women.slice(15);
        
        return {
            boats: [
                { name: 'Boat 1 (Standard Mixed 10M/10W)', paddlers: boat1Paddlers, size: 10 },
                { name: 'Boat 2 (Small Mixed 5M/5W)', paddlers: boat2Paddlers, size: 5 }
            ],
            unassigned: [...unassignedMen, ...unassignedWomen]
        };
    }
    
    // Default fallback (e.g., if configuration is unknown)
    return { 
        boats: [{ name: 'Default Standard Boat', paddlers: allPaddlersSorted.slice(0, 20), size: 10 }], 
        unassigned: allPaddlersSorted.slice(20) 
    };
};
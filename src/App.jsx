import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Controls from './components/Controls'; 
import RosterManager from './components/RosterManager';
import OptimizationResults from './components/OptimizationResults';
import './index.css';

import BoatVisualization from './BoatVisualization'; 

import { 
    calculateWeights, 
    getRaceStrength, 
    getHeightPreference, 
    getHeightMatchScore, 
    prepareBoats 
} from './utils'; 

function App() {

    // --- Paddler Data with New Strength Metrics (1-10 Scale) ---
    const [paddlers, setPaddlers] = useState([
        // --- Left Side Paddlers ---
        // Women
        { id: 1, name: 'Alice Chen', weight: 127, handedness: 'left', role: 'pacer', height: '163', gender: 'female', sprintStrength: 8, enduranceStrength: 6, generalStrength: 7 },
        { id: 2, name: 'Bryana Sansalone', weight: 140, handedness: 'left', role: 'regular', height: '172', gender: 'female', sprintStrength: 7, enduranceStrength: 8, generalStrength: 7.5 },
        { id: 3, name: 'Cassandra Duong', weight: 125, handedness: 'left', role: 'regular', height: '162', gender: 'female', sprintStrength: 6, enduranceStrength: 7, generalStrength: 6.5 },
        { id: 4, name: 'Ceres Brunet', weight: 131, handedness: 'left', role: 'regular', height: '165', gender: 'female', sprintStrength: 6.5, enduranceStrength: 7, generalStrength: 7 },
        { id: 5, name: 'Christine Wu', weight: 123, handedness: 'left', role: 'regular', height: '161', gender: 'female', sprintStrength: 6, enduranceStrength: 6, generalStrength: 6 },
        { id: 6, name: 'Cleo Huang', weight: 149, handedness: 'left', role: 'regular', height: '175', gender: 'female', sprintStrength: 8, enduranceStrength: 7.5, generalStrength: 8 },
        { id: 7, name: 'Helen Liu', weight: 125, handedness: 'left', role: 'regular', height: '162', gender: 'female', sprintStrength: 6, enduranceStrength: 6.5, generalStrength: 6 },
        { id: 8, name: 'Holly Wei', weight: 141, handedness: 'left', role: 'regular', height: '173', gender: 'female', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 9, name: 'Lucia Zhu', weight: 110, handedness: 'left', role: 'regular', height: '155', gender: 'female', sprintStrength: 5, enduranceStrength: 6, generalStrength: 5.5 },
        { id: 10, name: 'Mandy Xiao', weight: 145, handedness: 'left', role: 'regular', height: '174', gender: 'female', sprintStrength: 8, enduranceStrength: 8, generalStrength: 8 },
        { id: 11, name: 'Mikale Hum', weight: 140, handedness: 'left', role: 'regular', height: '172', gender: 'female', sprintStrength: 7, enduranceStrength: 7, generalStrength: 7 },
        { id: 12, name: 'Myriam Gallant', weight: 165, handedness: 'left', role: 'regular', height: '179', gender: 'female', sprintStrength: 9, enduranceStrength: 8.5, generalStrength: 9 },
        { id: 13, name: 'Nancy Zheng', weight: 165, handedness: 'left', role: 'regular', height: '179', gender: 'female', sprintStrength: 8.5, enduranceStrength: 9, generalStrength: 9 },
        { id: 14, name: 'Souang Wu', weight: 135, handedness: 'left', role: 'regular', height: '168', gender: 'female', sprintStrength: 7, enduranceStrength: 7.5, generalStrength: 7.5 },
        // Men
        { id: 15, name: 'Alexander Liu', weight: 200, handedness: 'left', role: 'regular', height: '188', gender: 'male', sprintStrength: 9.5, enduranceStrength: 8.5, generalStrength: 9 },
        { id: 16, name: 'Ba-Khang Nguyen', weight: 142, handedness: 'left', role: 'regular', height: '173', gender: 'male', sprintStrength: 6.5, enduranceStrength: 7, generalStrength: 7 },
        { id: 17, name: 'David Namgung', weight: 138, handedness: 'left', role: 'regular', height: '172', gender: 'male', sprintStrength: 6, enduranceStrength: 6.5, generalStrength: 6.5 },
        { id: 18, name: 'Eric Wang', weight: 190, handedness: 'left', role: 'regular', height: '185', gender: 'male', sprintStrength: 9, enduranceStrength: 8, generalStrength: 8.5 },
        { id: 19, name: 'Gerry Xiao', weight: 145, handedness: 'left', role: 'pacer', height: '174', gender: 'male', sprintStrength: 8.5, enduranceStrength: 7, generalStrength: 8 },
        { id: 20, name: 'Hugo Gelinas', weight: 182, handedness: 'left', role: 'regular', height: '183', gender: 'male', sprintStrength: 8.5, enduranceStrength: 9, generalStrength: 9 },
        { id: 21, name: 'Jimmy Xu', weight: 208, handedness: 'left', role: 'regular', height: '190', gender: 'male', sprintStrength: 9.5, enduranceStrength: 8.5, generalStrength: 9.5 },
        { id: 22, name: 'Mathieu Leong', weight: 140, handedness: 'left', role: 'regular', height: '173', gender: 'male', sprintStrength: 6, enduranceStrength: 7, generalStrength: 6.5 },
        { id: 23, name: 'Nicolas Taylor', weight: 178, handedness: 'left', role: 'regular', height: '182', gender: 'male', sprintStrength: 8, enduranceStrength: 8.5, generalStrength: 8.5 },
        { id: 24, name: 'Ruo Yu Wang', weight: 195, handedness: 'left', role: 'regular', height: '186', gender: 'male', sprintStrength: 9, enduranceStrength: 9, generalStrength: 9 },
        { id: 25, name: 'Shung-Kwoon Jin', weight: 150, handedness: 'left', role: 'regular', height: '175', gender: 'male', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 26, name: 'William Kallianiotis', weight: 203, handedness: 'left', role: 'regular', height: '189', gender: 'male', sprintStrength: 9, enduranceStrength: 9.5, generalStrength: 9.5 },
        { id: 27, name: 'Yichen Shao', weight: 178, handedness: 'left', role: 'regular', height: '182', gender: 'male', sprintStrength: 8, enduranceStrength: 8, generalStrength: 8 },

        // --- Right Side Paddlers ---
        // Women
        { id: 28, name: 'Anne Nguyen', weight: 165, handedness: 'right', role: 'regular', height: '179', gender: 'female', sprintStrength: 8.5, enduranceStrength: 9, generalStrength: 9 },
        { id: 29, name: 'Ella Zheng', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 30, name: 'Emily You', weight: 130, handedness: 'right', role: 'regular', height: '165', gender: 'female', sprintStrength: 6.5, enduranceStrength: 7, generalStrength: 6.5 },
        { id: 31, name: 'Emma Ding', weight: 121, handedness: 'right', role: 'regular', height: '161', gender: 'female', sprintStrength: 6, enduranceStrength: 6, generalStrength: 6 },
        { id: 32, name: 'Marie-Ève Hébert', weight: 126, handedness: 'right', role: 'regular', height: '163', gender: 'female', sprintStrength: 6.5, enduranceStrength: 6.5, generalStrength: 6.5 },
        { id: 33, name: 'May Sun', weight: 155, handedness: 'right', role: 'regular', height: '177', gender: 'female', sprintStrength: 8, enduranceStrength: 8.5, generalStrength: 8.5 },
        { id: 34, name: 'Megan St-Amour', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 35, name: 'Meng Jia Gu', weight: 150, handedness: 'right', role: 'regular', height: '176', gender: 'female', sprintStrength: 7.5, enduranceStrength: 8, generalStrength: 8 },
        { id: 36, name: 'Mollee Ye', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 37, name: 'Polina Ginju', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 38, name: 'Sthefany Zhu', weight: 105, handedness: 'right', role: 'regular', height: '153', gender: 'female', sprintStrength: 5, enduranceStrength: 5, generalStrength: 5 },
        { id: 39, name: 'Virginie Tran', weight: 132, handedness: 'right', role: 'pacer', height: '167', gender: 'female', sprintStrength: 8, enduranceStrength: 7.5, generalStrength: 8 },
        { id: 40, name: 'Wendi Huo', weight: 132, handedness: 'right', role: 'regular', height: '167', gender: 'female', sprintStrength: 6.5, enduranceStrength: 7, generalStrength: 7 },
        // Men
        { id: 41, name: 'Da Zhuo Xie', weight: 176, handedness: 'right', role: 'regular', height: '181', gender: 'male', sprintStrength: 8, enduranceStrength: 8.5, generalStrength: 8.5 },
        { id: 42, name: 'David Vu', weight: 162, handedness: 'right', role: 'regular', height: '178', gender: 'male', sprintStrength: 7.5, enduranceStrength: 8, generalStrength: 8 },
        { id: 43, name: 'Dory Song', weight: 183, handedness: 'right', role: 'regular', height: '183', gender: 'male', sprintStrength: 8.5, enduranceStrength: 9, generalStrength: 9 },
        { id: 44, name: 'Eugene Sweetoo', weight: 170, handedness: 'right', role: 'regular', height: '180', gender: 'male', sprintStrength: 8, enduranceStrength: 8.5, generalStrength: 8.5 },
        { id: 45, name: 'Geoffrey Wang', weight: 162, handedness: 'right', role: 'regular', height: '178', gender: 'male', sprintStrength: 7.5, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 46, name: 'JiaXing Miao', weight: 215, handedness: 'right', role: 'regular', height: '192', gender: 'male', sprintStrength: 9.5, enduranceStrength: 9, generalStrength: 9.5 },
        { id: 47, name: 'Liam Nguyen', weight: 208, handedness: 'right', role: 'regular', height: '190', gender: 'male', sprintStrength: 9.5, enduranceStrength: 9.5, generalStrength: 9.5 },
        { id: 48, name: 'Luis Felipe Jarquin Rome', weight: 159, handedness: 'right', role: 'regular', height: '177', gender: 'male', sprintStrength: 7, enduranceStrength: 7.5, generalStrength: 7.5 },
        { id: 49, name: 'Michael Shan', weight: 200, handedness: 'right', role: 'regular', height: '188', gender: 'male', sprintStrength: 9, enduranceStrength: 9, generalStrength: 9 },
        { id: 50, name: 'Nathan Nguyen', weight: 152, handedness: 'right', role: 'pacer', height: '176', gender: 'male', sprintStrength: 8.5, enduranceStrength: 8, generalStrength: 8.5 },
        { id: 51, name: 'Orlando Qiu', weight: 175, handedness: 'right', role: 'regular', height: '181', gender: 'male', sprintStrength: 8, enduranceStrength: 8.5, generalStrength: 8.5 },
        { id: 52, name: 'Ruo Chen Wang', weight: 200, handedness: 'right', role: 'regular', height: '188', gender: 'male', sprintStrength: 9, enduranceStrength: 9.5, generalStrength: 9.5 },
        { id: 53, name: 'Victor Taing', weight: 169, handedness: 'right', role: 'regular', height: '179', gender: 'male', sprintStrength: 8, enduranceStrength: 8, generalStrength: 8 },
        { id: 54, name: 'Zhan Lang Cheung', weight: 165, handedness: 'right', role: 'regular', height: '179', gender: 'male', sprintStrength: 7.5, enduranceStrength: 8, generalStrength: 8 },
    ]);

    // --- State Variables ---
    const [boatConfiguration, setBoatConfiguration] = useState('1_mixed_standard');
    const [raceDistance, setRaceDistance] = useState('500m');
    const [seatingResult, setSeatingResult] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // NEW STATE: Modal visibility
    
    // State for adding new paddlers
    const [newPaddler, setNewPaddler] = useState({
        name: '', weight: '', handedness: 'right', role: 'regular', height: '',
        gender: 'male', sprintStrength: null, enduranceStrength: null, generalStrength: null
    });

    // --- Modal Control Functions ---
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // --- Roster Management Functions ---

    const addPaddler = () => {
        if (!newPaddler.name || !newPaddler.weight) return;
        
        const paddler = {
            id: Date.now(),
            ...newPaddler,
            weight: parseFloat(newPaddler.weight),
            // Default strengths if not explicitly entered
            sprintStrength: parseFloat(newPaddler.sprintStrength) || 7, 
            enduranceStrength: parseFloat(newPaddler.enduranceStrength) || 7,
            generalStrength: parseFloat(newPaddler.generalStrength) || 7,
        };
        
        setPaddlers([...paddlers, paddler]);
        setNewPaddler({ 
            name: '', weight: '', handedness: 'right', role: 'regular', height: '',
            gender: 'male', sprintStrength: null, enduranceStrength: null, generalStrength: null 
        });
    };

    const removePaddler = (id) => {
        setPaddlers(paddlers.filter(p => p.id !== id));
    };


    // --- Core Optimization Logic ---

    /**
     * Calculates the placement score for a given paddler in a given seat.
     * This score combines handedness, race strength stacking, boat trim, and weight balance.
     */
    const calculatePlacementScore = (paddler, position, side, allPositions) => {
        let score = 0;
        
        // 1. Handedness Score (Mandatory constraint) - Highest weight to enforce side
        if (paddler.handedness === side) score += 50000; 
        
        // 2. Race Strength Stack Score (High Priority for stacking)
        const strength = getRaceStrength(paddler, raceDistance); 
        let strengthMultiplier = 1;
        
        // Prioritize strength in the Power House (Positions 2-6)
        if (position.position >= 2 && position.position <= 6) { 
            strengthMultiplier = 2.5; 
        } else if (position.position >= 9) { // De-prioritize placing strongest paddlers in the back
            strengthMultiplier = 0.5;
        }
        score += strength * 100 * strengthMultiplier; 

        // 3. Trim Score (Height)
        const heightMatch = getHeightMatchScore(paddler.height, getHeightPreference(position.position));
        score += heightMatch * 10; 
        
        // 4. Weight Balance Score (Minimize final imbalance) - Lowest priority
        const tempPositions = JSON.parse(JSON.stringify(allPositions));
        tempPositions[position.position - 1][side] = paddler;
        const { imbalance } = calculateWeights(tempPositions);
        
        // Penalize higher imbalance 
        score -= imbalance; 
        
        return score;
    };


    /**
     * Main function to execute the optimization.
     */
    const optimizeSeating = () => {
        
        // 1. PREPARE BOATS: Filters and splits paddlers based on config
        const { boats, unassigned: initialUnassigned } = prepareBoats(paddlers, boatConfiguration);
        
        let optimizedBoats = [];
        let allUnassigned = [...initialUnassigned];
        
        for (const boat of boats) {
            
            const availablePaddlers = boat.paddlers;

            // Create positions array based on boat size (e.g., size=10 means 10 positions/20 seats)
            const positions = Array.from({ length: boat.size }, (_, i) => ({
                position: i + 1,
                isPacingPosition: i === 0, // Only Position 1 (index 0) is the Pacing Row
                heightPreference: getHeightPreference(i + 1),
                left: null,
                right: null
            }));

            let assignedPaddlers = [];
            
            // Step 1: ASSIGN PACERS (Strictly to Position 1, dominant side)
            const pacers = availablePaddlers
                .filter(p => p.role === 'pacer')
                .sort((a, b) => {
                    // Simple sort to ensure Left Pacer and Right Pacer are matched up
                    const sideA = a.handedness === 'left' ? 0 : 1;
                    const sideB = b.handedness === 'left' ? 0 : 1;
                    return sideA - sideB;
                });

            let pacerLeftAssigned = false;
            let pacerRightAssigned = false;
            const pacerPosition = positions[0]; 

            for (const pacer of pacers) {
                const preferredSide = pacer.handedness === 'left' ? 'left' : 'right';

                if (preferredSide === 'left' && !pacerLeftAssigned) {
                    pacerPosition.left = pacer;
                    assignedPaddlers.push(pacer.id);
                    pacerLeftAssigned = true;
                } else if (preferredSide === 'right' && !pacerRightAssigned) {
                    pacerPosition.right = pacer;
                    assignedPaddlers.push(pacer.id);
                    pacerRightAssigned = true;
                }
                // If a pacer can't be assigned (e.g., P1 is full), they skip and become a regular paddler
            }
            
            // Step 2: Assign Remaining Paddlers (Score-based)
            const remainingPaddlers = availablePaddlers.filter(p => !assignedPaddlers.includes(p.id));
            
            // Sort by strength descending (best paddlers are considered first for high-score seats)
            remainingPaddlers.sort((a, b) => getRaceStrength(b, raceDistance) - getRaceStrength(a, raceDistance));

            for (const paddler of remainingPaddlers) {
                let bestPosition = null;
                let bestSide = null;
                let bestScore = -Infinity;

                for (const position of positions) {
                    for (const side of ['left', 'right']) {
                        if (position[side]) continue; // Seat is taken

                        // Calculate placement score
                        const score = calculatePlacementScore(paddler, position, side, positions);
                        
                        if (score > bestScore) {
                            bestScore = score;
                            bestPosition = position;
                            bestSide = side;
                        }
                    }
                }

                if (bestPosition) {
                    bestPosition[bestSide] = paddler;
                    assignedPaddlers.push(paddler.id);
                }
            }
            
            // Finalize results for the current boat
            const weights = calculateWeights(positions);
            const unassignedInBoat = availablePaddlers.filter(p => !assignedPaddlers.includes(p.id));
            
            allUnassigned.push(...unassignedInBoat);

            optimizedBoats.push({
                name: boat.name,
                positions,
                ...weights
            });
        }

        // Update global state with all results
        setSeatingResult({
            boats: optimizedBoats,
            unassigned: allUnassigned
        });

        // Open the modal immediately after calculation
        openModal();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-inter">
            <header className="mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center space-x-2">
                    <Users size={32} className="text-emerald-600" />
                    <span>Dragon Boat Seating Optimizer</span>
                </h1>
            </header>

            {/* Controls (Config and Race Selection) */}
            <Controls
                paddlersCount={paddlers.length}
                boatConfiguration={boatConfiguration}
                setBoatConfiguration={setBoatConfiguration}
                raceDistance={raceDistance}
                setRaceDistance={setRaceDistance}
                optimizeSeating={optimizeSeating}
            />
            
            {/* Roster Manager (Add Paddler and Roster List) */}
            <RosterManager 
                paddlers={paddlers} 
                newPaddler={newPaddler} 
                setNewPaddler={setNewPaddler} 
                addPaddler={addPaddler} 
                removePaddler={removePaddler}
            />

            {/* Optimization Results (Rendered as a Modal) */}
            <OptimizationResults 
                seatingResult={seatingResult} 
                isModalOpen={isModalOpen} 
                closeModal={closeModal} 
            />
            
            {/* Simple footer for spacing */}
            <div className="h-10"></div>
        </div>
    );
}

export default App;
import React, { useState } from 'react';
import { Plus, X, Users } from 'lucide-react';
import './App.css';
import BoatVisualization from './BoatVisualization';


function App() {

  // Configuration options for multiple boats
  const CONFIG_OPTIONS = [
    { value: '1_mixed_standard', label: '1 Mixed Standard Boat (20 seats)' },
    { value: '2_gender_boats', label: '2 Gender Boats (M/F)' },
    { value: 'mixed_standard_small', label: '1 Mixed Standard (20) & 1 Small Mixed (10)' },
  ];

  const [boatConfiguration, setBoatConfiguration] = useState(CONFIG_OPTIONS[0].value);

  const [paddlers, setPaddlers] = useState([
    // --- Left Side Paddlers ---
      // Women
      { id: 1, name: 'Alice Chen', weight: 127, handedness: 'left', role: 'pacer', height: '163', gender: 'female' },
      { id: 2, name: 'Bryana Sansalone', weight: 140, handedness: 'left', role: 'regular', height: '172', gender: 'female' },
      { id: 3, name: 'Cassandra Duong', weight: 125, handedness: 'left', role: 'regular', height: '162', gender: 'female' },
      { id: 4, name: 'Ceres Brunet', weight: 131, handedness: 'left', role: 'regular', height: '165', gender: 'female' },
      { id: 5, name: 'Christine Wu', weight: 123, handedness: 'left', role: 'regular', height: '161', gender: 'female' },
      { id: 6, name: 'Cleo Huang', weight: 149, handedness: 'left', role: 'regular', height: '175', gender: 'female' },
      { id: 7, name: 'Helen Liu', weight: 125, handedness: 'left', role: 'regular', height: '162', gender: 'female' },
      { id: 8, name: 'Holly Wei', weight: 141, handedness: 'left', role: 'regular', height: '173', gender: 'female' },
      { id: 9, name: 'Lucia Zhu', weight: 110, handedness: 'left', role: 'regular', height: '155', gender: 'female' },
      { id: 10, name: 'Mandy Xiao', weight: 145, handedness: 'left', role: 'regular', height: '174', gender: 'female' },
      { id: 11, name: 'Mikale Hum', weight: 140, handedness: 'left', role: 'regular', height: '172', gender: 'female' },
      { id: 12, name: 'Myriam Gallant', weight: 165, handedness: 'left', role: 'regular', height: '179', gender: 'female' },
      { id: 13, name: 'Nancy Zheng', weight: 165, handedness: 'left', role: 'regular', height: '179', gender: 'female' },
      { id: 14, name: 'Souang Wu', weight: 135, handedness: 'left', role: 'regular', height: '168', gender: 'female' },
      // Men
      { id: 15, name: 'Alexander Liu', weight: 200, handedness: 'left', role: 'regular', height: '188', gender: 'male' },
      { id: 16, name: 'Ba-Khang Nguyen', weight: 142, handedness: 'left', role: 'regular', height: '173', gender: 'male' },
      { id: 17, name: 'David Namgung', weight: 138, handedness: 'left', role: 'regular', height: '172', gender: 'male' },
      { id: 18, name: 'Eric Wang', weight: 190, handedness: 'left', role: 'regular', height: '185', gender: 'male' },
      { id: 19, name: 'Gerry Xiao', weight: 145, handedness: 'left', role: 'pacer', height: '174', gender: 'male' },
      { id: 20, name: 'Hugo Gelinas', weight: 182, handedness: 'left', role: 'regular', height: '183', gender: 'male' },
      { id: 21, name: 'Jimmy Xu', weight: 208, handedness: 'left', role: 'regular', height: '190', gender: 'male' },
      { id: 22, name: 'Mathieu Leong', weight: 140, handedness: 'left', role: 'regular', height: '173', gender: 'male' },
      { id: 23, name: 'Nicolas Taylor', weight: 178, handedness: 'left', role: 'regular', height: '182', gender: 'male' },
      { id: 24, name: 'Ruo Yu Wang', weight: 195, handedness: 'left', role: 'regular', height: '186', gender: 'male' },
      { id: 25, name: 'Shung-Kwoon Jin', weight: 150, handedness: 'left', role: 'regular', height: '175', gender: 'male' },
      { id: 26, name: 'William Kallianiotis', weight: 203, handedness: 'left', role: 'regular', height: '189', gender: 'male' },
      { id: 27, name: 'Yichen Shao', weight: 178, handedness: 'left', role: 'regular', height: '182', gender: 'male' },

    // --- Right Side Paddlers (Weights, Roles, and Heights Added) ---
      // Women
      { id: 28, name: 'Anne Nguyen', weight: 165, handedness: 'right', role: 'regular', height: '179', gender: 'female' },
      { id: 29, name: 'Ella Zheng', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female' },
      { id: 30, name: 'Emily You', weight: 130, handedness: 'right', role: 'regular', height: '165', gender: 'female' },
      { id: 31, name: 'Emma Ding', weight: 121, handedness: 'right', role: 'regular', height: '161', gender: 'female' },
      { id: 32, name: 'Marie-Ève Hébert', weight: 126, handedness: 'right', role: 'regular', height: '163', gender: 'female' },
      { id: 33, name: 'May Sun', weight: 155, handedness: 'right', role: 'regular', height: '177', gender: 'female' },
      { id: 34, name: 'Megan St-Amour', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female' },
      { id: 35, name: 'Meng Jia Gu', weight: 150, handedness: 'right', role: 'regular', height: '176', gender: 'female' },
      { id: 36, name: 'Mollee Ye', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female' },
      { id: 37, name: 'Polina Ginju', weight: 145, handedness: 'right', role: 'regular', height: '174', gender: 'female' },
      { id: 38, name: 'Sthefany Zhu', weight: 105, handedness: 'right', role: 'regular', height: '153', gender: 'female' },
      { id: 39, name: 'Virginie Tran', weight: 132, handedness: 'right', role: 'pacer', height: '167', gender: 'female' },
      { id: 40, name: 'Wendi Huo', weight: 132, handedness: 'right', role: 'regular', height: '167', gender: 'female' },
      // Men
      { id: 41, name: 'Da Zhuo Xie', weight: 176, handedness: 'right', role: 'regular', height: '181', gender: 'male' },
      { id: 42, name: 'David Vu', weight: 162, handedness: 'right', role: 'regular', height: '178', gender: 'male' },
      { id: 43, name: 'Dory Song', weight: 183, handedness: 'right', role: 'regular', height: '183', gender: 'male' },
      { id: 44, name: 'Eugene Sweetoo', weight: 170, handedness: 'right', role: 'regular', height: '180', gender: 'male' },
      { id: 45, name: 'Geoffrey Wang', weight: 162, handedness: 'right', role: 'regular', height: '178', gender: 'male' },
      { id: 46, name: 'JiaXing Miao', weight: 215, handedness: 'right', role: 'regular', height: '192', gender: 'male' },
      { id: 47, name: 'Liam Nguyen', weight: 208, handedness: 'right', role: 'regular', height: '190', gender: 'male' },
      { id: 48, name: 'Luis Felipe Jarquin Rome', weight: 159, handedness: 'right', role: 'regular', height: '177', gender: 'male' },
      { id: 49, name: 'Michael Shan', weight: 200, handedness: 'right', role: 'regular', height: '188', gender: 'male' },
      { id: 50, name: 'Nathan Nguyen', weight: 152, handedness: 'right', role: 'pacer', height: '176', gender: 'male' },
      { id: 51, name: 'Orlando Qiu', weight: 175, handedness: 'right', role: 'regular', height: '181', gender: 'male' },
      { id: 52, name: 'Ruo Chen Wang', weight: 200, handedness: 'right', role: 'regular', height: '188', gender: 'male' },
      { id: 53, name: 'Victor Taing', weight: 169, handedness: 'right', role: 'regular', height: '179', gender: 'male' },
      { id: 54, name: 'Zhan Lang Cheung', weight: 165, handedness: 'right', role: 'regular', height: '179', gender: 'male' }
  ]);

  const [newPaddler, setNewPaddler] = useState({
    name: '', weight: '', handedness: 'right', role: 'regular', height: ''
  });

  const addPaddler = () => {
    if (!newPaddler.name || !newPaddler.weight) return;
    
    const paddler = {
      id: Date.now(),
      ...newPaddler,
      gender: null,
      weight: parseFloat(newPaddler.weight)
    };
    
    setPaddlers([...paddlers, paddler]);
    setNewPaddler({ name: '', weight: '', handedness: 'right', role: 'regular', height: '' });
  };

  const [seatingResult, setSeatingResult] = useState(null);

  const prepareBoats = (paddlerList, config) => {
    // Sort all paddlers by weight to prioritize seating the heaviest/best first
    const sortedPaddlers = paddlerList.slice().sort((a, b) => b.weight - a.weight);

    if (config === '1_mixed_standard') {
      // Take the top 20 for a standard boat
      const boatPaddlers = sortedPaddlers.slice(0, 20);
      return {
        boats: [{ name: 'Boat 1 (Standard Mixed)', paddlers: boatPaddlers, size: 10 }], // 10 positions = 20 seats
        unassigned: sortedPaddlers.slice(20)
      };
    }

    if (config === '2_gender_boats') {
      const men = paddlerList.filter(p => p.gender === 'male').sort((a, b) => b.weight - a.weight);
      const women = paddlerList.filter(p => p.gender === 'female').sort((a, b) => b.weight - a.weight);

      // Take top 20 of each gender
      return {
        boats: [
          { name: 'Boat M (Standard)', paddlers: men.slice(0, 20), size: 10 },
          { name: 'Boat F (Standard)', paddlers: women.slice(0, 20), size: 10 }
        ],
        unassigned: [...men.slice(20), ...women.slice(20)]
      };
    }
    
    if (config === 'mixed_standard_small') {
        // Take top 20 for standard boat (Boat 1)
        const boat1Paddlers = sortedPaddlers.slice(0, 20);
        
        // Take next 10 for small boat (Boat 2)
        const boat2Paddlers = sortedPaddlers.slice(20, 30);
        
        return {
            boats: [
                { name: 'Boat 1 (Standard Mixed)', paddlers: boat1Paddlers, size: 10 },
                { name: 'Boat 2 (Small Mixed)', paddlers: boat2Paddlers, size: 5 } // 5 positions = 10 seats
            ],
            unassigned: sortedPaddlers.slice(30)
        };
    }
    
    return { boats: [], unassigned: paddlerList };
  };

const optimizeSeating = () => {
    
  // 1. PREPARE BOATS (Handles multiple boats and initial assignment)
  const { boats, unassigned: initialUnassigned } = prepareBoats(paddlers, boatConfiguration);
  
  let optimizedBoats = [];
  let allUnassigned = [...initialUnassigned];
  
  for (const boat of boats) {
    const availablePaddlers = boat.paddlers;

    // Create positions based on boat size (e.g., size=10 means 10 positions/20 seats)
    const positions = Array.from({ length: boat.size }, (_, i) => ({
        position: i + 1,
        // *** FIX 1: Only Position 1 is a pacing position (i = 0) ***
        isPacingPosition: i === 0, 
        heightPreference: getHeightPreference(i + 1),
        left: null,
        right: null
    }));

    let assignedPaddlers = [];
    
    // Step 1: ASSIGN PACERS STRICTLY TO POSITION 1 (Pacer Row)
    // Find pacers from the current boat's crew and sort them to prioritize handedness balance
    const pacers = availablePaddlers
      .filter(p => p.role === 'pacer')
      .sort((a, b) => {
        // Prioritize pacers who match the open side in P1
        const sideA = a.handedness === 'left' ? 'left' : 'right';
        const sideB = b.handedness === 'left' ? 'left' : 'right';
        return sideA.localeCompare(sideB); // Simple stable sort
      });

    let pacerLeftAssigned = false;
    let pacerRightAssigned = false;
    const pacerPosition = positions[0]; // Position 1 (index 0)

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
      // If the pacer can't be assigned to their preferred side (because it's already taken), 
      // they are automatically ignored and fall into the remainingPaddlers pool (Step 2).
    }
    
    // Step 2: Assign Remaining Paddlers
    const remainingPaddlers = availablePaddlers.filter(p => !assignedPaddlers.includes(p.id));
    
    // Sort by weight match preference first, then by weight
    remainingPaddlers.sort((a, b) => b.weight - a.weight);

    for (const paddler of remainingPaddlers) {
      let bestPosition = null;
      let bestSide = null;
      let bestScore = -Infinity;

      for (const position of positions) {
        for (const side of ['left', 'right']) {
          if (position[side]) continue;

          // Calculate placement score
          // Note: calculatePlacementScore needs the paddler's height to be compared numerically, 
          // not as a string ('163') or category ('tall'). You may want to revise this helper function.
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
    
    // Add any unassigned from this boat to the total unassigned list
    allUnassigned.push(...unassignedInBoat);

    optimizedBoats.push({
      name: boat.name,
      positions,
      ...weights
    });
  }

  // *** FIX 2: Set seatingResult to handle multiple optimized boats ***
  setSeatingResult({
    boats: optimizedBoats,
    unassigned: allUnassigned
  });
};

  const getHeightPreference = (position) => {
  // Position 6 is ideal for tall paddlers (middle of boat)
  // Positions 5 and 7 are also good for tall
  // Front (1-2) and back (9-10) prefer shorter paddlers
  if (position >= 1 && position <= 2) return 'short'; // Front
  if (position >= 9 && position <= 10) return 'short'; // Back
  if (position === 6) return 'tall'; // Sweet spot for tall
  if (position === 5 || position === 7) return 'tall'; // Also good for tall
    return 'normal'; // Middle positions
  };

  const calculatePlacementScore = (paddler, position, side, allPositions) => {
    let score = 0;
    
    // Height preference score (most important)
    const heightMatch = getHeightMatchScore(paddler.height, position.heightPreference);
    score += heightMatch * 100; // Weight height heavily
    
    // Handedness preference score
    if (paddler.handedness === 'left' && side === 'left') score += 50;
    if (paddler.handedness === 'right' && side === 'right') score += 50;
    if (paddler.handedness === 'ambidextrous') score += 25; // Flexible
    
    // Weight balance score
    const tempPositions = JSON.parse(JSON.stringify(allPositions));
    tempPositions[position.position - 1][side] = paddler;
    const { imbalance } = calculateWeights(tempPositions);
    score -= imbalance; // Lower imbalance = higher score
    
    return score;
  };

  const getHeightMatchScore = (paddlerHeight, positionPreference) => {
    if (paddlerHeight === positionPreference) return 10; // Perfect match
    if (paddlerHeight === 'normal') return 7; // Normal height is flexible
    if (paddlerHeight === 'tall' && positionPreference === 'normal') return 5;
    if (paddlerHeight === 'short' && positionPreference === 'normal') return 5;
    return 0; // Poor match (tall in front/back, short in middle)
  };

  const calculateWeights = (positions) => {
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

  return (
    <div className="app">
      <header>
        <h1><Users size={32} /> Dragon Boat Seating Optimizer</h1>
      </header>

      <div className="add-paddler">
        <h2>Add Paddler</h2>
        <div className="input-row">
          <input
            type="text"
            placeholder="Name"
            value={newPaddler.name}
            onChange={(e) => setNewPaddler({...newPaddler, name: e.target.value})}
          />
          <input
            type="number"
            placeholder="Weight (lbs)"
            value={newPaddler.weight}
            onChange={(e) => setNewPaddler({...newPaddler, weight: e.target.value})}
          />
          <select
            value={newPaddler.handedness}
            onChange={(e) => setNewPaddler({...newPaddler, handedness: e.target.value})}
          >
            <option value="right">Right-handed</option>
            <option value="left">Left-handed</option>
          </select>
          <select
            value={newPaddler.role}
            onChange={(e) => setNewPaddler({...newPaddler, role: e.target.value})}
          >
            <option value="regular">Regular</option>
            <option value="pacer">Pacer</option>
          </select>
          <input
            type="number"
            placeholder="Height (cm)"
            value={newPaddler.height}
            onChange={(e) => setNewPaddler({...newPaddler, height: e.target.value})}
          />
          <button onClick={addPaddler}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="configuration-select">
        <h2>Boat Configuration</h2>
        <select
          value={boatConfiguration}
          onChange={(e) => setBoatConfiguration(e.target.value)}
        >
          {CONFIG_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="paddlers-list">
        {/* ... (Existing paddlers list) ... */}
      </div>
      <div className="optimize-section">
        <button onClick={optimizeSeating} className="optimize-btn" disabled={paddlers.length === 0}>
          <Users size={16} /> Optimize Seating
        </button>
      </div>

      {/* Results section now handles the array of boats */}
      {seatingResult && seatingResult.boats && seatingResult.boats.map((boatResult, boatIndex) => (
        <div key={boatIndex} className="results boat-results">
          <h2>Optimized Seating Arrangement: {boatResult.name}</h2>
          
          {/* Weight Summary for this boat */}
          <div className="weight-summary">
            <div className="weight-stat">
              <h3>{boatResult.leftWeight} lbs</h3>
              <p>Left Side ({boatResult.leftCount} paddlers)</p>
            </div>
            <div className="weight-stat">
              <h3 className="imbalance">{boatResult.imbalance} lbs</h3>
              <p>Weight Imbalance</p>
            </div>
            <div className="weight-stat">
              <h3>{boatResult.rightWeight} lbs</h3>
              <p>Right Side ({boatResult.rightCount} paddlers)</p>
              </div>
          </div>

          {/* Boat Visualization (Use a component that can handle the name/size) */}
          <div className="boat-visualization">
            <h3>Boat Visualization ({boatResult.positions.length * 2} seats)</h3>
            <BoatVisualization weightImbalance={boatResult.imbalance} />
          </div>

          {/* Boat Layout for this boat */}
          <div className="boat-layout">
            <h3>Boat Layout (Front to Back)</h3>
            {boatResult.positions.map((pos, idx) => (
              <div key={idx} className="position-row">
                <div className="seat">
                  {pos.left ? (
                    <div className="paddler-info">
                      <strong>{pos.left.name}</strong>
                      <span>{pos.left.weight}lbs | {pos.left.handedness}</span>
                    </div>
                  ) : (
                    <div className="empty-seat">Empty</div>
                  )}
                </div>
                
                <div className="position-info">
                  <strong>Pos {pos.position}</strong>
                  {pos.isPacingPosition && <span className="pacer-badge">Pacer</span>}
                </div>
                
                <div className="seat">
                  {pos.right ? (
                    <div className="paddler-info">
                      <strong>{pos.right.name}</strong>
                      <span>{pos.right.weight}lbs | {pos.right.handedness}</span>
                    </div>
                  ) : (
                    <div className="empty-seat">Empty</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {seatingResult && seatingResult.unassigned && seatingResult.unassigned.length > 0 && (
        <div className="unassigned-paddlers">
          <h3>Unassigned Paddlers ({seatingResult.unassigned.length})</h3>
          <p>{seatingResult.unassigned.map(p => p.name).join(', ')}</p>
        </div>
      )}

      <div className="paddlers-list">
        <h2>Team Roster ({paddlers.length} paddlers)</h2>
        {paddlers.map(paddler => (
          <div key={paddler.id} className="paddler-card">
            <h3>{paddler.name}</h3>
            <p>Weight: {paddler.weight} lbs | {paddler.handedness} | {paddler.role}</p>
          </div>
        ))}
      </div>
      <div className="optimize-section">
        <button onClick={optimizeSeating} className="optimize-btn" disabled={paddlers.length === 0}>
          <Users size={16} /> Optimize Seating
        </button>
      </div>
      
    </div>
  );
}

export default App;
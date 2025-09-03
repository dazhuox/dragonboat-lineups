import React, { useState } from 'react';
import { Plus, X, Users } from 'lucide-react';
import './App.css';

function App() {
  const [paddlers, setPaddlers] = useState([
    { id: 1, name: 'Alice', weight: 140, handedness: 'right', role: 'pacer', height: '165' },
    { id: 2, name: 'Bob', weight: 180, handedness: 'left', role: 'regular', height: '180' },
    { id: 3, name: 'Charlie', weight: 155, handedness: 'right', role: 'regular', height: '178' },
    { id: 4, name: 'Diana', weight: 125, handedness: 'left', role: 'pacer', height: '160' },
    { id: 5, name: 'Ethan', weight: 190, handedness: 'right', role: 'regular', height: '185' },
    { id: 6, name: 'Fiona', weight: 135, handedness: 'right', role: 'pacer', height: '168' },
    { id: 7, name: 'George', weight: 170, handedness: 'left', role: 'regular', height: '182' },
    { id: 8, name: 'Hannah', weight: 145, handedness: 'right', role: 'pacer', height: '170' },
    { id: 9, name: 'Ian', weight: 160, handedness: 'right', role: 'regular', height: '175' },
    { id: 10, name: 'Jessica', weight: 118, handedness: 'left', role: 'pacer', height: '162' },
    { id: 11, name: 'Kevin', weight: 205, handedness: 'right', role: 'regular', height: '188' },
    { id: 12, name: 'Luna', weight: 130, handedness: 'right', role: 'pacer', height: '166' },
    { id: 13, name: 'Mike', weight: 175, handedness: 'left', role: 'regular', height: '180' },
    { id: 14, name: 'Nora', weight: 142, handedness: 'right', role: 'pacer', height: '169' },
    { id: 15, name: 'Oscar', weight: 168, handedness: 'right', role: 'regular', height: '177' },
    { id: 16, name: 'Penelope', weight: 127, handedness: 'left', role: 'pacer', height: '163' },
    { id: 17, name: 'Quinn', weight: 195, handedness: 'right', role: 'regular', height: '190' },
    { id: 18, name: 'Rachel', weight: 138, handedness: 'right', role: 'pacer', height: '167' },
    { id: 19, name: 'Steve', weight: 182, handedness: 'left', role: 'regular', height: '183' },
    { id: 20, name: 'Tina', weight: 148, handedness: 'right', role: 'pacer', height: '171' }
  ]);

  const [newPaddler, setNewPaddler] = useState({
    name: '', weight: '', handedness: 'right', role: 'regular', height: ''
  });

  const addPaddler = () => {
    if (!newPaddler.name || !newPaddler.weight) return;
    
    const paddler = {
      id: Date.now(),
      ...newPaddler,
      weight: parseFloat(newPaddler.weight)
    };
    
    setPaddlers([...paddlers, paddler]);
    setNewPaddler({ name: '', weight: '', handedness: 'right', role: 'regular' });
  };

  // Add this state after your existing useState calls
  const [seatingResult, setSeatingResult] = useState(null);

  const optimizeSeating = () => {
    // Create 10 boat positions (20 seats total)
    const positions = Array.from({ length: 10 }, (_, i) => ({
      position: i + 1,
      isPacingPosition: i < 2, // First 2 pairs are pacing positions
      heightPreference: getHeightPreference(i + 1), // Add height preference
      left: null,
      right: null
    }));

    const availablePaddlers = [...paddlers];
    let assignedPaddlers = [];
    
    // Step 1: Assign pacers first
    const pacers = availablePaddlers.filter(p => p.role === 'pacer');

    for (const pacer of pacers) {
      let assigned = false;
      for (const position of positions) {
        if (!position.isPacingPosition) continue;
        
        // Try preferred side based on handedness
        const preferredSide = pacer.handedness === 'left' ? 'left' : 'right';
        const otherSide = preferredSide === 'left' ? 'right' : 'left';
        
        if (!position[preferredSide]) {
          position[preferredSide] = pacer;
          assignedPaddlers.push(pacer.id);
          assigned = true;
          break;
        } else if (!position[otherSide]) {
          position[otherSide] = pacer;
          assignedPaddlers.push(pacer.id);
          assigned = true;
          break;
        }
      }
    }

    const remainingPaddlers = availablePaddlers.filter(p => !assignedPaddlers.includes(p.id));
  
    // Sort by height match preference first, then by weight
    remainingPaddlers.sort((a, b) => b.weight - a.weight);

    for (const paddler of remainingPaddlers) {
      let bestPosition = null;
      let bestSide = null;
      let bestScore = -Infinity;

      for (const position of positions) {
        for (const side of ['left', 'right']) {
          if (position[side]) continue;

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

    const weights = calculateWeights(positions);
    const unassigned = availablePaddlers.filter(p => !assignedPaddlers.includes(p.id));
    
    setSeatingResult({
      positions,
      ...weights,
      unassigned
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

      {seatingResult && (
        <div className="results">
          <h2>Optimized Seating Arrangement</h2>
          
          <div className="weight-summary">
            <div className="weight-stat">
              <h3>{seatingResult.leftWeight} lbs</h3>
              <p>Left Side ({seatingResult.leftCount} paddlers)</p>
            </div>
            <div className="weight-stat">
              <h3 className="imbalance">{seatingResult.imbalance} lbs</h3>
              <p>Weight Imbalance</p>
            </div>
            <div className="weight-stat">
              <h3>{seatingResult.rightWeight} lbs</h3>
              <p>Right Side ({seatingResult.rightCount} paddlers)</p>
            </div>
          </div>

          <div className="boat-layout">
            <h3>Boat Layout (Front to Back)</h3>
            {seatingResult.positions.map((pos, idx) => (
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
      )}
    </div>
  );
}

export default App;
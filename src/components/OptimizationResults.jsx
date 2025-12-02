// src/components/OptimizationResults.jsx
import React from 'react';
import { X } from 'lucide-react';
import BoatVisualization from '../BoatVisualization.jsx';
import { getRaceStrength, getHeightPreference } from '../utils.js'; // Import utilities

const OptimizationResults = ({ seatingResult, isModalOpen, closeModal, raceDistance }) => {
    
    if (!isModalOpen || !seatingResult || !seatingResult.boats || seatingResult.boats.length === 0) {
        return null;
    }

    return (
        // Full-screen modal overlay
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
            
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col relative overflow-hidden">
                
                {/* Header */}
                <div className="sticky top-0 bg-indigo-700 text-white p-4 flex justify-between items-center z-10 shadow-lg">
                    <h2 className="text-2xl font-extrabold flex items-center">
                        <X size={24} className="opacity-0 mr-2" />
                        Optimization Results
                    </h2>
                    <button 
                        onClick={closeModal} 
                        className="p-2 rounded-full hover:bg-indigo-600 transition duration-150"
                        aria-label="Close results"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body: Scrollable Content */}
                <div className="p-6 space-y-10 flex-grow overflow-y-auto">
                    
                    {/* Unassigned Paddlers (Placed at the top for visibility) */}
                    {seatingResult.unassigned && seatingResult.unassigned.length > 0 && (
                        <div className="unassigned-paddlers p-4 bg-red-50 border border-red-300 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-red-800 mb-2">Unassigned Paddlers ({seatingResult.unassigned.length})</h3>
                            <p className="text-sm text-red-700">
                                {seatingResult.unassigned.map(p => p.name).join(', ')}
                            </p>
                        </div>
                    )}
                    
                    {/* Individual Boat Results */}
                    {seatingResult.boats.map((boatResult, boatIndex) => (
                        <div key={boatIndex} className="results boat-results bg-white p-6 rounded-xl shadow-2xl border-t-8 border-blue-500">
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">{boatResult.name}</h2>
                            
                            {/* Weight Summary for this boat */}
                            <div className="weight-summary grid grid-cols-3 gap-4 text-center mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="weight-stat p-3 bg-blue-100 rounded-lg shadow-inner">
                                    <h3 className="text-2xl font-bold text-gray-700">{boatResult.leftWeight} lbs</h3>
                                    <p className="text-sm text-blue-600">Left Side ({boatResult.leftCount} paddlers)</p>
                                </div>
                                <div className="weight-stat p-3 rounded-lg flex flex-col justify-center">
                                    <h3 className={`text-4xl font-extrabold ${boatResult.imbalance <= 20 ? 'text-green-600' : 'text-orange-600'}`}>
                                        {boatResult.imbalance.toFixed(0)} lbs
                                    </h3>
                                    <p className="text-base text-gray-600">Weight Imbalance</p>
                                </div>
                                <div className="weight-stat p-3 bg-blue-100 rounded-lg shadow-inner">
                                    <h3 className="text-2xl font-bold text-gray-700">{boatResult.rightWeight} lbs</h3>
                                    <p className="text-sm text-blue-600">Right Side ({boatResult.rightCount} paddlers)</p>
                                </div>
                            </div>

                            {/* Boat Visualization */}
                            <div className="boat-visualization mb-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-700">Boat Trim Simulation for {raceDistance}</h3>
                                <BoatVisualization weightImbalance={boatResult.imbalance} />
                            </div>

                            {/* Boat Layout for this boat */}
                            <div className="boat-layout border rounded-xl overflow-hidden">
                                <h3 className="text-xl font-bold p-3 bg-gray-100 border-b text-center text-gray-800">Layout (Front <span className="font-normal text-gray-500">to</span> Back)</h3>
                                {boatResult.positions.map((pos, idx) => (
                                    <div key={idx} className="position-row flex justify-between items-center py-3 border-b last:border-b-0 text-sm hover:bg-gray-50 transition-colors">
                                        
                                        {/* Left Seat */}
                                        <div className={`seat w-5/12 p-2 mx-2 rounded-lg transition-all shadow-md ${pos.left ? (pos.left.gender === 'female' ? 'bg-purple-100 border-purple-300' : 'bg-green-100 border-green-300') : 'bg-gray-200 text-gray-500'}`}>
                                            {pos.left ? (
                                                <div className="paddler-info">
                                                    <strong className="font-bold">{pos.left.name}</strong>
                                                    <span className="text-xs block text-gray-600">W:{pos.left.weight} | Str:{getRaceStrength(pos.left, raceDistance).toFixed(1)}</span>
                                                </div>
                                            ) : (
                                                <div className="empty-seat p-2">Empty</div>
                                            )}
                                        </div>
                                        
                                        {/* Position Center */}
                                        <div className="position-info w-2/12 text-center font-extrabold text-lg text-indigo-700 relative">
                                            Pos {pos.position}
                                            {pos.isPacingPosition && <span className="pacer-badge absolute top-0 -mt-2 -translate-y-full text-xs font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded-full shadow-md">PACER</span>}
                                            <span className="text-xs font-normal block text-gray-500">({getHeightPreference(pos.position)} pref)</span>
                                        </div>
                                        
                                        {/* Right Seat */}
                                        <div className={`seat w-5/12 p-2 mx-2 rounded-lg transition-all shadow-md ${pos.right ? (pos.right.gender === 'female' ? 'bg-purple-100 border-purple-300' : 'bg-green-100 border-green-300') : 'bg-gray-200 text-gray-500'}`}>
                                            {pos.right ? (
                                                <div className="paddler-info">
                                                    <strong className="font-bold">{pos.right.name}</strong>
                                                    <span className="text-xs block text-gray-600">W:{pos.right.weight} | Str:{getRaceStrength(pos.right, raceDistance).toFixed(1)}</span>
                                                </div>
                                            ) : (
                                                <div className="empty-seat p-2">Empty</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default OptimizationResults;
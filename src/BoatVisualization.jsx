// src/BoatVisualization.jsx
import React from 'react';

const BoatVisualization = ({ weightImbalance }) => {
    
    const maxImbalance = 50; 
    const swayFactor = 8; 
    const tilt = (weightImbalance / maxImbalance) * swayFactor; 
    
    const direction = weightImbalance > 0 ? 'Left Side Heavier' : (weightImbalance < 0 ? 'Right Side Heavier' : 'Balanced');
    
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200 shadow-inner">
            <div className="relative w-full max-w-sm h-16 mb-4">
                
                {/* Water Line */}
                <div className="absolute inset-x-0 bottom-0 h-2 bg-blue-500 opacity-60" style={{ transform: 'translateY(10px)' }}></div>
                
                {/* Simplified Boat Hull Shape */}
                <div 
                    className="absolute inset-x-0 bottom-0 h-6 bg-yellow-700 rounded-t-full transition-transform duration-500 origin-bottom"
                    style={{
                        transform: `rotate(${tilt.toFixed(2)}deg)`,
                        boxShadow: `0 8px 15px rgba(0, 0, 0, 0.3)`
                    }}
                >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-white rounded-full"></div>
                </div>
            </div>
            
            <p className={`mt-4 text-sm font-semibold p-1 rounded-md`}>
                Trim Direction: <span className={`font-bold ${Math.abs(weightImbalance) <= 5 ? 'text-green-600' : 'text-red-600'}`}>{direction}</span>
            </p>
            <p className="text-xs text-gray-600">
                (Visual tilt scales up to {maxImbalance} lbs imbalance)
            </p>
        </div>
    );
};

export default BoatVisualization;
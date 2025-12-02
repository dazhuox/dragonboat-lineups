import React from 'react';
import { Users } from 'lucide-react';

export const CONFIG_OPTIONS = [
    { value: '1_mixed_standard', label: '1 Mixed Standard Boat (20 seats)' },
    { value: '2_gender_boats', label: '2 Gender Boats (M/F)' },
    { value: 'mixed_standard_small', label: '1 Mixed Standard (20) & 1 Small Mixed (10)' },
];

export const RACE_OPTIONS = [
    { value: '200m', label: '200m (Sprint)' },
    { value: '500m', label: '500m (Standard)' },
    { value: '2000m', label: '2000m (Endurance)' },
];

const Controls = ({ paddlersCount, boatConfiguration, setBoatConfiguration, raceDistance, setRaceDistance, optimizeSeating }) => {
    return (
        <div className="flex flex-wrap items-center justify-between p-4 bg-white border-b rounded-xl shadow-lg mb-6 md:space-x-4 space-y-3 md:space-y-0">
            
            <div className="w-full md:w-1/3">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1">Configuration</h3>
                <select
                    value={boatConfiguration}
                    onChange={(e) => setBoatConfiguration(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full bg-gray-50 hover:border-blue-500 transition duration-150"
                >
                    {CONFIG_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="w-full md:w-1/3">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-1">Race Distance</h3>
                <select
                    value={raceDistance}
                    onChange={(e) => setRaceDistance(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full bg-gray-50 hover:border-blue-500 transition duration-150"
                >
                    {RACE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            
            <div className="w-full md:w-1/4 pt-4 md:pt-0">
                <button 
                    onClick={optimizeSeating} 
                    className={`optimize-btn w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-bold transition duration-200 
                                ${paddlersCount === 0 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-300/50 transform hover:scale-[1.01]'}`} 
                    disabled={paddlersCount === 0}
                >
                    <Users size={18} /> <span>Optimize ({paddlersCount} ready)</span>
                </button>
            </div>
        </div>
    );
};

export default Controls;
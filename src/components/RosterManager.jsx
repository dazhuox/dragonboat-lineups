import React from 'react';
import { Plus, X } from 'lucide-react';

const RosterManager = ({ paddlers, newPaddler, setNewPaddler, addPaddler, removePaddler }) => {

    const { name, weight, handedness, role, height, gender } = newPaddler;
    
    const handleNumberChange = (key, value) => {
        setNewPaddler({...newPaddler, [key]: value === '' ? '' : parseFloat(value)});
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl mb-6 border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-3">
                Team Roster ({paddlers.length} Paddlers)
            </h2>

            {/* --- Add Paddler Form --- */}
            <div className="add-paddler grid grid-cols-2 md:grid-cols-8 gap-3 mb-6 p-5 border border-indigo-200 bg-indigo-50 rounded-lg shadow-inner">
                
                {/* Name & Gender */}
                <input
                    type="text" placeholder="Name" value={name}
                    onChange={(e) => setNewPaddler({...newPaddler, name: e.target.value})}
                    className="p-3 border rounded-lg col-span-2 md:col-span-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select value={gender} onChange={(e) => setNewPaddler({...newPaddler, gender: e.target.value})} className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="male">Guy (Male)</option>
                    <option value="female">Girl (Female)</option>
                </select>

                {/* Physical Data */}
                <input
                    type="number" placeholder="Weight (lbs)" value={weight}
                    onChange={(e) => handleNumberChange('weight', e.target.value)}
                    className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                    type="number" placeholder="Height (cm)" value={height}
                    onChange={(e) => handleNumberChange('height', e.target.value)}
                    className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />

                {/* Role & Handedness */}
                <select value={handedness} onChange={(e) => setNewPaddler({...newPaddler, handedness: e.target.value})} className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="right">Right-side</option>
                    <option value="left">Left-side</option>
                </select>
                <select value={role} onChange={(e) => setNewPaddler({...newPaddler, role: e.target.value})} className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="regular">Regular</option>
                    <option value="pacer">Pacer</option>
                </select>

                {/* Add Button */}
                <button 
                    onClick={addPaddler} 
                    className="col-span-2 md:col-span-1 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md transform hover:scale-[1.01] font-bold"
                >
                    <Plus size={18} /> Add
                </button>
            </div>
            
            {/* --- Roster List --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[30rem] overflow-y-auto pr-3">
                {paddlers.map(paddler => (
                    <div key={paddler.id} 
                        className={`paddler-card p-4 border rounded-xl shadow-lg text-sm transition duration-150 
                            ${paddler.gender === 'female' ? 'bg-purple-50 border-purple-300 hover:shadow-purple-200' : 'bg-green-50 border-green-300 hover:shadow-green-200'}`}
                    >
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-base truncate text-gray-900">{paddler.name}</h4>
                            <button onClick={() => removePaddler(paddler.id)} className="text-gray-400 hover:text-red-600 p-1 rounded-full transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="text-xs space-y-1 mt-1">
                            <p className="font-medium">W: {paddler.weight} lbs | H: {paddler.height} cm</p>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${paddler.role === 'pacer' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {paddler.role.toUpperCase()}
                            </span>
                            <span className="ml-2 text-gray-600 font-medium">
                                {paddler.handedness.charAt(0).toUpperCase() + paddler.handedness.slice(1)}-side
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RosterManager;
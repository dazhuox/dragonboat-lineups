import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const Boat = ({ tiltAngle = 0, speed = 0 }) => {
  const boatRef = useRef();
  
  useFrame(() => {
    if (boatRef.current) {
      // Rotate boat based on weight imbalance
      boatRef.current.rotation.z = (tiltAngle * Math.PI) / 180; // Convert to radians
    }
  });

  return (
    <group ref={boatRef}>
      {/* Simple boat hull */}
      <Box args={[4, 0.3, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Paddler positions (simple boxes for now) */}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={i}>
          {/* Left side paddler position */}
          <Box args={[0.1, 0.1, 0.2]} position={[-0.3, 0.2, 1.8 - i * 0.4]}>
            <meshStandardMaterial color="#4CAF50" />
          </Box>
          {/* Right side paddler position */}
          <Box args={[0.1, 0.1, 0.2]} position={[0.3, 0.2, 1.8 - i * 0.4]}>
            <meshStandardMaterial color="#2196F3" />
          </Box>
        </group>
      ))}
    </group>
  );
};

const BoatVisualization = ({ weightImbalance = 0, speed = 0 }) => {
  // Convert weight imbalance to tilt angle (you can adjust this formula)
  const tiltAngle = Math.min(Math.max(weightImbalance * 0.1, -10), 10); // Max 10 degrees tilt
  
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Water surface */}
        <Box args={[20, 0.1, 20]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#006994" opacity={0.7} transparent />
        </Box>
        
        <Boat tiltAngle={tiltAngle} speed={speed} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

export default BoatVisualization;
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Particles from '../Particles';
import GoldNucleus from './GoldNucleus';
import ElectronShell from './ElectronShell';
// Make sure to import your CSS for MainScene if you have any

const MainScene = () => {
    // Define the shell colors if they are being used to create ElectronShell components
    const shellColors = ['#ff0000', '#ff8c00', '#ffff00', '#00ff00', '#0000ff', '#4b0082'];

    return (
        // Ensure this div is not nested within any <header> elements
        <div id="canvas-container">
            <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
                <ambientLight intensity={0.4} />
                <GoldNucleus />
                {shellColors.map((color, index) => (
                    <ElectronShell key={index} radius={(index + 1) * 2} color={color} opacity={0.5} />
                ))}
                <Particles count={5000} />
                <OrbitControls enableDamping dampingFactor={0.25} screenSpacePanning={false} minDistance={5} maxDistance={100} />
            </Canvas>
        </div>
    );
};

export default MainScene;

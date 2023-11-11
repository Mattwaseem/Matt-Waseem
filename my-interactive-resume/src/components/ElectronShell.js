import React from 'react';

const ElectronShell = ({ radius, color, opacity }) => {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} wireframe />
        </mesh>
    );
};

export default ElectronShell;

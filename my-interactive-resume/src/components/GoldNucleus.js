import React from 'react';

const GoldNucleus = () => {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={'gold'} />
        </mesh>
    );
};

export default GoldNucleus;

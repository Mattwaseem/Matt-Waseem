import React, { useMemo } from 'react';
import * as THREE from 'three';
// ... rest of your code



function Particles({ count }) {
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * (Math.random() * 600);
        }
        return positions;
    }, [count]);

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute attachObject={['attributes', 'position']} count={count} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial attach="material" size={0.005} color="white" />
        </points>
    );
}

export default Particles;

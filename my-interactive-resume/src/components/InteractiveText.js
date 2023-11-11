import React from 'react';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const InteractiveText = ({ position, text, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <Text
            position={position}
            fontSize={0.5}
            color="white"
            onClick={handleClick}
            cursor="pointer"
        >
            {text}
        </Text>
    );
};

export default InteractiveText;

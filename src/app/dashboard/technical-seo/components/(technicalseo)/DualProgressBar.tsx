import React from 'react';

interface DualProgressBarProps {
    leftPercentage: string;
}

const DualProgressBar: React.FC<DualProgressBarProps> = ({ leftPercentage }) => {
    const progressStyle = {
        width: leftPercentage,
    };

    return (
        <section className="flex items-center h-8 bg-red-500 w-full rounded-3xl">
            <div style={progressStyle} className="h-full bg-green-500 rounded-3xl"></div>
        </section>
    );
};

export default DualProgressBar;

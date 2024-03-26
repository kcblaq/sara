// DualProgressBar.tsx

import React from 'react';

interface DualProgressBarProps {
    leftPercentage: number;
}

const DualProgressBar: React.FC<DualProgressBarProps> = ({ leftPercentage }) => {
    return (
        <section className={`flex items-center h-8 bg-red-500 w-full rounded-3xl `}>

        </section>
    );
};

export default DualProgressBar;

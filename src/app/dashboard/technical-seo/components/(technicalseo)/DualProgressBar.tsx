import React from "react";

interface DualProgressBarProps {
  leftPercentage: string;
}

const DualProgressBar: React.FC<DualProgressBarProps> = ({
  leftPercentage,
}) => {
  const progressStyle = {
    width: leftPercentage,
  };

  return (
    <section className="flex items-center h-4 bg-red-500 w-full rounded-tr-3xl rounded-br-3xl">
      <div
        style={progressStyle}
        className="h-full bg-green-500 rounded-tl-3xl rounded-bl-3xl"
      ></div>
    </section>
  );
};

export default DualProgressBar;

interface QuadProgressBarProps {
  metric1Percentage: string;
  metric2Percentage: string;
  metric3Percentage: string;
  metric4Percentage: string;
}

export const QuadProgressBar: React.FC<QuadProgressBarProps> = ({
  metric1Percentage,
  metric2Percentage,
  metric3Percentage,
  metric4Percentage,
}) => {
  const metric1Style = { width: metric1Percentage };
  const metric2Style = { width: metric2Percentage };
  const metric3Style = { width: metric3Percentage };
  const metric4Style = { width: metric4Percentage };

  return (
    <section className="flex items-center h-4 border w-full rounded-3xl">
      <div
        style={metric1Style}
        className="h-full bg-[#12B76A] rounded-l-3xl"
      ></div>
      <div style={metric2Style} className="h-full bg-[#2E90FA]"></div>
      <div style={metric3Style} className="h-full bg-[#D1E9FF]"></div>
      <div
        style={metric4Style}
        className="h-full bg-[#FEDF89] rounded-r-3xl"
      ></div>
    </section>
  );
};

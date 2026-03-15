import React from "react";

interface Props {
  label: string;
  className: string;
  onClick: (value: string) => void;
}

const CalcButton: React.FC<Props> = ({ label, className, onClick }) => {
  return (
    <button className={className} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default CalcButton;
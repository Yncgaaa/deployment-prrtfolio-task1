import React from "react";

interface Props {
  previous: string;
  op: string;
  current: string;
  time: string;
}

const Display: React.FC<Props> = ({ previous, op, current, time }) => {
  return (
    <div>

      <div className="calc-time">
        Last Calc: {time}
      </div>

      <div className="display">

        <div className="previous-equation">
          {previous} {op}
        </div>

        <div className="current-input">
          {current}
        </div>

      </div>

    </div>
  );
};

export default Display;
import React from "react";

interface HistoryItem {
  expression: string;
  time: string;
}

interface Props {
  history: HistoryItem[];
  clearHistory: () => void;
}

const HistoryPanel: React.FC<Props> = ({ history, clearHistory }) => {
  return (
    <div className="history-panel">

      <h3>History</h3>

      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            {item.expression} ({item.time})
          </div>
        ))}
      </div>

      <button className="clear-history" onClick={clearHistory}>
        Clear History
      </button>

    </div>
  );
};

export default HistoryPanel;
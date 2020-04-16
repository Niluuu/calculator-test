import React from "react";

export default function History({ store }) {
  return (
    <div>
      <div className="history">
        <ul>
          {store.map((item) => (
            <li key={item.date}>{item.calculation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

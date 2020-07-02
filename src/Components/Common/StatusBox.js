import React from "react";

function StatusBox(props) {
  debugger
  return (
    <div className="column">
      <div className="box">
        <div className="subtitle">
          {props.status} {props.qty}
        </div>
      </div>
    </div>
  );
}

export default StatusBox;

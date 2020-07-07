import React from "react";
import './StatusBox.css';

function StatusBox(props) {
  
  return (
    <div className="column">
      <div className={"box " + props.nameOfClass}>
        <div className="subtitle">
          {props.status} {props.qty}
        </div>
      </div>
    </div>
  );
}

export default StatusBox;

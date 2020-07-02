import React from "react";

function Heading(props) {
  return (
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <div className="title">{props.heading}</div>
        </div>
      </div>
    </div>
    
  );
}

export default Heading;

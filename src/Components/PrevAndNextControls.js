import React from "react";
import "./app.css";

function PrevAndNext() {
    return (
        <div className="previous-next-controls">
            <button className="previous-btn"><i className="fa-solid fa-backward"></i></button>
            <button className="next-btn"><i className="fa-solid fa-forward"></i></button>
        </div>
    )
}

export default PrevAndNext;
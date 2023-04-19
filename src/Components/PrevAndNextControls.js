import React, {useEffect, useRef} from "react";
import "./app.css";
import formatTime from "./formatTime";


function PrevAndNext(props) {
    const mainVideo = props.mainVideo;
    const videoState = props.video;
    const nextBtn = useRef(null)
    const prevBtn = useRef(null)

    useEffect(() => {
        if (videoState.videoIndex === 1) {
            prevBtn.current.setAttribute('disabled', true)
            prevBtn.current.style.opacity = 0.3
        } else {
            prevBtn.current.setAttribute('disabled', false)
            prevBtn.current.style.opacity = 1
        }
    })


    function prevVideo() {

    }

    function nextVideo() {

    }


    return (<div className="previous-next-controls">
        <button className="previous-btn" onClick={prevVideo} ref={prevBtn}><i className="fa-solid fa-backward"></i>
        </button>
        <button className="next-btn" onClick={nextVideo} ref={nextBtn}><i className="fa-solid fa-forward"></i>
        </button>
    </div>)
}

export default PrevAndNext;
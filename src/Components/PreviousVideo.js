import React, {useRef} from "react";

function PreviousVideo(props) {
    const {list, setVideo, video, mainVideoRef} = props;

    const btnRef = useRef(null)

    function onBtnClick() {
        if (video.activeIndex === 0) {
            return btnRef.current.setAttribute("disabled", "")
        } else {
            btnRef.current.removeAttribute("disabled", "")
        }
        const prevVideo = list[video.activeIndex - 1];
        document.querySelector(".volume-slider").value = 1;
        if (mainVideoRef.current !== null) {
            mainVideoRef.current.volume = 1;
        }
        setVideo({
            ...video,
            videoTitle: prevVideo.title,
            videoSrc: prevVideo.videoUrl,
            isPlaying: false,
            isMuted: false,
            volume: 1,
            videoDuration: +0,
            videoCurrentTime: +0,
            activeIndex: video.activeIndex - 1,
        })
    }

    return (
        <button className="previous-btn" ref={btnRef} onClick={() => {
            onBtnClick()
        }}><i className="fa-solid fa-backward"></i></button>
    )
}

export default PreviousVideo;
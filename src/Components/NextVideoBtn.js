import React, {useRef} from "react";

function NextVideoBtn(props) {
    const {list, setVideo, video, mainVideoRef} = props;
    const btnRef = useRef(null)

    function onBtnClick() {
        if (video.activeIndex + 1 === list.length) {
            return btnRef.current.setAttribute("disabled", "")
        } else {
            btnRef.current.removeAttribute("disabled", "")
        }
        const nextVideo = list[video.activeIndex + 1];
        document.querySelector(".volume-slider").value = 1;
        if (mainVideoRef.current !== null) {
            mainVideoRef.current.volume = 1;
        }
        setVideo({
            ...video,
            videoTitle: nextVideo.title,
            videoSrc: nextVideo.videoUrl,
            isPlaying: false,
            isMuted: false,
            volume: 1,
            videoDuration: +0,
            videoCurrentTime: +0,
            activeIndex: video.activeIndex + 1,
        })
    }

    return (<button className="next-btn" ref={btnRef} onClick={() => {
        onBtnClick()
    }}><i className="fa-solid fa-forward"></i></button>)
}

export default NextVideoBtn;
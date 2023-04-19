import React, {useEffect, useRef} from "react";
import formatTime from "./formatTime";

function PlayerControls(props) {

    const mainVideo = props.mainVideo;
    const videoState = props.video;
    const setVideoState = props.setVideo;
    const volumeSliderRef = useRef(null);
    const volumeSliderIconRef = useRef(null);
    const currentTimeRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        volumeSliderRef.current.style.setProperty('--value', volumeSliderRef.current.value);
        volumeSliderRef.current.style.setProperty('--min', "0");
        volumeSliderRef.current.style.setProperty('--max', "1");

        if (videoState.videoSrc !== "") {
            timelineRef.current.setAttribute("max", mainVideo.current.duration)
            timelineRef.current.style.setProperty('--timelinevalue', mainVideo.current.currentTime);
        }

        timelineRef.current.style.setProperty('--timelinemin', "0");
        if (videoState.videoSrc !== "") {
            if (isNaN(mainVideo.current.duration)) {
                timelineRef.current.style.setProperty('--timelinemax', "1");
                timelineRef.current.value = 0
            } else {
                timelineRef.current.style.setProperty('--timelinemax', `${mainVideo.current.duration}`);
            }
        }
        if (videoState.videoSrc !== "") {
            if (!videoState.isPlaying) {
                mainVideo.current.pause();
            } else {
                mainVideo.current.play();
            }
        }
    })


    const togglePlay = () => {
        if (videoState.isPlaying) {
            mainVideo.current.pause();
        } else {
            mainVideo.current.play();
        }
        setVideoState({
            ...videoState, isPlaying: !videoState.isPlaying,
        })
    };

    function toggleMute() {
        mainVideo.current.volume === 0 ? mainVideo.current.volume = 1 : mainVideo.current.volume = 0;
        setVideoState({
            ...videoState, isMuted: !videoState.isMuted
        })
        volumeSliderRef.current.value > 0 ? volumeSliderRef.current.value = 0 : volumeSliderRef.current.value = 1;
    }

    function setVideoVolume(e) {
        mainVideo.current.volume = e.target.value;
        setVideoState({
            ...videoState,
            volume: mainVideo.current.volume,
        })
        if (mainVideo.current.volume > 0) {
            if (videoState.isMuted) {
                setVideoState({
                    ...videoState,
                    isMuted: false,
                    volume: mainVideo.current.volume
                })
            }
        }

        mainVideo.current.volume === 0 ? setVideoState({...videoState, isMuted: true}) : setVideoState({
            ...videoState, isMuted: false
        })
    }

    const handleLoaded = () => {
        setVideoState({...videoState, videoDuration: formatTime(mainVideo.current.duration)})
    }
    if (mainVideo.current) {
        mainVideo.current.addEventListener("loadeddata", handleLoaded)
    }

    const handleTimeUpdate = () => {
        setVideoState({
            ...videoState, videoCurrentTime: formatTime(mainVideo.current.currentTime),
        })
        timelineRef.current.value = mainVideo.current.currentTime
    }

    if (mainVideo.current) {
        mainVideo.current.addEventListener("timeupdate", handleTimeUpdate)
    }

    return (<>
        <div className="video-controls">
            <div className="volume-container">
                <input className="volume-slider slider-progress" type="range" ref={volumeSliderRef} onInput={e => {
                    setVideoVolume(e)
                    e.target.style.setProperty('--value', e.target.value)
                }}
                       orient="vertical"
                       min="0" max="1"
                       step="any"/>
                <button className="volume-btn" onClick={toggleMute}>
                    <i className={`fa-solid fa-volume-${videoState.isMuted ? "xmark" : "high"}`}></i>
                </button>
            </div>

            <div className="play-pause-btn-container" onClick={togglePlay}>
                <button className="play-pause-btn">
                    <i ref={volumeSliderIconRef}
                       className={`play-pause-icon fa-solid fa-circle-${!videoState.isPlaying ? "play" : "pause"}`}></i>
                </button>

            </div>

            <div className="timeline-container">

                <input className="timeline-input slider-progress" type="range" min={0} ref={timelineRef}
                       onInput={() => {
                           timelineRef.current.style.setProperty('--timelinevalue', mainVideo.current.currentTime);
                           mainVideo.current.currentTime = timelineRef.current.value
                           setVideoState({
                               ...videoState,
                               videoCurrentTime: formatTime(mainVideo.current.currentTime),
                           })
                       }}/>
            </div>

            <div className="duration-container">
                <div className="current-time"
                     ref={currentTimeRef}>{videoState.videoCurrentTime ? videoState.videoCurrentTime : ""}</div>
                <span>{
                    videoState.videoCurrentTime ? "/" : ""
                }</span>
                <div className="total-time">{videoState.videoDuration}</div>
            </div>
        </div>
        <div className="video-title">{videoState.videoTitle}</div>
    </>)
}

export default PlayerControls;
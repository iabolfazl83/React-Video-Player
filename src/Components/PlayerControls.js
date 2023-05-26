import React, {useEffect, useRef} from "react";
import formatTime from "../Helpers/formatTime";

function PlayerControls(props) {
    const {mainVideo, video, setVideo,} = props;
    const volumeSliderRef = useRef(null);
    const currentTimeRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        volumeSliderRef.current.style.setProperty('--value', volumeSliderRef.current.value);
        volumeSliderRef.current.style.setProperty('--min', "0");
        volumeSliderRef.current.style.setProperty('--max', "1");

        if (video.videoSrc !== "") {
            timelineRef.current.setAttribute("max", mainVideo.current.duration)
            timelineRef.current.style.setProperty('--timelinevalue', mainVideo.current.currentTime);
        }

        timelineRef.current.style.setProperty('--timelinemin', "0");
        if (video.videoSrc !== "") {
            if (isNaN(mainVideo.current.duration)) {
                timelineRef.current.style.setProperty('--timelinemax', "1");
                timelineRef.current.value = 0
            } else {
                timelineRef.current.style.setProperty('--timelinemax', `${mainVideo.current.duration}`);
            }
        }
        if (video.videoSrc !== "") {
            if (!video.isPlaying) {
                mainVideo.current.pause();
            } else {
                mainVideo.current.play();
            }
        }
    })


    const togglePlay = () => {
        if (video.isPlaying) {
            mainVideo.current.pause();
        } else {
            mainVideo.current.play();
        }
        setVideo({
            ...video, isPlaying: !video.isPlaying,
        })
    };

    function toggleMute() {
        mainVideo.current.volume === 0 ? mainVideo.current.volume = 1 : mainVideo.current.volume = 0;
        setVideo({
            ...video, isMuted: !video.isMuted
        })
        volumeSliderRef.current.value > 0 ? volumeSliderRef.current.value = 0 : volumeSliderRef.current.value = 1;
    }

    function setVideoVolume(e) {
        mainVideo.current.volume = e.target.value;
        setVideo({
            ...video,
            volume: mainVideo.current.volume,
        })
        if (mainVideo.current.volume > 0) {
            if (video.isMuted) {
                setVideo({
                    ...video,
                    isMuted: false,
                    volume: mainVideo.current.volume
                })
            }
        }

        mainVideo.current.volume === 0 ? setVideo({...video, isMuted: true}) : setVideo({
            ...video, isMuted: false
        })
    }

    const handleLoaded = () => {
        setVideo({...video, videoDuration: formatTime(mainVideo.current.duration)})
    }
    if (mainVideo.current) {
        mainVideo.current.addEventListener("loadeddata", handleLoaded)
    }

    const handleTimeUpdate = () => {
        setVideo({
            ...video, videoCurrentTime: formatTime(mainVideo.current.currentTime),
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
                    <i className={`fa-solid fa-volume-${video.isMuted ? "xmark" : "high"}`}></i>
                </button>
            </div>

            <div className="play-pause-btn-container" onClick={togglePlay}>
                <button className="play-pause-btn">
                    <i className={`play-pause-icon fa-solid fa-circle-${!video.isPlaying ? "play" : "pause"}`}></i>
                </button>

            </div>

            <div className="timeline-container">

                <input className="timeline-input slider-progress" type="range" min={0} ref={timelineRef}
                       onInput={() => {
                           timelineRef.current.style.setProperty('--timelinevalue', mainVideo.current.currentTime);
                           mainVideo.current.currentTime = timelineRef.current.value
                           setVideo({
                               ...video,
                               videoCurrentTime: formatTime(mainVideo.current.currentTime),
                           })
                       }}/>
            </div>

            <div className="duration-container">
                <div className="current-time"
                     ref={currentTimeRef}>{video.videoCurrentTime ? video.videoCurrentTime : ""}</div>
                <span>{
                    video.videoCurrentTime ? "/" : ""
                }</span>
                <div className="total-time">{video.videoDuration}</div>
            </div>
        </div>
        <div className="video-title">{video.videoTitle}</div>
    </>)
}

export default PlayerControls;
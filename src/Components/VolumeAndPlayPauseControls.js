import React, {useEffect, useRef} from "react";

function VolumeAndPlayPauseControls(props) {

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
        setVideoState({
            ...videoState, isMuted: !videoState.isMuted
        })
        volumeSliderRef.current.value > 0 ? volumeSliderRef.current.value = 0 : volumeSliderRef.current.value = 1;
        mainVideo.current.muted = !videoState.isMuted;
    }

    function setVideoVolume(e) {
        mainVideo.current.volume = +e.target.value;
        videoState.volume = mainVideo.current.volume;
        !videoState.volume > 0 ? setVideoState({...videoState, isMuted: false}) : setVideoState({
            ...videoState, isMuted: true
        })
        videoState.volume === 0 ? setVideoState({...videoState, isMuted: true}) : setVideoState({
            ...videoState, isMuted: false
        })
        // mainVideo.current.volume = videoState.volume;
        // setVideoState({
        //     ...videoState,
        //     volume: e.target.value
        // })
        // videoState.isMuted = e.target.value === 0
        // e.target.value == 0
        //     ?
        //     setVideoState({
        //         ...videoState,
        //         isMuted: true
        //     })
        //     :
        //     setVideoState({
        //         ...videoState,
        //         isMuted: false
        //     })
    }

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })

    function formatDuration() {
        const seconds = Math.floor(mainVideo.current.duration % 60)
        const minutes = Math.floor(mainVideo.current.duration / 60) % 60
        const hours = Math.floor(mainVideo.current.duration / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    function formatCurrentTime() {
        const seconds = Math.floor(mainVideo.current.currentTime % 60)
        const minutes = Math.floor(mainVideo.current.currentTime / 60) % 60
        const hours = Math.floor(mainVideo.current.currentTime / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    const handleLoaded = () => {
        setVideoState({...videoState, videoDuration: formatDuration()})
    }
    if (mainVideo.current) {
        mainVideo.current.addEventListener("loadeddata", handleLoaded)
    }

    const handleTimeUpdate = () => {
        setVideoState({
            ...videoState, videoCurrentTime: formatCurrentTime(),
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
                    setVideoVolume.bind(e)
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
                               videoCurrentTime: formatCurrentTime(mainVideo.current.currentTime),
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

export default VolumeAndPlayPauseControls;
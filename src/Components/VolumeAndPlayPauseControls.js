import React, {useEffect, useRef} from "react";

function VolumeAndPlayPauseControls(props) {

    const mainVideo = props.mainVideo;
    const videoState = props.video;
    const setVideoState = props.setVideo;
    const volumeSliderRef = useRef(null);
    const volumeSliderIconRef = useRef(null);
    const currentTimeRef = useRef(null);
    const timelineContainerRef = useRef(null);
    const timelineRef = useRef(null);
    const thumbIndicatorRef = useRef(null);
    let percent;

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
        percent = (mainVideo.current.currentTime / mainVideo.current.duration) * 100;
        timelineRef.current.style.width = `${percent}%`
        thumbIndicatorRef.current.style.left = `calc(${percent}% - 2px)`
    }


    if (mainVideo.current) {
        mainVideo.current.addEventListener("timeupdate", handleTimeUpdate)
    }


    document.addEventListener("mouseup", e => {
        if (videoState.isScrubbing) toggleScrubbing(e)
    })
    document.addEventListener("mousemove", e => {
        if (videoState.isScrubbing) handleTimelineUpdate(e)
    })


    function toggleScrubbing(e) {
        const rect = timelineContainerRef.current.getBoundingClientRect();
        const rectPercent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
        setVideoState({
            ...videoState,
            isScrubbing: (e.buttons & 1) === 1,
        })

        if (videoState.isScrubbing) {
            setVideoState({
                ...videoState,
                isPlaying: false,
            })
        } else {
            mainVideo.current.currentTime = rectPercent * mainVideo.current.duration;
            setVideoState({
                ...videoState,
                videoCurrentTime: mainVideo.current.currentTime,
            })

            if (!videoState.isPlaying) {
                setVideoState({
                    ...videoState,
                    isPlaying: true,
                })
            }
        }
        handleTimelineUpdate(e)
    }


    function handleTimelineUpdate(e) {
        const rect = timelineContainerRef.current.getBoundingClientRect();
        const rectPercent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width

        if (videoState.isScrubbing) {
            e.preventDefault()
            timelineRef.current.style.width = `${rectPercent}%`
        }
    }

    useEffect(() => {
        timelineRef.current.style.width = "0";
        thumbIndicatorRef.current.style.left = `0`
    }, [videoState.videoTitle]);


    return (<>
        <div className="video-controls">
            <div className="volume-container">
                <input className="volume-slider" type="range" ref={volumeSliderRef} onInput={setVideoVolume.bind(this)}
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

            <div className="timeline-container" ref={timelineContainerRef} onMouseMove={(e) => {
                handleTimelineUpdate(e)
            }}
                 onMouseDown={(e) => {
                     toggleScrubbing(e)
                 }}>

                <div className="timeline">
                    <div ref={timelineRef} className="timeline-before" style={{
                        position: 'absolute',
                        content: '',
                        top: '0',
                        bottom: '0',
                        width: `0`,
                        backgroundColor: '#fff',
                    }}/>
                    <div className="thumb-indicator" ref={thumbIndicatorRef}></div>
                </div>
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
import React, {useEffect, useRef, useState} from "react";
import "./app.css";
import PlayerControls from "./PlayerControls";
import PreviousAndNextControls from "./SkipControls";
import GalleryList from "./GalleryList";
import formatTime from "./formatTime";
import Videos from "../assets/Videos";

function App() {
    const mainVideoRef = useRef(null)
    const videoPlayerContainerRef = useRef(null)
    const videoControlsContainerRef = useRef(null)
    const galleryVideoContainerRef = useRef(null)
    const leftArrowRef = useRef(null)
    const rightArrowRef = useRef(null)
    const [video, setVideo] = useState({
        videoTitle: "",
        videoSrc: "",
        isPlaying: false,
        isMuted: false,
        volume: 1,
        videoDuration: +0,
        videoCurrentTime: +0,
        activeIndex: null,
    })

    function onThumbnailClick(item, index) {
        document.querySelector(".volume-slider").value = 1;
        if (mainVideoRef.current !== null) {
            mainVideoRef.current.volume = 1;
        }

        setVideo({
            ...video,
            isPlaying: false,
            isMuted: false,
            volume: 1,
            videoTitle: item.title,
            videoSrc: item.videoUrl,
            videoDuration: formatTime(item.videoTime),
            videoCurrentTime: +0,
            activeIndex: index,
            videoIndexObj: Videos[video.activeIndex],
        })
    }

    useEffect(() => {
        videoPlayerContainerRef.current.addEventListener("mouseover", () => {
            !video.videoTitle ? videoControlsContainerRef.current.style.opacity = 0 : videoControlsContainerRef.current.style.opacity = 1
        })
        galleryVideoContainerRef.current.scrollLeft === 0 ? leftArrowRef.current.setAttribute("disabled", "") : leftArrowRef.current.removeAttribute("disabled", "");
    }, [video])

    return (
        <div className="app">
            <div className="video-player-wrapper">
                <div className="video-player-container" ref={videoPlayerContainerRef} style={{
                    pointerEvents: video.videoSrc == "" ? "none" : "all"
                }}>
                    <div className="video-player-before"></div>
                    {
                        video.videoSrc === "" ?
                            <div className="mainvid-default">
                                <p>
                                    Please Select a Video
                                </p>
                            </div>
                            :
                            <video id="main-video" ref={mainVideoRef}
                                   src={require(`../assets/video_files/${video.videoSrc === "" ? null : video.videoSrc}`)}>
                                your browser does not support video.
                            </video>
                    }
                    <div className="video-controls-container" ref={videoControlsContainerRef}>
                        {
                            <PreviousAndNextControls video={video} mainVideo={mainVideoRef}
                                                     setVideo={setVideo}></PreviousAndNextControls>
                        }
                        {
                            <PlayerControls video={video} mainVideo={mainVideoRef}
                                            setVideo={setVideo}></PlayerControls>
                        }
                    </div>
                </div>
                <div className="gallery-slider">
                    {
                        <GalleryList activeIndex={video.activeIndex} onThumbnailClick={onThumbnailClick}
                                     list={Videos} galleryVideoContainerRef={galleryVideoContainerRef}
                                     leftArrowRef={leftArrowRef} rightArrowRef={rightArrowRef}></GalleryList>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;


// todo: prev&next btn
import React, {useEffect, useRef, useState} from "react";
import "./app.css";
import VolumeAndPlayPauseControls from "./VolumeAndPlayPauseControls";
import PreviousAndNextControls from "./PrevAndNextControls";
import GalleryList from "./GalleryList";

function App() {
    const mainVid = useRef(null)
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
    })

    function leftArrow() {
        galleryVideoContainerRef.current.scrollBy({
            left: -236,
            behavior: 'smooth'
        })

        if (galleryVideoContainerRef.current.scrollLeft === 0 || galleryVideoContainerRef.current.scrollLeft <= 236) {
            leftArrowRef.current.setAttribute("disabled", "")
        } else {
            leftArrowRef.current.removeAttribute("disabled", "");
            rightArrowRef.current.removeAttribute("disabled", "");
        }
    }

    function rightArrow() {
        galleryVideoContainerRef.current.scrollBy({
            left: +236,
            behavior: 'smooth'
        })

        if (galleryVideoContainerRef.current.scrollLeft === 2116 || galleryVideoContainerRef.current.scrollLeft >= 1644) {
            rightArrowRef.current.setAttribute("disabled", "")
        } else {
            rightArrowRef.current.removeAttribute("disabled", "");
            leftArrowRef.current.removeAttribute("disabled", "");
        }
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
                            <video id="main-video" ref={mainVid}
                                   src={require(`../assets/video_files/${video.videoSrc === "" ? null : video.videoSrc}`)}>
                                your browser does not support video.
                            </video>
                    }
                    <div className="video-controls-container" ref={videoControlsContainerRef}>
                        {
                            <PreviousAndNextControls video={video} mainVideo={mainVid}
                                                     setVideo={setVideo}></PreviousAndNextControls>
                        }
                        {
                            <VolumeAndPlayPauseControls video={video} mainVideo={mainVid}
                                                        setVideo={setVideo}></VolumeAndPlayPauseControls>
                        }
                    </div>
                </div>
                <div className="gallery-slider">
                    <button className="left-arrow" onClick={leftArrow} ref={leftArrowRef}><i
                        className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="gallery-videos-container" ref={galleryVideoContainerRef}>
                        {
                            <GalleryList video={video} setVideo={setVideo}></GalleryList>
                        }
                    </div>
                    <button className="right-arrow" onClick={rightArrow} ref={rightArrowRef}><i
                        className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;

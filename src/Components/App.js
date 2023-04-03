import React, {useEffect, useRef, useState} from "react";
import "./app.css";
import VolumeAndPlayPauseControls from "./VolumeAndPlayPauseControls";
import PreviousAndNextControls from "./PrevAndNextControls";
import GalleryList from "./GalleryList";

function App() {
    const mainVid = useRef(null)
    const videoPlayerContainerRef = useRef(null)
    const videoControlsContainerRef = useRef(null)
    const [video, setVideo] = useState({
        videoTitle: "",
        videoSrc: "",
        isPlaying: false,
        isMuted: false,
        volume: 1,
        videoDuration: +0,
        videoCurrentTime: +0,
        timeLine: "0",
        videoIndex: 0,
        isScrubbing: false,
    })

    useEffect(() => {
        videoPlayerContainerRef.current.addEventListener("mouseover", () => {
            !video.videoTitle ? videoControlsContainerRef.current.style.opacity = 0 : videoControlsContainerRef.current.style.opacity = 1
        })
    }, [video])

    return (
        <div className="app">
            <div className="video-player-wrapper">
                <div className="video-player-container" ref={videoPlayerContainerRef}>
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
                            <PreviousAndNextControls></PreviousAndNextControls>
                        }
                        {
                            <VolumeAndPlayPauseControls video={video} mainVideo={mainVid}
                                                        setVideo={setVideo}></VolumeAndPlayPauseControls>
                        }
                    </div>
                </div>
                <div className="gallery-slider">
                    <button className="left-arrow"><i className="fa-solid fa-chevron-left"></i></button>
                    <div className="gallery-videos-container">
                        {
                            <GalleryList video={video} setVideo={setVideo}></GalleryList>
                        }
                    </div>
                    <button className="right-arrow"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
                <div className="res-container">
                </div>
            </div>
        </div>
    );
}

export default App;

// todo: Timeline Click and Drag
// todo: Volume Bug
// todo: slider
// todo: transform: translate should be - 14rem
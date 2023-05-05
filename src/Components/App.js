import React, {useRef, useState} from "react";
import "./app.css";
import "./media-queries.css"
import PlayerControls from "./PlayerControls";
import PreviousVideo from "./PreviousVideo";
import NextVideoBtn from "./NextVideoBtn";
import GalleryList from "./GalleryList";
import formatTime from "./formatTime";
import Videos from "../assets/Videos";

function App() {
    const mainVideoRef = useRef(null)
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
        })
    }

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
                        <div className="previous-next-controls">
                            {
                                <>
                                    <PreviousVideo list={Videos} video={video} setVideo={setVideo}
                                                   mainVideoRef={mainVideoRef}></PreviousVideo>
                                    <NextVideoBtn list={Videos} video={video} setVideo={setVideo}
                                                  mainVideoRef={mainVideoRef}></NextVideoBtn>
                                </>
                            }
                        </div>
                        {
                            <PlayerControls video={video} mainVideo={mainVideoRef}
                                            setVideo={setVideo}></PlayerControls>
                        }
                    </div>
                </div>
                <div className="gallery-slider">
                    {
                        <GalleryList activeIndex={video.activeIndex} onThumbnailClick={onThumbnailClick}
                                     list={Videos}></GalleryList>
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
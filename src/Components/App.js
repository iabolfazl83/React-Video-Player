import React, {useEffect, useRef, useState} from "react";
import "./Styles/app.css";
import "./Styles/media-queries.css"
import PlayerControls from "./PlayerControls";
import PlayerBtn from "./PlayerBtn";
import GalleryList from "./GalleryList";
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
        isFirst: true,
        isLast: false,
    })

    useEffect(() => {
        setVideo({
            ...video,
            isLast: video.activeIndex + 1 === Videos.length,
            isFirst: video.activeIndex === 0,
        })
    }, [video.activeIndex]);

    function setVideoState(item) {
        const index = Videos.findIndex(x => x.id === item.id)
        setVideo({
            ...video,
            isPlaying: false,
            isMuted: false,
            volume: 1,
            videoTitle: item.title,
            videoSrc: item.videoUrl,
            videoCurrentTime: +0,
            activeIndex: index,
        })
    }

    function onThumbnailClick(item) {
        document.querySelector(".volume-slider").value = 1;
        if (mainVideoRef.current !== null) {
            mainVideoRef.current.volume = 1;
        }
        setVideoState(item)
    }

    function goToPreviousVideo() {
        const prevVideo = Videos[video.activeIndex - 1];
        document.querySelector(".volume-slider").value = 1;
        if (mainVideoRef.current !== null) {
            mainVideoRef.current.volume = 1;
        }
        setVideoState({...prevVideo, activeIndex: video.activeIndex - 1})
    }

    function goToNextVideo() {
        const nextVideo = Videos[video.activeIndex + 1];
        document.querySelector(".volume-slider").value = 1;
        if (mainVideoRef.current !== null) {
            mainVideoRef.current.volume = 1;
        }
        setVideoState({...nextVideo, activeIndex: video.activeIndex + 1})
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
                                    <PlayerBtn disabled={video.isFirst} onClick={goToPreviousVideo}>
                                        <i className="fa-solid fa-backward"></i>
                                    </PlayerBtn>

                                    <PlayerBtn disabled={video.isLast} onClick={goToNextVideo}>
                                        <i className="fa-solid fa-forward"></i>
                                    </PlayerBtn>
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
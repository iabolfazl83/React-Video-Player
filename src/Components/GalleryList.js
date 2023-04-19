import React from "react";
import Videos from "../assets/Videos";
import formatTime from "./formatTime";


function GallerySlider(props) {
    let videoState = props.video;
    let setVideoState = props.setVideo;
    let mainVideo = props.mainVideo;

    return (Videos.map((item, index) => {
        return (<div className="gallery-video">
            <div className="video-thumbnail">
                <span className={`play-icon fa ${videoState.videoIndex === index ? "fa-pause" : "fa-play"}`}></span>
                <img src={require(`../assets/video_thumbnails/${item.img_url}`)} alt="thumbnail"
                     className={`${videoState.videoIndex === index ? "is-active" : ""} video-thumbnail`}
                     onClick={() => {
                         document.querySelector(".volume-slider").value = 1;
                         if (mainVideo.current !== null) {
                             mainVideo.current.volume = 1;
                         }
                         setVideoState({
                             ...videoState,
                             isPlaying: false,
                             isMuted: false,
                             volume: 1,
                             videoTitle: item.title,
                             videoSrc: item.video_url,
                             videoDuration: formatTime(item.videoTime),
                             videoCurrentTime: +0,
                             videoIndex: index,
                             videoIndexObj: Videos[videoState.videoIndex],
                         })
                     }}
                />
            </div>
            <div className="video-name">{item.title}</div>
        </div>)
    }))
}


export default GallerySlider;
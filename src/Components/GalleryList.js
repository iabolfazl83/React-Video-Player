import React from "react";
import Videos from "../assets/Videos";
import formatTime from "./formatTime";


function GallerySlider(props) {
    let videoState = props.video;
    let setVideoState = props.setVideo;

    return (Videos.map((item, index) => {
        return (<div className="gallery-video">
            <div className="video-thumbnail">
                <img src={require(`../assets/video_thumbnails/${item.img_url}`)} alt="thumbnail" className="thumbnail"
                     onClick={() => {
                         setVideoState({
                             ...videoState,
                             isPlaying: false,
                             isMuted: false,
                             videoTitle: item.title,
                             videoSrc: item.video_url,
                             videoDuration: formatTime(item.videoTime),
                             videoCurrentTime: +0,
                             videoIndex: index,
                             videoIndexObj: Videos[videoState.videoIndex],
                             galleryListItem: item,
                         })
                     }}
                />
                {/*<video className="main-video" onClick={() => {*/}
                {/*    videoInGallery = item;*/}
                {/*    setVideoState({*/}
                {/*        ...videoState,*/}
                {/*        isPlaying: false,*/}
                {/*        isMuted: false,*/}
                {/*        videoTitle: item.title,*/}
                {/*        videoSrc: item.video_url,*/}
                {/*        videoDuration: formatTime(videoInGallery.videoTime),*/}
                {/*        videoCurrentTime: +0,*/}
                {/*        videoIndex: index,*/}
                {/*        videoIndexObj: Videos[videoState.videoIndex],*/}
                {/*        galleryListItem: videoInGallery,*/}
                {/*    })*/}
                {/*}}*/}
                {/*       src={require(`../assets/video_files/${item.video_url}`)}>Your browser doesn't support*/}
                {/*    Video*/}
                {/*</video>*/}
            </div>
            <div className="video-name">{item.title}</div>
        </div>)
    }))
}


export default GallerySlider;
import React from "react";
import Videos from "../assets/Videos";


function GallerySlider(props) {
    let videoState = props.video;
    let setVideoState = props.setVideo;
    let videoInGallery;

    let leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })

    function formatDuration() {
        const seconds = Math.floor(videoInGallery.length % 60)
        const minutes = Math.floor(videoInGallery.length / 60) % 60
        const hours = Math.floor(videoInGallery.length / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    return (Videos.map((item, index) => {
        return (<div className="gallery-video">
            <div className="video-thumbnail">
                <video className="main-video" onClick={() => {
                    videoInGallery = item;
                    setVideoState({
                        ...videoState,
                        isPlaying: false,
                        videoTitle: item.title,
                        videoSrc: item.video_url,
                        videoDuration: formatDuration(videoInGallery),
                        videoCurrentTime: +0,
                        videoIndex: index,
                    })
                }}
                       src={require(`../assets/video_files/${item.video_url}`)}>Your browser doesn't support
                    Video
                </video>
            </div>
            <div className="video-name">{item.title}</div>
        </div>)
    }))
}


export default GallerySlider;
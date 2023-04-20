import React from "react";

function GallerySlider(props) {
    const {activeIndex, onThumbnailClick, list} = props;

    return (list.map((item, index) => {
        return (<div className="gallery-video">
            <div className="video-thumbnail">
                <span className={`play-icon fa ${activeIndex === index ? "fa-pause" : "fa-play"}`}></span>
                <img src={require(`../assets/video_thumbnails/${item.imgUrl}`)} alt="thumbnail"
                     className={`${activeIndex === index ? "is-active" : ""} video-thumbnail`}
                     onClick={() => {
                         onThumbnailClick(item, index)
                     }}
                />
            </div>
            <div className="video-name">{item.title}</div>
        </div>)
    }))
}


export default GallerySlider;
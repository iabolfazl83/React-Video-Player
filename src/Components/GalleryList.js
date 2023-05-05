import React, {useEffect, useRef} from "react";


function GallerySlider(props) {
    const {activeIndex, onThumbnailClick, list} = props;
    const galleryVideoRef = useRef(null);
    const galleryVideoContainerRef = useRef(null);
    const leftArrowRef = useRef(null);
    const rightArrowRef = useRef(null);
    let maxScrollLeft;
    let videoWidth;

    useEffect(() => {
        galleryVideoContainerRef.current.scrollLeft === 0 ? leftArrowRef.current.setAttribute("disabled", "") : leftArrowRef.current.removeAttribute("disabled", "");
    })

    function calcScroll() {
        // if videoGallery has padding
        let videoGalleryPadding = Number(window.getComputedStyle(galleryVideoRef.current, null).getPropertyValue("padding").slice(0, -2))
        videoWidth = galleryVideoRef.current.clientWidth + videoGalleryPadding;
        maxScrollLeft = galleryVideoContainerRef.current.scrollWidth - galleryVideoContainerRef.current.clientWidth
    }

    function moveScroll(scrollProperty) {
        galleryVideoContainerRef.current.scrollBy({
            left: scrollProperty,
            behavior: 'smooth'
        })
        checkArrows()
    }

    function checkArrows() {
        galleryVideoContainerRef.current.scrollLeft === 0 ? leftArrowRef.current.setAttribute("disabled", "") : leftArrowRef.current.removeAttribute("disabled", "")
        galleryVideoContainerRef.current.scrollLeft === maxScrollLeft ? rightArrowRef.current.setAttribute("disabled", "") : rightArrowRef.current.removeAttribute("disabled", "")
    }

    return (
        <>
            <button className="left-arrow" ref={leftArrowRef} onClick={() => {
                calcScroll()
                moveScroll(videoWidth * -1)
            }}><i
                className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="gallery-videos-container" ref={galleryVideoContainerRef} onScroll={() => {
                checkArrows()
            }}>
                {
                    list.map((item, index) => {
                        return (
                            <div className="gallery-video" ref={galleryVideoRef}>
                                <div className="video-thumbnail">
                                <span
                                    className={`play-icon fa ${activeIndex === index ? "fa-pause" : "fa-play"}`}></span>
                                    <img src={require(`../assets/video_thumbnails/${item.imgUrl}`)} alt="thumbnail"
                                         className={`${activeIndex === index ? "is-active" : ""} video-thumbnail`}
                                         onClick={() => {
                                             onThumbnailClick(item, index)
                                         }}
                                    />
                                </div>
                                <div className="video-name">{item.title}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button className="right-arrow" ref={rightArrowRef} onClick={() => {
                calcScroll()
                moveScroll(videoWidth)
            }}><i
                className="fa-solid fa-chevron-right"></i>
            </button>
        </>
    )
}


export default GallerySlider;
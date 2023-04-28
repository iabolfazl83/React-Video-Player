import React, {useRef} from "react";


function GallerySlider(props) {
    const {activeIndex, onThumbnailClick, list, galleryVideoContainerRef, leftArrowRef, rightArrowRef} = props;
    const videoElRef = useRef(null)

    function leftArrow() {
        galleryVideoContainerRef.current.scrollBy({
            left: -236,
            behavior: 'smooth'
        })

        // if less than 2 scrolls are remaining skip the half part
        if (galleryVideoContainerRef.current.scrollLeft < 472) {
            galleryVideoContainerRef.current.scrollBy({
                left: -472,
                behavior: 'smooth'
            })
            leftArrowRef.current.setAttribute("disabled", "")
        }

        if (galleryVideoContainerRef.current.scrollLeft <= 236) {
            leftArrowRef.current.setAttribute("disabled", "")
        } else {
            rightArrowRef.current.removeAttribute("disabled", "");
        }
    }

    function rightArrow() {
        galleryVideoContainerRef.current.scrollBy({
            left: +236,
            behavior: 'smooth'
        })

        // if less than 2 scrolls are remaining skip the half part

        if (galleryVideoContainerRef.current.scrollLeft >= 1180) {
            galleryVideoContainerRef.current.scrollBy({
                left: +472,
                behavior: 'smooth'
            })

            rightArrowRef.current.setAttribute("disabled", "")
        }

        if (galleryVideoContainerRef.current.scrollLeft >= 1282) {
            rightArrowRef.current.setAttribute("disabled", "")
        } else {
            leftArrowRef.current.removeAttribute("disabled", "");
        }

        // if slider with was less than 472px (2 video per page)

        if (galleryVideoContainerRef.current.clientWidth <= 472) {
            if (galleryVideoContainerRef.current.scrollLeft >= 1652) {
                rightArrowRef.current.setAttribute("disabled", "")
            } else {
                rightArrowRef.current.removeAttribute("disabled", "");
                leftArrowRef.current.removeAttribute("disabled", "");
            }
        }

        // if slider with was less than 236px (1 video per page)

        if (galleryVideoContainerRef.current.clientWidth <= 236) {
            if (galleryVideoContainerRef.current.scrollLeft >= 1880) {
                rightArrowRef.current.setAttribute("disabled", "")
            } else {
                rightArrowRef.current.removeAttribute("disabled", "");
                leftArrowRef.current.removeAttribute("disabled", "");
            }
        }
    }

    return (
        <>
            <button className="left-arrow" onClick={leftArrow} ref={leftArrowRef}><i
                className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="gallery-videos-container" ref={galleryVideoContainerRef}>
                {
                    list.map((item, index) => {
                        return (
                            <div className="gallery-video" ref={videoElRef}>
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
            <button className="right-arrow" onClick={rightArrow} ref={rightArrowRef}><i
                className="fa-solid fa-chevron-right"></i>
            </button>
        </>
    )
}


export default GallerySlider;

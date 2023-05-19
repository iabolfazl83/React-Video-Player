import React, {useEffect, useRef} from "react";

function PlayerBtn(props) {
    const {disabled, children, onClick} = props
    const btnRef = useRef(null);

    useEffect(() => {
        if (disabled) {
            btnRef.current.setAttribute("disabled", "")
            btnRef.current.style.opacity = 0.4;
        } else {
            btnRef.current.removeAttribute("disabled", "")
            btnRef.current.style.opacity = 1;
        }
    }, [disabled])

    return (
        <button className="btn" ref={btnRef} onClick={() => {
            if (disabled) {return}
            onClick()
        }}>
            {
                children
            }
        </button>
    )
}

export default PlayerBtn;
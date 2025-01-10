import React, { useState, useEffect, useRef } from 'react';

const ArcodianMenu = (props) => {
    let {
        beforeComponet,
        title = "title",
        subStr = "",
        contents,
        children,
    } = props

    const arcoContentsRef = useRef(null);
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        console.log()
    }, [checked])

    return <div className="accordion-box">
        <div className="arc-menu-box" onClick={() => { checked ? setChecked(false) : setChecked(true) }}>
            <div className="title">
                {beforeComponet}
                <div className="title-18">{title}</div>
            </div>
            {subStr ?
                <div className='date'>{subStr}</div> :
                checked ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 15L12.7071 9.31461C12.3166 8.89513 11.6834 8.89513 11.2929 9.31461L6 15" stroke="#131214" stroke-width="1.5" stroke-linecap="round" />
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L11.2929 14.6854C11.6834 15.1049 12.3166 15.1049 12.7071 14.6854L18 9" stroke="#131214" stroke-width="1.5" stroke-linecap="round" />
                    </svg>}
        </div>

        <div style={{ height: checked ? arcoContentsRef.current?.offsetHeight || 0 : 0 }} className={`arc-contents-box`}>
            <div ref={arcoContentsRef} className="contents ql-snow">
                {children}
            </div>
        </div>
    </div>
}

export default ArcodianMenu
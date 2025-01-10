import React, { createRef, useEffect, useRef, useState } from "react";

export default function TabMenu(props) {
    const {
        className = "",
        name = "",
        style = {},
        menuList = [],
        tabIndex,
        setTabIndex = () => { }
    } = props;

    const menuRefList = useRef(menuList.map(() => createRef()));
    // const selectorRef = useRef(null);

    // useEffect(() => {
    //     if (menuRefList.current.length > tabIndex) {
    //         let menuWidth = menuRefList.current[tabIndex].current.offsetWidth
    //         let menuLeftTop = menuRefList.current[tabIndex].current.offsetLeft

    //         if (selectorRef) {
    //             selectorRef.current.style.width = menuWidth + "px"
    //             selectorRef.current.style.left = menuLeftTop + "px"
    //         }
    //     }
    // }, [tabIndex])

    return <div
        className={`${className ? className : ""}`}
        style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            ...style,
        }}>
        <div style={{
            display: "flex",
        }}>
            {menuList.map((v, i) => {
                return <div
                    key={name + "_tb_i_" + i}
                    ref={menuRefList.current[i]}
                    className="tab-box"
                    style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px 0px",
                        cursor: "pointer",
                        fontSize: 16,
                        fontWeight: 600,
                        color: tabIndex === i ? "#C90000" : "#898D8F",
                        borderBottom: "2px solid" + (tabIndex === i ? "#C90000" : "#E6E9EB")
                    }}
                    onClick={() => {
                        setTabIndex(i)
                    }}
                >
                    {v}
                </div>
            })}
        </div>

        {/* <div style={{
            position: "relative",
            width: "100%"
        }}>
            <div
                ref={selectorRef}
                style={{
                    position: "absolute",
                    height: 2,
                    borderRadius: 2,
                    background: "#C90000",
                    transition: "all .2s",
                    transitionTimingFunction: "ease-out"
                }}>

            </div>
        </div> */}
    </div >
}
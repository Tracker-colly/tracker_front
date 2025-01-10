import react from "react"
import images from "../libs/images"
import { useFooter } from "../zustand/store";

export function Footer(props) {
    const { className } = props;
    const { footerInfo } = useFooter();

    return <div className={`main-footer${className ? " " + className : ""}`}>
        <img className="logo" src={images.logo_black} alt="" />
        <div className="info mt-16">
            {/* <p className='font-13 color-gray'>{footerInfo?.companyName}</p> */}
            <p className='font-13 color-gray'>{footerInfo?.address}&nbsp;&nbsp;대표이사:{footerInfo?.ceo}</p>
            <p className='font-13 color-gray mt-6'>사업자등록번호 {footerInfo?.companyNo1}</p>
            <p className='font-13 color-gray mt-6'>통신판매업신고 {footerInfo?.companyNo2}</p>
            <div className='bot-box'>
                <p className='font-12 color-gray'>{footerInfo?.copyright}</p>
                {/* <div className='btn-box'>
                    <button className='market-btn' onClick={() => {
                        window.open(footerInfo?.appleLink)
                    }}>
                        <img src={images.store_apple} alt="" />
                        App Store
                    </button>
                    <button className='market-btn' onClick={() => {
                        window.open(footerInfo?.googleLink)
                    }}>
                        <img src={images.store_google} alt="" />
                        Play Store
                    </button>
                </div> */}
            </div>
        </div>
    </div>
}
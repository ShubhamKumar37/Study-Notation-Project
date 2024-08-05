import React, { useEffect, useState } from 'react';
import "../../../pages/allPageCSS.css";
import BannerVideo1 from "../../../assets/Images/banner.mp4";
import BannerVideo2 from "../../../assets/Images/pixel-tea-banner.mp4";

const ResponsiveVideo = () => {
    const [videoSource, setVideoSource] = useState(window.innerWidth < 640 ? BannerVideo2 : BannerVideo1);
    const [key, setKey] = useState(0);

    // useEffect(() => {
    //     const updateVideoSource = () => {
    //         const newSource = window.innerWidth < 640 ? BannerVideo2 : BannerVideo1;
    //         setVideoSource(newSource);
    //         setKey(prevKey => prevKey + 1); // Update the key to force re-render
    //     };

    //     // Update video source on window resize
    //     window.addEventListener('resize', updateVideoSource);

    //     // Cleanup event listener on component unmount
    //     return () => {
    //         window.removeEventListener('resize', updateVideoSource);
    //     };
    // }, []);

    return (
        <video key={key} muted autoPlay loop className="hero-video-shadow w-[70rem] relative z-10">
            <source src={videoSource} type="video/mp4" />
        </video>
    );
};

export default ResponsiveVideo;

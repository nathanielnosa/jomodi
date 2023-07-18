import React from 'react';
import '../styles/imageZoom.css' // Create a CSS file for styling

const ImageZoom = ({imageSrc}) => {
    return (
        <div className="image-zoom-container">
            <div className="main-image">
                {/* Replace the src with the URL of your main image */}
                <img src={imageSrc} alt="Main Image" />
            </div>
            <div className="zoom-image">
                {/* Replace the src with the URL of your zoomed-in image */}
                <img src={imageSrc} alt="Zoomed Image" />
            </div>
        </div>
    );
};

export default ImageZoom;

import './Slides.css'
import React from 'react';

const InstaAutoSlide = () => {
    const handleClick = () => {
        window.location.href = '/projects#insta';
    };

    return (
        <div className='slide' onClick={handleClick}>
            <div className='leftSmall textDiv'>
                <p>Updating Instagram Bio with Selenium Webdriver</p>
            </div>
            <div className='rightBig imgDiv'>
                <img alt='Instagram Auto Updater' title='Instagram Auto Updater' src='/images/insta.png'/>
            </div>
        </div>
    )
}

export default InstaAutoSlide;
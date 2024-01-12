import './Slides.css'
import React from 'react';

const GithubSlide = () => {
    const handleClick = () => {
        window.open('https://github.com/langstonhowley', '_blank');
    };

    return (
        <div className='slide' onClick={handleClick}>
            <div className='leftSmall textDiv'>
                <p>More Projects Coming Soon to Github</p>
            </div>
            <div className='rightBig imgDiv'>
                <img alt='My Github' title='My Github' src='/images/githubscreenshot.png'/>
            </div>
        </div>
    )
}

export default GithubSlide;
import './Slides.css'
import React from 'react';

const SpaceSlide = () => {
    const handleClick = () => {
        window.location.href = '/projects#senior-project';
    };

    return (
        <div className='slide' onClick={handleClick}>
            <div className='leftBig imgDiv'>
                <img alt='Hertzsprung-Russell diagram' title='Hertzsprung-Russell diagram' src='/images/HRdiag.png'/>
            </div>
            <div className='rightSmall textDiv'>
                <p>Exploring the Stars in My Senior Project</p>
            </div>
        </div>
    )
}

export default SpaceSlide;
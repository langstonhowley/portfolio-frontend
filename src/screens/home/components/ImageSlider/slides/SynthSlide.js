import './Slides.css'
import React from 'react';

const SynthSlide = () => {
    const handleClick = () => {
        window.location.href = '/projects#synth';
    };

    return (
        <div className='slide' onClick={handleClick}>
            <div className='leftBig imgDiv'>
                <img alt='My Synthesizer' title='My Synthesizer' src='/images/Synth.png'/>
            </div>
            <div className='rightSmall textDiv'>
                <p>Play a Tune with My In-Browser Synth</p>
            </div>
        </div>
    )
}

export default SynthSlide;
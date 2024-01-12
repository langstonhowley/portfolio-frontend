import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './ImageSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import SpaceSlide from './slides/SpaceSlide';
import GithubSlide from './slides/GithubSlide';
import InstaAutoSlide from './slides/InstaAutoSlide';
import SynthSlide from './slides/SynthSlide';

const ImageSlider = () => {
    const [slideIdx, setSlideIdx] = useState(0)
    const slides = useMemo(() => {
        return [<SpaceSlide />, <InstaAutoSlide />, <SynthSlide/>, <GithubSlide />];
      }, []);

    const selectNextSlide = useCallback(() => {
        let idx = (slideIdx + 1) % slides.length

        setSlideIdx(idx)
    }, [slideIdx, slides])

    const selectPreviousSlide = useCallback(() => {
        let idx = (slideIdx - 1) % slides.length

        if(idx < 0){
            idx = slides.length - 1
        }

        setSlideIdx(idx)
    },[slideIdx,slides])

    useEffect(() => {
        const intervalId = setInterval(selectNextSlide, 7500);
        return () => clearInterval(intervalId);
    }, [selectNextSlide])


    return (
        <div className='imageSliderCont'>
            <div className='slideHolder'>
                {slides[slideIdx]}
            </div>
            <div className='slideController'>
                <button title='Previous' className='slideButton' onClick={selectPreviousSlide}>
                    <FontAwesomeIcon icon={faCaretLeft} className='slideIcon'/>
                </button>
                <button title='Next' className='slideButton' onClick={selectNextSlide}>
                    <FontAwesomeIcon icon={faCaretRight} className='slideIcon'/>
                </button>
            </div>
        </div>
    )
}

export default ImageSlider;
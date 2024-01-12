import {React, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import './Projects.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import SeniorProject from './components/SeniorProject';
import Synthesizer from './components/Synthesizer';
import InstaBioUpdater from './components/InstaBioUpdater';

const Projects = () => {
    const location = useLocation();

    useEffect(() => {
        const elementId = location.hash.substring(1);
        scrollToElement(elementId);
    }, [location]);

    const scrollToElement = (elementId) => {
        setTimeout(() => {
            const element = document.getElementById(elementId);
            const desiredHeight = 50; 
            
            if (element) {
                const targetPosition = element.offsetTop - desiredHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }, 1100)
    };

    return (
        <div className='container2'>
            <h2>Scroll Down For More</h2>
            <div className='arrowDiv'>
                <FontAwesomeIcon icon={faAnglesDown} className='arrow'/>
                <FontAwesomeIcon icon={faAnglesDown} className='arrow'/>
                <FontAwesomeIcon icon={faAnglesDown} className='arrow'/>
                <FontAwesomeIcon icon={faAnglesDown} className='arrow'/>
                <FontAwesomeIcon icon={faAnglesDown} className='arrow'/>
            </div>
            <div className='slideCont'>
                <Synthesizer />
                <SeniorProject />
                <InstaBioUpdater />
            </div>
        </div>
    )

}

export default Projects;
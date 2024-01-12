import React from 'react';
import './Home.css'
import ImageSlider from './components/ImageSlider/ImageSlider'
import MusicBox from './components/MusicBox'
import SocialsBox from './components/SocialsBox'
import WeatherBox from './components/WeatherBox'
import AboutMeBox from './components/AboutMeBox'
import NamePlate from './components/NamePlate'

export default function Home(){
    return (
        <div className="container">
            <div id='inner'>
                <div className='panel1'>
                    <NamePlate />
                    <br/>
                    <MusicBox />
                    <br/>
                    <WeatherBox />
                </div>

                <div className='panel2'>
                    <SocialsBox />
                    <br/>
                    <ImageSlider />
                    <br/>
                    <AboutMeBox />
                </div>

                <div className='mobile'>
                    <SocialsBox />
                    <NamePlate />
                    <br/>
                    <AboutMeBox />
                    <br/>
                    <ImageSlider />
                </div>
            </div>
        </div>
    )
}
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MusicBox.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const MusicBox = () => {
    const [isPlaying, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.25); 
    const [trackList, setTrackList] = useState([]);
    const [currentTrackIdx, setCurrentTrackIdx] = useState(0)
    const [currentTrack, setCurrentTrack] = useState(null);
    const [trackInfoColor, setTrackInfoColor] = useState('#ffffff')

    const audioRef = useRef();

    const loadSongs = useCallback(() => {
        const tracks = [];
        const context = require.context('../../../../public/audio', false, /\.(wav)$/);
        context.keys().forEach((key) => {
          const trackName = key.replace('./', '').replace('.wav','');
          tracks.push({ name: trackName, src: context(key) });
        });
    
        setTrackList(tracks);
    }, [])

    const selectRandomTrack = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * trackList.length);
        setCurrentTrackIdx(randomIndex)
        setCurrentTrack(trackList[randomIndex]);
    }, [trackList])

    const selectNextTrack = () => {
        let idx = (currentTrackIdx + 1) % trackList.length

        setCurrentTrackIdx(idx)
        setCurrentTrack(trackList[idx]);
    }

    const selectPreviousTrack = () => {
        let idx = (currentTrackIdx - 1) % trackList.length

        if(idx < 0){
            idx = trackList.length - 1
        }

        setCurrentTrackIdx(idx)
        setCurrentTrack(trackList[idx]);
    }

    useEffect(() => {
        const toggleColors = () => {
            setTrackInfoColor((trackInfoColor === 'var(--color-gold)' ? 'var(--color-red)' : 'var(--color-gold)'));
        };

        if(isPlaying){
            const intervalId = setInterval(toggleColors, 750);
            return () => clearInterval(intervalId);
        }
        else{
            setTrackInfoColor('var(--color-white)');
        }
    }, [isPlaying, trackInfoColor]); 
    
    useEffect(() => {
        if (isPlaying) {
            if(currentTrack === null){
                loadSongs()
                selectRandomTrack()
            }

            let p = audioRef.current.play()

            if(p != null){
                p.then((res) => {})
                .catch((error) => {
                    console.log(error)
                    setPlaying(!isPlaying)
                })
            }
        } else {
            if(currentTrack){
                let p = audioRef.current.pause()

                if(p != null){
                    p.then((res) => {})
                    .catch((error) => {
                        console.log(error)
                        setPlaying(!isPlaying)
                    })
                }
            }else{
                loadSongs()
                selectRandomTrack()
            }
        }

        audioRef.current.volume = volume
    }, [isPlaying, audioRef, currentTrack, volume, selectRandomTrack, loadSongs]);

    const handlePlayPause = () => {
        setPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (

        <div className='musicboxCont' style={{borderColor:trackInfoColor}}>
            <h2 style={{marginBottom: '0.625rem', color:trackInfoColor}}>Music Box</h2>
            <div className='musicbox'>
                <div className='mholder'>
                    <div className='playbutton' style={{borderColor:trackInfoColor}} onClick={handlePlayPause}>
                        {isPlaying ? 
                            <FontAwesomeIcon icon={faPause} className=''/> :
                            <FontAwesomeIcon icon={faPlay} className=''/> 
                        }
                    </div>
                    <div className='trackinfo'>
                        <p className='trackInfoText' style={{ color:trackInfoColor }}>{currentTrack ? currentTrack.name : "Error Loading Tracks :("}</p>
                    </div>
                    <div className='volume'>
                        <input
                            type='range'
                            min='0'
                            max='1'
                            step='0.1'
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                    <audio src={currentTrack ? currentTrack.src : null} ref={audioRef} onEnded={selectNextTrack}/>
                </div>
                <div className='mholder' style={{justifyContent: 'space-between', color:trackInfoColor}}>
                    <div className='songSelect' onClick={selectPreviousTrack}>Previous</div>
                    <div className='songSelect' onClick={selectNextTrack}>Next</div>
                    <div className='songSelect' onClick={selectRandomTrack}>Random</div>
                </div>
            </div>
        </div>

    );
}

export default MusicBox;
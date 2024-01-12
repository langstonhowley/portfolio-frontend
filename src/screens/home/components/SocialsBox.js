import {React, useState} from 'react';
import './SocialsBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import EmailModal from './modal/EmailModal';

const SocialsBox = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleCopyClick = () => {
        const hiddenInput = document.createElement('input');
        hiddenInput.value = 'ljhowley11@gmail.com';
        document.body.appendChild(hiddenInput);

        hiddenInput.select();
        hiddenInput.setSelectionRange(0, 99999);

        document.execCommand('copy');
        document.body.removeChild(hiddenInput);
    };

    const closeModal = () => {
        setOpenModal(false)
    }

    const openTheModal = () => {
        setOpenModal(true)
    }

    const onError = () => {
        alert("Some error has prevented your email from sending.\nMy email has been copied to your clipboard.")
        handleCopyClick()
    }

    return (
        <div className='socialsCont'>
            {openModal && <EmailModal onClose={closeModal} onError={onError} />}
            <button title='Github' className='socialButton' onClick={() => {window.open('https://github.com/langstonhowley', '_blank');}}>
                <FontAwesomeIcon icon={faGithub} className='socialIcon'/>
            </button>
            <button title='LinkedIn' className='socialButton' onClick={() => {window.open('https://www.linkedin.com/in/langston-howley/', '_blank');}}>
                <FontAwesomeIcon icon={faLinkedin} className='socialIcon'/>
            </button>
            <button title='My Email' className='socialButton' onClick={openTheModal}>
                <FontAwesomeIcon icon={faEnvelope} className='socialIcon'/>
            </button>
        </div>
    )
}

export default SocialsBox;
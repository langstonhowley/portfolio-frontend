import {React, useState} from 'react'
import './EmailModal.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const EmailModal = (props) => {
    const [emailFrom, setEmailFrom] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null) 
    const [step, setStep] = useState('type')

    const emailValidationRegex = /[\w-.]+@([\w-]+\.)+[\w-]{2,4}/;

    const sendEmail = () => {
        if(emailFrom && emailValidationRegex.test(emailFrom)){
            axios.post('/email', {from:emailFrom, message:email})
            .then(res => {
                setError(null)
                setStep("end")
            })
            .catch(error => {
                console.log(error)
                setError(' ')
                props.onError()
            })
        }
        else{
            alert("Email invalid!\nPlease retype it and try again.")
            setError('email')
        }
    }

    const selectBorderColor = () => {
        if(error) return 'red'
        else if(step === 'end') return 'green'
        else return 'white'
    }

    return (
        <div className='modalHolder'>
            <div className='modal' style={{borderColor: selectBorderColor()}}>
                {
                    step === 'type' &&
                    <div style={{width: '100%',
                    height: '100%',
                    display: 'inherit',
                    flexDirection: 'inherit',
                    alignItems: 'inherit',
                    justifyContent: 'inherit'}}>
                        <FontAwesomeIcon icon={faX} className='xIcon' onClick={props.onClose}/>
                        <h2>Send a Message</h2>
                        <div className='modalInner'>
                            <div style={{width: '100%', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                                <div className='emailHolder'>
                                    <div style={{width: '20%'}}>To:</div>
                                    <div style={{width: '80%', fontSize: '0.9375rem'}}>ljhowley11@gmail.com</div>
                                </div>
                                <div className='emailHolder'>
                                    <div style={{width: '20%'}}>From:</div>
                                    <div style={{width: '80%'}}>
                                        <input style={{borderColor: (error === 'email' ? 'red' : 'var(--color-gray-background-lighter)')}} type='email' onChange={(e) => {setEmailFrom(e.target.value); setError(null);}} placeholder='Your Email'/>
                                    </div>
                                </div>
                            </div>
                            <textarea placeholder='Type your message here' onChange={(e) => setEmail(e.target.value)} />
                            <div className='sendButton'>
                                <button className='send' onClick={sendEmail}>Send</button>
                            </div>
                        </div>

                    </div>
                }
                {
                    step === 'end' &&
                    <div style={{width: '100%',
                    height: '100%',
                    display: 'inherit',
                    flexDirection: 'inherit',
                    alignItems: 'inherit'}}>
                        <FontAwesomeIcon icon={faX} className='xIcon' onClick={props.onClose}/>
                        <h1 style={{height: '100%', margin: 0, padding: 0, marginTop: '25%', color: 'green'}}>Message Sent!</h1>
                    </div>
                }
            </div>
        </div>
    )

}

export default EmailModal;
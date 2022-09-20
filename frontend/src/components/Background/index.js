// frontend/src/components/Background/index.js
import React from 'react';
import greenBlob from '../../icons/greenBlob.svg';
import redBlob from '../../icons/redBlob.svg';
import yellowBlob from '../../icons/yellowBlob.svg';
import './Background.css';

export default function Background() {
    return (
        <div className='bg'>
            <div className='bg-left'>
                <img src={redBlob} alt='red' />
            </div>
            <div className='bg-mid'>
                <img src={yellowBlob} alt='yellow' />
            </div>
            <div className='bg-right'>
                <img src={greenBlob} alt='green' />
            </div>
        </div>
    )
}

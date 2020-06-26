import React, { Component } from 'react';
import './FaceRecognition.css';

const FaceRecogniiton = ({ imageURL, box }) => {
    return (
        <div className='center ma FR'>
            <div className='absolute mt2 '>
                <img className='center' id='inputimage' alt='' src={imageURL} width='500px' height='auto' />
                <div className='bounding_box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecogniiton

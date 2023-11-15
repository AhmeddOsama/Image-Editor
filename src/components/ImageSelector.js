// ImageSelector.js
import React, { useState } from 'react';
import '../styles/selectImage.css'
import { useSelector, useDispatch } from 'react-redux';
import { setImage, getImage } from '../redux/slices/imageSlice';

const ImageSelector = () => {
    const selectedImage = useSelector(getImage);
    const dispatch = useDispatch();


    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setImage(reader.result));
            };

            reader.readAsDataURL(file);
            onImageUpload(file);
        }
    };

    return (
        <div className='image-selector-container '>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        </div>
    );
}

export default ImageSelector;

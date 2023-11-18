// ImageSelector.js
import React, { useEffect, useState } from 'react';
import '../styles/selectImage.css'
import { useSelector, useDispatch } from 'react-redux';
import { setImage, getImage, setSelectedAreas, getSelectedAreas, setSelectedAreaNumber } from '../redux/slices/imageSlice';
import { AreaSelector } from '@bmunozg/react-image-area';
import myImage from '../assets/static.png';
import EXIF from 'exif-js'
const ImageSelector = () => {
    const selectedImage = useSelector(getImage);
    const selectedAreas = useSelector(getSelectedAreas)
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedImage) {
            const image = new Image();
            image.src = selectedImage
            image.onload = function () {
                EXIF.getData(image, function () {
                    var metaData = EXIF.getAllTags(this);
                    console.log(JSON.stringify(metaData, null, "\t"));
                    // Access the description tag
                    if ((metaData.ImageDescription)) {
                        var description = JSON.parse(metaData.ImageDescription)
                        dispatch(setSelectedAreas(description['areas']));
                    }



                });
            };
        }
    }, [selectedImage])
    const handleAreaSelectionChange = (areas) => {
        dispatch(setSelectedAreas(areas))
    };
    const selectArea = (number) => {
        dispatch(setSelectedAreaNumber(number))
    }
    const customRender = (areaProps) => {
        if (!areaProps.isChanging) {
            return (
                <div onClick={() => selectArea(areaProps.areaNumber)} id={`area${areaProps.areaNumber}`}>
                    <img src={myImage} alt='Fill' style={{ maxWidth: '100%', marginTop: '10px' }} />
                </div>
            );
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch(setImage(reader.result));
            };

            reader.readAsDataURL(file);
        }
    };


    return (
        <div className='image-selector-container '>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage &&
                <AreaSelector customAreaRenderer={customRender} areas={selectedAreas} onChange={handleAreaSelectionChange}>
                    <img src={selectedImage} alt='Selected' style={{ maxWidth: '100%', marginTop: '10px' }} />
                </AreaSelector>}
        </div>
    );
}

export default ImageSelector;

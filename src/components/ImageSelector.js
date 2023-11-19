// ImageSelector.js
import React, { useEffect, useState } from 'react';
import '../styles/selectImage.css'
import { useSelector, useDispatch } from 'react-redux';
import { setImage, getImage, setSelectedAreas, getSelectedAreas, setSelectedAreaNumber } from '../redux/slices/imageSlice';
import { AreaSelector } from '@bmunozg/react-image-area';
import myImage from '../assets/Solid_black.png';
import EXIF from 'exif-js'
import piexif from 'piexifjs';

const ImageSelector = () => {
    const selectedImage = useSelector(getImage);
    const selectedAreas = useSelector(getSelectedAreas)
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedImage) {
            const image = new Image();
            image.src = selectedImage
            image.onload = function () {

                const modifiedImageData = piexif.load(selectedImage);
                const imageDescriptionField = modifiedImageData['0th'][piexif.ImageIFD.ImageDescription];
                const data = JSON.parse(imageDescriptionField)['data']
                if (data) {
                    console.log(imageDescriptionField)
                    var importedAreas = []
                    for (var areaData of data) {
                        importedAreas.push(areaData.selectedArea)
                    }
                    dispatch(setSelectedAreas(importedAreas))
                }
                //After retrieving the selectedAreas , the original pixel values should be restored to the original values 
                //leaving only the filled image until the user modifies the image and downloads it with new metadata . but the issue here was that the databuffer turns to an
                //empty object after converting it to json string .

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
                    <img src={myImage} alt='Fill' style={{
                        left: `${areaProps.x}px`,
                        top: `${areaProps.y}px`,
                        width: `${areaProps.width}px`,
                        height: `${areaProps.height}px`,
                    }} />
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
                    <img src={selectedImage} alt='Selected' id='selectedImage' style={{ maxWidth: '100%', marginTop: '10px' }} />
                </AreaSelector>}
        </div>
    );
}

export default ImageSelector;

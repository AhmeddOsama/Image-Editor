// ImageSelector.js
import React, { useEffect, useState } from 'react';
import '../styles/selectImage.css'
import { useSelector, useDispatch } from 'react-redux';
import { setImage, getImage, setSelectedAreas, getSelectedAreas } from '../redux/slices/imageSlice';
import { AreaSelector } from '@bmunozg/react-image-area';
import myImage from '../assets/static.png';
const ImageSelector = () => {
    const selectedImage = useSelector(getImage);
    const selectedAreas = useSelector(getSelectedAreas)
    const dispatch = useDispatch();
    // const [selectedAreas, setSelectedAreas] = useState([]);
    const handleAreaSelectionChange = (areas) => {
        console.log(areas)
        dispatch(setSelectedAreas(areas))
    };
    const customRender = (areaProps) => {
        console.log('hello')
        if (!areaProps.isChanging) {
            return (
                <div key={areaProps.areaNumber}>
                    <img src={myImage} alt='Selected' style={{ maxWidth: '100%', marginTop: '10px' }} />
                </div>
            );
        }
    };
    useEffect(() => {
        console.log(selectedAreas)
    }, [selectedAreas])
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

// ImageSelector.js
import React, { useState } from 'react';
import '../styles/selectImage.css'

const ImageSelector = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const onImageUpload = () => {

    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
            onImageUpload(file); // Pass the selected image to the parent component if needed
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

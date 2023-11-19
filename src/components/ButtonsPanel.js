// Home.js
import React from 'react';
// Import the external CSS file
import '../styles/button.css'; // Import the external CSS file
import { useDispatch, useSelector } from 'react-redux';
import { clearImage, getImage, getSelectedAreas, getSelectedAreaNumber } from '../redux/slices/imageSlice';
import myImage from '../assets/Solid_black.png';
import piexif from 'piexifjs';
import pako from 'pako';


const ButtonsPanel = () => {
    const dispatch = useDispatch();
    const selectedImage = useSelector(getImage);
    const selectedAreas = useSelector(getSelectedAreas)
    const selectedAreaNumber = useSelector(getSelectedAreaNumber)
    const handleHideSelectedArea = () => {
        const divByKey = document.querySelector(`#area${selectedAreaNumber}`);
        if (divByKey) {
            divByKey.setAttribute('hidden', 'true')
        }
    };

    const handleShowSelectedArea = () => {
        const divByKey = document.querySelector(`#area${selectedAreaNumber}`);
        if (divByKey) {
            divByKey.removeAttribute('hidden')
        }
    };

    const handleShowAll = () => {
        selectedAreas.forEach((element, index) => {
            const divByKey = document.querySelector(`#area${index + 1}`);
            divByKey.removeAttribute('hidden')
        });
    };

    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const image = new Image();
        const fill = new Image()
        fill.src = myImage
        image.src = selectedImage;
        var dataBuffers = [];
        const exifData = piexif.load(selectedImage);

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            const container = document.getElementById('selectedImage');

            const widthScale = container.clientWidth / image.naturalWidth;
            const heightScale = container.clientHeight / image.naturalHeight;
            context.drawImage(image, 0, 0);
            var modifiedData = []
            selectedAreas.forEach(area => {
                const imageData = context.getImageData(area.x / widthScale, area.y / heightScale, area.width / widthScale, area.height / heightScale);
                const data = imageData.data;
                const buffer = data.buffer
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                }

                modifiedData.push({ selectedArea: area, originalBuffer: data.buffer })

                context.putImageData(imageData, area.x / widthScale, area.y / heightScale);

            });
            var toJson = JSON.stringify({ data: modifiedData });
            exifData['0th'][piexif.ImageIFD.ImageDescription] = toJson

            const exifBytes = piexif.dump(exifData);

            const modifiedImage = piexif.insert(exifBytes, canvas.toDataURL('image/jpeg'));
            // const modifiedImage = canvas.toDataURL('image/jpg')

            const link = document.createElement('a');
            link.href = modifiedImage;
            link.download = 'modifiedImage.jpg';
            link.click();
        };
    };

    const handleClear = () => {
        dispatch(clearImage());
    }

    return <>
        <div>
            <button className='button blue' style={{ marginTop: 50 }} onClick={handleShowSelectedArea}>
                Show The Selected Block
            </button>
        </div>

        <div>
            <button className='button black' style={{ marginTop: 300 }} onClick={handleHideSelectedArea}>
                Hide The Selected Area
            </button>
        </div>
        <div>

            <button className='button text-black' style={{ marginTop: 0 }} onClick={handleShowAll}>
                Show All
            </button>
        </div>

        <div>
            <button className='button blue' style={{ marginTop: 0 }} onClick={handleDownload}>
                Download
            </button>
        </div>

        <div>
            <button className='button black' style={{ marginTop: 0 }} onClick={handleClear}>
                Clear
            </button>
        </div>
    </>
}
export default ButtonsPanel;

// Home.js
import React from 'react';
// Import the external CSS file
import '../styles/button.css'; // Import the external CSS file
import { useDispatch, useSelector } from 'react-redux';
import { clearImage, getImage, getSelectedAreas, getSelectedAreaNumber } from '../redux/slices/imageSlice';
import myImage from '../assets/static.png';
import piexif from 'piexifjs';

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
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            const container = document.getElementById('selectedImage');

            const widthScale = container.clientWidth / image.naturalWidth;
            const heightScale = container.clientHeight / image.naturalHeight;
            console.log(image.width, container.clientWidth)
            context.drawImage(image, 0, 0);
            selectedAreas.forEach(area => {
                context.fillStyle = 'white';
                context.fillRect(area.x / widthScale, area.y / heightScale, area.width / widthScale, area.height / heightScale);
            });

            const exifData = piexif.load(selectedImage);
            console.log(exifData)
            exifData['0th'][piexif.ImageIFD.ImageDescription] = JSON.stringify({ areas: selectedAreas });


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

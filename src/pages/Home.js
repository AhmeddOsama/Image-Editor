// Home.js
import React from 'react';
// Import the external CSS file
import '../styles/button.css'; // Import the external CSS file
import '../components/ImageSelector'
import ImageSelector from '../components/ImageSelector';
import { useDispatch, useSelector } from 'react-redux';
import { clearImage, getImage, getSelectedAreas } from '../redux/slices/imageSlice';
import myImage from '../assets/static.png';

const Home = () => {
    const dispatch = useDispatch();
    const selectedImage = useSelector(getImage);
    const selectedAreas = useSelector(getSelectedAreas)

    const handleHideSelectedArea = () => {
    };

    const handleShowSelectedArea = () => {
    };

    const handleShowAll = () => {
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
            context.drawImage(image, 0, 0);
            selectedAreas.forEach(area => {
                context.drawImage(fill, area.x, area.y, area.width, area.height);
            });
            const modifiedImage = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = modifiedImage;
            link.download = 'modifiedImage.png';
            link.click();
        };
    };

    const handleClear = () => {
        dispatch(clearImage());
    }

    return <>
        <div>
            <button className='button blue' style={{ marginTop: 50 }} onClick={handleHideSelectedArea}>
                Show The Selected Block
            </button>
        </div>

        <div>
            <button className='button black' style={{ marginTop: 300 }} onClick={handleShowSelectedArea}>
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
        <ImageSelector />
    </>
}

export default Home;

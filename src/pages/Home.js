// Home.js
import React from 'react';
// Import the external CSS file
import '../styles/button.css'; // Import the external CSS file
import '../components/ImageSelector'
import ImageSelector from '../components/ImageSelector';
import { useDispatch } from 'react-redux';
import { clearImage } from '../redux/slices/imageSlice';

const Home = () => {
    const dispatch = useDispatch();

    const handleHideSelectedArea = () => {
    };

    const handleShowSelectedArea = () => {
    };

    const handleShowAll = () => {
    };

    const handleDownload = () => {
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

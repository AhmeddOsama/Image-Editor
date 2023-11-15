// Home.js
import React from 'react';
// Import the external CSS file
import '../styles/button.css'; // Import the external CSS file
import '../components/ImageSelector'
import ImageSelector from '../components/ImageSelector';
const Home = () => {
    const handleHideSelectedArea = () => {
    };

    const handleShowSelectedArea = () => {
    };

    const handleShowAll = () => {
    };

    const handleDownload = () => {
    };

    const renderButtons = () => {

    }
    return <>
        <div>
            <button className='button blue' style={{ marginLeft: 40, marginTop: 50 }} onClick={handleHideSelectedArea}>
                Show The Selected Block
            </button>
        </div>

        <div>
            <button className='button black' style={{ marginLeft: 40, marginTop: 400 }} onClick={handleShowSelectedArea}>
                Hide The Selected Area
            </button>
        </div>
        <div>

            <button className='button text-black' style={{ marginLeft: 40, marginTop: 0 }} onClick={handleShowAll}>
                Show All
            </button>
        </div>

        <div>
            <button className='button blue' style={{ marginLeft: 40, marginTop: 0 }} onClick={handleDownload}>
                Download
            </button>
        </div>
        <ImageSelector />
    </>
}

export default Home;

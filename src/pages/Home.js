// Home.js
import React from 'react';
// Import the external CSS file
import '../styles/button.css'; // Import the external CSS file
import '../components/ImageSelector'
import ImageSelector from '../components/ImageSelector';
import ButtonsPanel from '../components/ButtonsPanel';

const Home = () => {
    return <>
        <ButtonsPanel />
        <ImageSelector />
    </>
}

export default Home;

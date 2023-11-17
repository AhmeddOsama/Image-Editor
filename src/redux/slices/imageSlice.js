// src/redux/slices/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedImage: null,
    selectedAreas: []
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        setSelectedAreas: (state, action) => {
            state.selectedAreas = action.payload;
        },
        clearImage: (state) => {
            state.selectedImage = null;
            state.selectedAreas = []
        },
        // Add more actions as needed
    },
});

export const { setImage, clearImage, setSelectedAreas } = imageSlice.actions;

export const getImage = (state) => state.image.selectedImage;
export const getSelectedAreas = (state) => state.image.selectedAreas

export default imageSlice.reducer;

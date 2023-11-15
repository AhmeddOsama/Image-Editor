// src/redux/slices/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedImage: null,
};

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        clearImage: (state) => {
            state.selectedImage = null;
        },
        // Add more actions as needed
    },
});

export const { setImage, clearImage } = imageSlice.actions;

export const getImage = (state) => state.image.selectedImage;

export default imageSlice.reducer;

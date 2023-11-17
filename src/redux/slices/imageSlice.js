// src/redux/slices/imageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedImage: null,
    selectedAreas: [],
    selectedAreaNumber: null
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
            state.selectedAreaNumber = null
        },
        setSelectedAreaNumber: (state, action) => {
            state.selectedAreaNumber = action.payload
        }
        // Add more actions as needed
    },
});

export const { setImage, clearImage, setSelectedAreas, setSelectedAreaNumber } = imageSlice.actions;

export const getImage = (state) => state.image.selectedImage;
export const getSelectedAreas = (state) => state.image.selectedAreas
export const getSelectedAreaNumber = (state) => state.image.selectedAreaNumber
export default imageSlice.reducer;

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';

const store = configureStore({
    reducer: {
        image: imageReducer,
    },
});

export default store;
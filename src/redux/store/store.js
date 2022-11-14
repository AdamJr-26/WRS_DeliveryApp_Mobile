import {configureStore} from '@reduxjs/toolkit';
import  profileSlice  from './userProfileSlicer';
export default configureStore({
    reducer: {
        profileSlice
    }
})
// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import alertReducer from './features/alertSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    alerts: alertReducer,
  }, 
});

export default store;

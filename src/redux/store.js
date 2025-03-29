import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice.js';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

if (import.meta.env.VITE_APP_ENV === 'development') {
  store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
  );
}

export default store;

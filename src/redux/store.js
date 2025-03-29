import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice.js';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

store.subscribe(() =>
  console.log('State after dispatch: ', store.getState())
);

export default store;

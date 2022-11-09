import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer, filtersReducer } from './phonebookSlice';

export const phonebookStore = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});

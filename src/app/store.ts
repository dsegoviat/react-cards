import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import boardReducer from '../slices/boardSlice';

export const LOCAL_STORAGE_CARDS: string = 'stored-cards';

export const store = configureStore({
    reducer: boardReducer
});

store.subscribe(() => {
    // Save store in localStorage
    localStorage.setItem('stored-cards', JSON.stringify(store.getState().cards));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

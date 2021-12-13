import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import ICard from '../model/ICard';
import ISorting from '../model/ISorting';
import IForm from '../model/IForm';
import Utils from '../utils/Utils';

export interface AppState {
    cards: ICard[],
    form: IForm
}

let initialState: AppState = {
    cards: [],
    form: {
        createOpen: false,
        editOpen: false,
        id: 0,
        title: '',
        description: '',
        url: ''
    }
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        init: (state) => {
            state.cards = localStorage.getItem('stored-cards') ?
                JSON.parse(localStorage.getItem('stored-cards')!) as ICard[] :
                [];
        },
        add: (state, action: PayloadAction<{ id: number, title: string, description: string, url: string }>) => {
            state.cards.push({
                id: state.cards.length,
                title: action.payload.title,
                description: action.payload.description,
                url: Utils.isEmpty(action.payload.url) ?
                    'https://picsum.photos/id/1016/500/300?grayscale' :
                    action.payload.url,
                createdAt: new Date().toISOString()
            });
        },
        edit: (state, action: PayloadAction<{ id: number, title: string, description: string, url: string }>) => {
            const index = state.cards.findIndex(card => card.id === action.payload.id);
            if (index > -1) {
                state.cards[index] = {
                    ...state.cards[index],
                    title: action.payload.title,
                    description: action.payload.description,
                    url: action.payload.url
                };
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            state.cards = state.cards.filter(card => card.id !== action.payload);
        },
        sort: (state, action: PayloadAction<ISorting>) => {
            state.cards = state.cards.sort(Utils.sortCriteria(action.payload));
        },
        removeAll: (state) => {
            state.cards = [];
        }
    }
});

export const createCard = (id: number, title: string, description: string, url?: string): ICard => {
    return {
        id: id,
        title: title,
        description: description,
        createdAt: new Date().toISOString(),
        url: url ? url : 'https://picsum.photos/id/1016/500/300?grayscale'
    };
};

export const selectCards = (state: RootState): ICard[] => state.cards;
export const selectForm = (state: RootState): IForm => state.form;

export const {
    init,
    add,
    edit,
    remove,
    sort,
    removeAll
} = boardSlice.actions;

export default boardSlice.reducer;

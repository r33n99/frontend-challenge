import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export interface Cat {
    breeds?: any[];
    height: number;
    categories?: [];
    id: string;
    url: string;
    width: number;
}
export interface CounterState {
    cats: Cat[] | undefined;
    favoritesCats: Cat[];
    isLoading: boolean;
}

const initialState: CounterState = {
    cats: [],
    favoritesCats: localStorage.getItem('favoritesCats')
        ? JSON.parse(localStorage.getItem('favoritesCats') || '[]')
        : [],
    isLoading: false,
};
export const getCatsData = createAsyncThunk('cats/getCats', async (size: number) => {
    try {
        const response = await axios.get<Cat[]>(
            `https://api.thecatapi.com/v1/images/search?size=med&limit=15&page=${size}`,
        );
        return response.data;
    } catch (error) {
        alert(error);
    }
});

export const counterSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        addFavoriteCat(state: CounterState, action: any) {
            const id = action.payload;
            const cat: any = state.cats?.find((cat) => cat.id === id);
            if (state.favoritesCats.find((cat) => cat.id === id)) {
                return;
            }
            state.favoritesCats.push(cat);
            localStorage.setItem('favoritesCats', JSON.stringify(state.favoritesCats));
        }, // добавить в избранное
        deleteFavoriteCat(state: CounterState, action: any) {
            const id = action.payload;
            const cat: any = state.favoritesCats.find((cat) => cat.id === id);
            state.favoritesCats.splice(state.favoritesCats.indexOf(cat), 1);
            localStorage.setItem('favoritesCats', JSON.stringify(state.favoritesCats));
        }, // удалить из избранных
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCatsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCatsData.fulfilled, (state: CounterState, action) => {
                state.isLoading = false;
                const newCats: any = action.payload;
                state.cats = state.cats?.concat(newCats);
            })
            .addCase(getCatsData.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { addFavoriteCat, deleteFavoriteCat } = counterSlice.actions;

export const selectState = (state: RootState) => state.cats;

export default counterSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface Cat {
  breeds?: any[],
  height?: number,
  categories? : [],
  id: string,
  url: string,
  width?: number,
} 
export interface CounterState {
  cats: Cat[];
  favoritesCats: Cat[];
  status: "idle" | "loading" | "failed";
  isLoading: boolean;
}

const initialState: CounterState = {
  cats:[],
  favoritesCats: localStorage.getItem('favoritesCats') ? JSON.parse(localStorage.getItem('favoritesCats') || '[]') : [],
  status: "idle",
  isLoading: false,
};
export const getCatsData = createAsyncThunk("cats/getCats", async () => {
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search?size=med&limit=20"
    );
    return response.data;
  } catch (error) {
    alert(error);
  }
});

export const counterSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    addFavoriteCat(state,action) {
      const id = action.payload;
      const cat:any = state.cats.find(cat => cat.id === id);
      if(state.favoritesCats.find(cat => cat.id === id)) {
        return;
      }
      state.favoritesCats.push(cat);
      localStorage.setItem('favoritesCats', JSON.stringify(state.favoritesCats));
      
  },
  deleteFavoriteCat(state,action){
    const id = action.payload;
    const cat:any = state.favoritesCats.find(cat => cat.id === id);
    state.favoritesCats.splice(state.favoritesCats.indexOf(cat),1);
    localStorage.setItem('favoritesCats',JSON.stringify(state.favoritesCats));
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(getCatsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCatsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats = action.payload;
      })
      .addCase(getCatsData.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      });
  },
});

export const { addFavoriteCat,deleteFavoriteCat } = counterSlice.actions;

export const selectState = (state: RootState) => state.cats;

export default counterSlice.reducer;

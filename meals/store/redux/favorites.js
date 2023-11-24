import { createSlice } from "@reduxjs/toolkit";
import { MEALS } from "../../data/dummy-data";

const favoritesSlice = createSlice({
  name: "favorites",

  initialState: {
    ids: [],
  },

  reducers: {
    addFavorite: (state, { payload }) => {
      state.ids.push(payload.id);
    },
    removeFavorite: (state, { payload }) => {
      state.ids.splice(state.ids.indexOf(payload.id), 1);
    },
  },
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;

export default favoritesSlice.reducer;

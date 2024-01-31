import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: [],
};

const podcastSlice = createSlice({
  name: "podcasts", // variable for podcastSlice and is required to call the slice with it
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
  },
});

export const { setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;

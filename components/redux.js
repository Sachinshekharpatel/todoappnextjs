// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};

const todoSlice = createSlice({
  name: "NametodoSlice",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // console.log(action.payload)
      state.data.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },

    tododataFetched: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.data = action.payload;
      }
    },
  },
});

export const todoSliceAction = todoSlice.actions;

const store = configureStore({
  reducer: {
    NametodoSlice: todoSlice.reducer,
  },
});

export default store;

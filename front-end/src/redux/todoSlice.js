import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputValue: "",
  todo: {},
  // todo: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    change: (state, action) => {
      state.inputValue = action.payload;
    },
    addTodo: (state) => {
      state.todo = state.inputValue;
      // state.todo.push(state.inputValue);
      state.inputValue = "";
    },
  },
});

export const { change, addTodo } = todoSlice.actions;

export default todoSlice.reducer;

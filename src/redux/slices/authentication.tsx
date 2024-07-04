import { createSlice } from "@reduxjs/toolkit";

// Register Slice
export const registerSlice = createSlice({
  name: "register",
  initialState: {
    data: null,
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRegisterData } = registerSlice.actions;

// Login Slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLoginData } = loginSlice.actions;

// User Data Slice
export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    data: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;

export const loginDataReducer =  loginSlice.reducer;
export const registerDataReducer =  registerSlice.reducer;
export const userDataReducer =  userDataSlice.reducer;



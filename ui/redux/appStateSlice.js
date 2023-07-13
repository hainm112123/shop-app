import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  loginModalVisible: false,
}

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    toggleModal(state, action) {
      state.loginModalVisible = action.payload
    }
  }
})

export const { toggleModal } = appStateSlice.actions;

export default appStateSlice.reducer;
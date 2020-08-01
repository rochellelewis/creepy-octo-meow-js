import { createSlice } from "@reduxjs/toolkit";
import { httpConfig } from '../utils/http-config'

/*
* A separate "profile" slice is being created here to fix the issue of stale profile data returning from redux store on the Profile page.
* */
const slice = createSlice({
  name: "profile",
  initialState: [],
  reducers: {
    getProfileByProfileId: (profile, action) => {
      profile.push(action.payload)
    }
  }
})

export const {getProfileByProfileId} = slice.actions

export const fetchProfileByProfileIdProfilePage = (id) => async dispatch => {
  const {data} = await httpConfig(`/apis/profile/${id}`);
  dispatch(getProfileByProfileId(data))
}

export default slice.reducer
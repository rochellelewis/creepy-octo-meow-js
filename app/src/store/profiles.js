import { createSlice } from "@reduxjs/toolkit";
import { httpConfig } from '../utils/http-config'

const slice = createSlice({
  name: "profiles",
  initialState: [],
  reducers: {
    getAllProfiles: (profiles, action) => {
      return action.payload
    },
    getProfileByProfileId: (profiles, action) => {
      profiles.push(action.payload)
    }
  }
})

export const {getAllProfiles, getProfileByProfileId} = slice.actions

export const fetchAllProfiles = () => async dispatch => {
  const {data} = await httpConfig(`/apis/profile/`);
  dispatch(getAllProfiles(data))
}

export const fetchProfileByProfileId = (id) => async dispatch => {
  const {data} = await httpConfig(`/apis/profile/${id}`);
  dispatch(getProfileByProfileId(data))
}

export default slice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from '../utils/http-config'

const slice = createSlice({
  name: "likes",
  initialState: [],
  reducers: {
    getAllLikes: (likes, action) => {
      return action.payload
    }
  }
})

export const {getAllLikes} = slice.actions

export const fetchAllLikes = () => async dispatch => {
  const {data} = await httpConfig(`/apis/like/`);
  dispatch(getAllLikes(data))
}

export default slice.reducer
import _ from "lodash";
import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from '../utils/http-config'
import { fetchProfileByProfileId } from './profiles'

const slice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    getAllPosts: (posts, action) => {
      return action.payload
    }
  }
})

export const {getAllPosts} = slice.actions

export const fetchAllPosts = () => async dispatch => {
  const {data} = await httpConfig(`/apis/post/`);
  dispatch(getAllPosts(data))
}

export const fetchAllPostsAndProfiles = () => async (dispatch, getState) => {
  await dispatch(fetchAllPosts())
  const profileIds = _.uniq(_.map(getState().posts, "postProfileId"));
  profileIds.forEach(id => dispatch(fetchProfileByProfileId(id)));
}

export default slice.reducer
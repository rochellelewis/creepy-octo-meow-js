import { createAction, createSlice } from '@reduxjs/toolkit'
import {httpConfig} from "../utils/http-config"

const slice = createSlice({
  name: "post",
  initialState: [],
  reducers:  {
    getAllPosts : (posts, action) => {
      return action.payload
    },
    getPostByPostId : (posts, action) => {
      posts.push(action.payload)
    }
  }
})

export const {getPostByPostId, getAllPosts} = slice.actions

export const fetchAllPosts = () => async (dispatch) => {
  const {data} = await httpConfig(`/apis/post`)
  dispatch(getAllPosts(data))
}

export default slice.reducer
import _ from "lodash";
import { createSlice } from '@reduxjs/toolkit'
import { httpConfig } from '../utils/http-config'
import { fetchProfileByProfileId } from './profiles'

const slice = createSlice({
  name: "activation",
  initialState: [],
  reducers: {
    activation: state => state
  }
})

export const {getAllPosts} = slice.actions

export const fetchActivation = (token) => async dispatch => {
  const {data} = await httpConfig(`/apis/signup/activation/${token}`);
  return data
}

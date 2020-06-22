import {combineReducers} from 'redux'
import posts from "./posts"
import profiles from "./profiles"

export default combineReducers({
  posts,
  profiles
})
import {combineReducers} from 'redux'
import posts from "./posts"
import profiles from "./profiles"
import likes from "./likes"

export default combineReducers({
  posts,
  profiles,
  likes
})
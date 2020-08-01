import {combineReducers} from 'redux'
import posts from "./posts"
import profile from "./profile" // two reducers to handle profile data
import profiles from "./profiles"
import likes from "./likes"

export default combineReducers({
  posts,
  profile,
  profiles,
  likes
})
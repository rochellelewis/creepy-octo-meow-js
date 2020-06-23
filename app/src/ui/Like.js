import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import {httpConfig} from "../utils/http-config";
import {UseJwt} from "../utils/jwt-helpers";
// import {handleSessionTimeout} from "../shared/misc/handle-session-timeout";

// import {isEmpty} from "../shared/misc/js-object-helpers";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Like = ({profileId, postId}) => {

  // grab the jwt for logged in users
  const jwt = UseJwt();

  /*
  * State Variables
  *
  * isLiked will hold a text value that will set the button color
  * to red whether or not the logged in user has liked the post.
  *
  * likeCount holds the number of likes for each post by postId.
  * */
  const [isLiked, setIsLiked] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  // Grab all likes from the redux store
  const likes = useSelector(state => (state.likes ? state.likes : []));

  const effects = () => {
    initializeLikes(profileId);
    countLikes(postId);
  };

  // add likes to inputs - this informs React that likes are being updated from Redux. This ensures proper component rendering.
  const inputs = [likes, profileId, postId];
  useEffect(effects, inputs);

  /*
  * initializeLikes function filters over all the likes
  * from the Redux store, and sets the isLiked state variable
  * to "active" if the logged in user has already liked the post.
  *
  * "active" is a Bootstrap class that makes the buttons red.
  *
  * We're using a custom function isEmpty() to check for an empty object.
  * See: js-object-helpers.js
  * */
  const initializeLikes = (profileId) => {
    const profileLikes = likes.filter(like => like.likeProfileId === profileId);
    const liked = profileLikes.find(function(o) {return o.likePostId === postId});

    // if liked object is not empty make the like button red
    // return (isEmpty(liked) === false && setIsLiked("active"));
    return (_.isEmpty(liked) === false) && setIsLiked("active");
  };

  /*
  * countLikes function filters over the likes from the Redux store,
  * creating a subset of likes for this postId.
  *
  * The likeCount state variable is set to the length of this set.
  * */
  const countLikes = (postId) => {
    const postLikes = likes.filter(like => like.likePostId === postId);
    return (setLikeCount(postLikes.length));
  };

  /*
  * data object gets passed in Axios POST and DELETE requests.
  * See submitLike and deleteLike below.
  * */
  const data = {
    likePostId: postId,
    likeProfileId: profileId
  };

  /*
  * toggleLike gets called when a Like is successfully created or deleted by the user.
  * This toggles the state of the isLiked variable.
  *
  * See submitLike and deleteLike.
  * */
  const toggleLike = () => {
    setIsLiked(isLiked === null ? "active" : null);
  };

  /*
  * User posts a Like.
  * */
  const submitLike = () => {
    const headers = {'X-JWT-TOKEN': jwt};
    httpConfig.post("/apis/like/", data, {
      headers: headers})
      .then(reply => {
        let {message, type} = reply;
        if(reply.status === 200) {
          toggleLike();
          setLikeCount(likeCount + 1);
        }
        // if there's an issue with a $_SESSION mismatch with xsrf or jwt, alert user and do a sign out
        if(reply.status === 401) {
          // handleSessionTimeout();
        }
      });
  };

  /*
  * User deletes a Like.
  * */
  const deleteLike = () => {
    const headers = {'X-JWT-TOKEN': jwt};
    httpConfig.delete("/apis/like/", {
      headers, data})
      .then(reply => {
        let {message, type} = reply;
        if(reply.status === 200) {
          toggleLike();
          setLikeCount(likeCount > 0 ? likeCount - 1 : 0);
        }
        // if there's an issue with a $_SESSION mismatch with xsrf or jwt, alert user and do a sign out
        if(reply.status === 401) {
          // handleSessionTimeout();
        }
      });
  };

  /*
  * Fire this function onclick!
  * */
  const clickLike = () => {
    (isLiked === "active") ? deleteLike() : submitLike();
  };

  return (
    <>
      <Button variant="outline-danger" size="sm" className={`post-like-btn ${(isLiked !== null ? isLiked : "")}`} disabled={!jwt && true} onClick={clickLike}>
        <FontAwesomeIcon icon="heart"/>&nbsp;
        <Badge variant="danger">{likeCount}</Badge>
      </Button>
    </>
  )
};
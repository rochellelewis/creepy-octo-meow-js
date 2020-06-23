import React, {useState, useEffect} from "react";
import * as jwtDecode from "jwt-decode";

/**
 * Set of custom react hooks to decode profile data from the JSON Web Token
 *
 * @author Rochelle Lewis rlewis37@cnm.edu
 **/

/**
 * Helper function that grabs the JSON Web Token
 * out of browser localStorage
 **/
export const UseJwt = () => {
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    setJwt(window.localStorage.getItem("jwt"));
  }, [jwt]);

  return jwt;
};

/**
 * Helper function that decodes the profile username from the JSON Web Token
 **/
export const UseJwtUsername = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if(token !== null) {
      const decodedJwt = jwtDecode(token);
      setUsername(decodedJwt.profileUsername);
    }
  }, [username]);

  return username;
};

/**
 * Helper function that decodes the profile id from the JSON Web Token
 **/
export const UseJwtProfileId = () => {
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if(token !== null) {
      const decodedJwt = jwtDecode(token);
      setProfileId(decodedJwt.profileId);
    }
  }, [profileId]);

  return profileId;
};
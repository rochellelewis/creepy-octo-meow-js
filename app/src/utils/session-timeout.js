import {httpConfig} from "./http-config";

/**
 * Helper function to alert user and do an automatic signout.
 *
 * This function is designed to be used if status 400 is
 * returned by the isLoggedIn controller on a route,
 * particularly when handling post, put and delete requests.
 *
 * @see isLoggedIn.controller.ts
 * @author Rochelle Lewis rlewis37@cnm.edu
 **/
export const handleSessionTimeout = () => {
  alert("Session inactive. Please log in again.");
  httpConfig.get("/apis/signout/")
    .then(reply => {
      let {message, type} = reply;
      if(reply.status === 200) {
        window.localStorage.removeItem("jwt");
        setTimeout(() => {
          window.location = "/";
        }, 1000);
      }
    });
};
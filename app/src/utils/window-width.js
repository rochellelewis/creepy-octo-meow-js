import {useState, useEffect} from "react";

/**
 * Helper function to grab screen width on window resize event.
 * This can assist in responsive, conditional rendering
 * of components based on screen width.
 *
 * @See app/src/ui/posts/Posts.js
 * @author https://gist.github.com/gaearon/cb5add26336003ed8c0004c4ba820eae
 **/
export const UseWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
};
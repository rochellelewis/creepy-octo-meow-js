/**
 * Helper function to decode special characters
 * sanitized/encoded using express-validator
 *
 * @author Rochelle Lewis rlewis37@cnm.edu
**/
export const DecodeCharacters = (text) => {

  // TODO: make this a proper React Hook using useState, useEffect?

  let decodedText = text;

  const entityCodes = {
    "\'": "&quot;",
    "\"": "&#x27;",
    "/": "&#x2F",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  }

  for(const [key, value] of Object.entries(entityCodes)) {
    let re = new RegExp(value, "gi")
    decodedText = decodedText.replace(re, key)
  }

  return decodedText
};
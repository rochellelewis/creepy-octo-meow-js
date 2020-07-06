/**
 * Helper function to decode special characters
 * sanitized/encoded by express-validator
 *
 * @param {string} text - sanitized/encoded text content from mysql.
 * @return {string} decodedText - text content with special characters decoded for output to the application front end.
 * @author Rochelle Lewis rlewis37@cnm.edu
**/
export const DecodeCharacters = (text) => {

  let decodedText = text;

  const entityCodes = {
    "\'": "&quot;",
    "\"": "&#x27;",
    "/": "&#x2F;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "`": "&#96;",
    "\\": "&#x5C;"
  }

  for(const [key, value] of Object.entries(entityCodes)) {
    let entityCode = new RegExp(value, "gi")
    decodedText = decodedText.replace(entityCode, key)
  }

  return decodedText
};
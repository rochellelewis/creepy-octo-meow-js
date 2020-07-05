/**
 * Helper function to decode special characters
 * sanitized/encoded using express-validator
 *
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
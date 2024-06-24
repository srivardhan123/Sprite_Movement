import { ADD_CHARACTER, SET_ANGLE } from "./actionTypes";

export const setCharacterAngle = (characterAngle) => {
  return {
    type: SET_ANGLE,
    angle: characterAngle,
  };
};

export const addCharacter = () => {
  return {
    type: ADD_CHARACTER,
  };
};

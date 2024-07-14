import { combineReducers } from "redux";
import { characterReducer } from "./character/characterReducer";
import {actionreducer} from "./addAction/actionReducerH";

export const rootReducer = combineReducers({
  character: characterReducer,
  addAction: actionreducer,
});

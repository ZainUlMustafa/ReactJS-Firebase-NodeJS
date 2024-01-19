import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import themeReducer from "./themeReducer";
import appControlReducer from "./appControlReducer";
import apiReducer from "./apiReducer";

const persistConfig = {
  key: "boilerroot",
  storage,
  //DOCS: Conflicting datastore so uncomment when release build.
  whitelist: [],
};

const mainReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  themeRed: themeReducer,
  appControl: appControlReducer,
  apiControl: apiReducer,
});

export default persistReducer(persistConfig, mainReducer);

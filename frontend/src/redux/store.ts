import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import { rootReducers } from "./reducers/index";

export const store = createStore(rootReducers, applyMiddleware(thunk));

export type IStoreState = ReturnType<typeof store.getState>;

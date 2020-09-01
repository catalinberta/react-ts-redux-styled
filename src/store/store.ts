import { Store, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './user/reducer';

const rootReducer = combineReducers({
	user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore(): Store {
	const middlewares = [thunkMiddleware];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const store = createStore(
		rootReducer,
		composeWithDevTools(middlewareEnhancer)
	);

	return store;
}

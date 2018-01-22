import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from './reducers';

import { middleware } from './middleware';

import * as actions from './actions';

const DEVTOOLS = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
	composeEnhancers = global[DEVTOOLS] || compose,
	loggerIncludes = new Set([
		actions.REPLAY
		// actions.ExplorerSyncObjects,
	]),
	logger = createLogger({
		predicate: (getState, action) => {
			return loggerIncludes.has(action.type);
		},
	});

export default function configureStore(initialState) {
	const enhancers = composeEnhancers(
		applyMiddleware(logger, middleware)
	);

	const store = initialState
		? createStore(reducers, initialState, enhancers)
		: createStore(reducers, enhancers);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

export const store = configureStore();
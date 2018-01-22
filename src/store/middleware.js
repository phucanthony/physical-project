import * as actions from './actions';

export const middleware = store => next => (action) => {
	switch (action.type) {
	default:
		next(action);
		break;
	}
};
import * as Actions from '../actions';

export function increaseCounter (volume = 1) {
	return { type: Actions.IncreaseCounter, volume };
}

export function tick(timeDiff) {
	return { type: Actions.TICK, timeDiff };
}

export function start() {
	return { type: Actions.START };
}

export function toggleIdle(flag) {
	return { type: Actions.IDLE, flag };
}

export function replay() {
	return { type: Actions.REPLAY };
}

export function updateScreenSize(screenSize) {
	return { type: Actions.UpdateScreenSize, screenSize };
}

export function configureObject(key, value) {
	return { type: Actions.CONFIGURE, key, value };
}
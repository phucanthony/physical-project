import { appReducer } from 'react-universal-ui';
import * as Actions from '../actions';

function degToRad(deg) {
	return (deg * Math.PI) / 180;
}

function getVx(velocity, deg) {
	const rad = degToRad(deg);
	return velocity * Math.cos(rad);
}

function getVy(velocity, deg) {
	const rad = degToRad(deg);
	return -(velocity * Math.sin(rad));
}

const initialObjectConfigs = {
	initialVelocity: 0,
	initialDeg: 45,
	color: '#ee0000'
};

const objectInitialState = {
	object: {
		x: 0,
		y: 200,
		vX: getVx(initialObjectConfigs.initialVelocity, initialObjectConfigs.initialDeg),
		vY: getVy(initialObjectConfigs.initialVelocity, initialObjectConfigs.initialDeg),
	},

};

const initialState = {
	object: { ...objectInitialState.object },
	windowWidth: window.innerWidth,
	windowHeight: window.innerHeight,
	start: false,
	idle: true,
	configs: {
		color: '#ee0000',
		velocity: 0,
		degree: 45,
		gravity: 0.004
	}
};

export default appReducer((state = initialState, action) => {
	switch (action.type) {
	case Actions.IncreaseCounter:
		return { ...state, counter: state.counter + action.volume };
	case Actions.UpdateScreenSize:
		return { ...state, windowWidth: action.screenSize.innerWidth, height: action.screenSize.innerHeight };
	case Actions.TICK:
		return { ...state, object: updateObject(state, action) };
	case Actions.START:
		return { ...state, start: true };
	case Actions.IDLE:
		return { ...state, idle: action.flag };
	case Actions.REPLAY:
		console.log(getInitialObject(state), ">>>>>>>>");
		return { ...state, object: getInitialObject(state), idle: false };
	case Actions.CONFIGURE:
		return handleConfigObject(state, action);
	default:
		return state;
	}
});

function getInitialObject(state) {
	return {
		...objectInitialState.object,
		vX: getVx(state.configs.velocity, state.configs.degree),
		vY: getVy(state.configs.velocity, state.configs.degree)
	};
}

function updateObject(state, action) {
	const initialObject = { ...state.object },
		{ x, y, vX, vY } = initialObject,
		dt = action.timeDiff,
		gravity = state.configs.gravity;
	if (y >= (window.innerHeight - 50)) {
		return { ...initialObject };
	}
	const velocityY = updateVelocity(vY, dt, gravity);
	const distanceY = (vY * dt) + (0.5 * gravity * dt * dt);
	return { ...initialObject, x: x + (vX * dt), y: y + distanceY, vY: velocityY };
}

function updateVelocity(velocity, dt, gravity) {
	return velocity + (dt * gravity);
}

function handleConfigObject(state, action) {
	const configs = { ...state.configs, [action.key]: action.value };
	switch (action.key) {
	case 'velocity':
		return configVelocity(state, action, configs);
	case 'degree':
		return configDegree(state, action, configs);
	default:
		return { ...state, configs };
	}
}

function configVelocity(state, action, configs) {
	const vX = getVx(action.value, state.configs.degree),
		vY = getVy(action.value, state.configs.degree);
	return { ...state, object: { ...state.object, vX, vY }, configs };
}

function configDegree(state, action, configs) {
	const vX = getVx(state.configs.velocity, action.value),
		vY = getVy(state.configs.velocity, action.value);
	return { ...state, object: { ...state.object, vX, vY }, configs };
}
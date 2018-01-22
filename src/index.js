import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect, ContextProvider } from 'react-universal-ui';

import { store } from './store';
import * as appActions from './store/action/app';

import ObjectPhysics from './component/Object';
import GameButton from './component/Button';
import Input from './component/Input';
import ConfigsModal from "./component/ConfigsModal";

let time = Date.now(),
	myReqAnimationId;

type Props = {
	counter?: string,
	dispatch?: Function,
	object ?: Object,
	start ?: boolean,
	idle ?: boolean
};

@connect(({ app }) => ({
	object: app.object,
	start: app.start,
	idle: app.idle
}))

class App extends Component {
	props: Props;

	componentWillMount() {
	  window.onresize = this.updateScreenSize;
	}

	componentWillUnmount() {
	  cancelAnimationFrame(myReqAnimationId);
	}

	start = () => {
		time = Date.now();
		this.props.dispatch(appActions.start());
		this.props.dispatch(appActions.toggleIdle(false));
		this.animate();
	};

	replay = () => {
		time = Date.now();
		this.props.dispatch(appActions.replay());
		this.animate();
	};

	updateScreenSize = (event) => {
		this.props.dispatch(appActions.updateScreenSize(event.target));
	};

	animate = () => {
		const timeDiff = Date.now() - time;
		time = Date.now();
		if ((this.props.object.y >= (window.innerHeight - 50)) && !this.props.idle) {
			this.props.dispatch(appActions.toggleIdle(true));
			cancelAnimationFrame(myReqAnimationId);
			return;
		}
		this.props.dispatch(appActions.toggleIdle(false));
		this.props.dispatch(appActions.tick(timeDiff));
		myReqAnimationId = requestAnimationFrame(this.animate);
	};

	render() {
		return <View style={styles.container} >
			<ObjectPhysics/>
			{this.props.idle && <GameButton
				title={this.props.start ? 'REPLAY' : 'START'}
				onPress={this.props.start ? this.replay : this.start}
			/>}
			<ConfigsModal/>
		</View>;
	}

	increaseCounter = () => {
		this.props.dispatch(appActions.increaseCounter());
	};
}

type ContainerProps = {

};

export default function AppContainer(props: ContainerProps) {
	return <ContextProvider store={store}>
		<App/>
	</ContextProvider>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
});
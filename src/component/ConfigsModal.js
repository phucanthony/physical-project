import React, { Component } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

import Input from './Input';

export default class ConfigsModal extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    currentDx: 0,
		currentDy: 0,
		dx: 0,
		dy: 0
	  };
	}

	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderRelease: this.onPanResponderRelease,
			onPanResponderMove: this.onPanResponderMove,
		});
	}

	onPanResponderMove = (e, gestureState) => {
		this.setState({
			dx: this.state.currentDx + gestureState.dx,
			dy: this.state.currentDy + gestureState.dy,
		});
	};

	onPanResponderRelease = (e, gestureState) => {
		const leftLimit = -this.leftPosition,
			rightLimit = window.innerWidth
				- this.leftPosition
				- this.state.modalLayout.width,
			bottomLimit = window.innerHeight
				- this.topPosition
				- this.state.modalLayout.height,
			topLimit = -this.topPosition;

		if (this.state.dy <= topLimit) {
			this.setState({
				currentDx: this.state.currentDx + gestureState.dx,
				currentDy: topLimit,
				dy: topLimit
			});
		} else if (this.state.dy >= bottomLimit) {
			this.setState({
				currentDx: this.state.currentDx + gestureState.dx,
				currentDy: bottomLimit,
				dy: bottomLimit
			});
		} else if (this.state.dx <= leftLimit) {
			this.setState({
				currentDx: leftLimit,
				currentDy: this.state.currentDy + gestureState.dy,
				dx: leftLimit
			});
		} else if (this.state.dx >= rightLimit) {
			this.setState({
				currentDx: rightLimit,
				currentDy: this.state.currentDy + gestureState.dy,
				dx: rightLimit
			});
		} else {
			this.setState({
				currentDx: this.state.currentDx + gestureState.dx,
				currentDy: this.state.currentDy + gestureState.dy,
			});
		}
	};

	leftPosition = window.innerWidth - 400 - 10;
	topPosition = 10;

	render() {
		const customStyles = {
			position: 'absolute',
			top: this.topPosition,
			left: this.leftPosition,
			transform: [
				{ translateX: this.state.dx },
				{ translateY: this.state.dy },
			],
		};
		return <View
			style={customStyles}
			onLayout={e => this.setState({ modalLayout: e.nativeEvent.layout })}>
			<Input panHandler={{ ...this.panResponder.panHandlers }}/>
		</View>;
	}
}

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		fontSize: 16,
		marginTop: 10,
		marginBottom: 5,
		fontWeight: 'bold',
		userSelect: 'none',
	},
});
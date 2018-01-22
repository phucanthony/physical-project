import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import { Slider, connect } from 'react-universal-ui';
import { ChromePicker } from 'react-color';

import * as appActions from '../store/action/app';

type Props = {
	configs ?: Object,
	dispatch ?: Function,
	customStyles ?: Object,
	panHandler ?: any
}

@connect(({ app }) => ({
	configs: app.configs
}))

export default class Input extends Component {
	props: Props;

	innerHeight = 0;
	state = {
		isExpand: false
	};

	renderGravitySlider = () => {
		return <Slider
			style={[styles.slider]}
			minimumValue={0.001}
			maximumValue={0.009}
			step={0.0005}
			value={this.props.configs.gravity}
			onValueChange={value => this.updateValue('gravity', value)}
		/>;
	};

	renderDegreeSlider = () => {
		return <Slider
			style={[styles.slider]}
			minimumValue={0}
			maximumValue={90}
			step={1}
			value={this.props.configs.degree}
			onValueChange={value => this.updateValue('degree', value)}
		/>;
	};

	renderVelocitySlider = () => {
		return <Slider
			style={styles.slider}
			minimumValue={0}
			step={0.1}
			maximumValue={3}
			value={this.props.configs.value}
			onValueChange={value => this.updateValue('velocity', value)}
		/>;
	};

	renderSlider = (title, renderSliderFunction, value) => {
		return <View style={[styles.sliderContainer]}>
			<View style={styles.sliderTitleContainer}>
				<Text style={styles.sliderTitle}>{title}</Text>
			</View>
			{renderSliderFunction()}
			<View style={styles.sliderValueContainer}>
				<Text style={styles.sliderValue}>{value}</Text>
			</View>
		</View>;
	};

	renderColorPicker = () => {
		const { color } = this.props.configs;
		return <View style={{ marginTop: 5 }}>
			<View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<View style={styles.sliderTitleContainer}>
					<Text style={styles.sliderTitle}>Color</Text></View>
				<TouchableOpacity
					style={[styles.colorButton, { backgroundColor: color }]}
					onPress={this.onExpandColor}
				/>
				<View style={styles.sliderValueContainer}/>
			</View>
			{this.state.isExpand &&
			<View style={{ width: '100%', alignItems: 'center', height: 262, justifyContent: 'center' }}>
				<ChromePicker
					color={color}
					onChange={({ hex }) => this.updateValue('color', hex)}
				/>
			</View>
			}
		</View>;
	};

	render() {
		const { velocity, gravity, degree } = this.props.configs;
		return <Animated.View
			style={[styles.container, this.props.customStyles, { height: this.state.innerHeight, overflow: 'hidden' }]}
			onLayout={(e) => {
				if (this.innerHeight === 0) {
					this.innerHeight = e.nativeEvent.layout.height;
					this.setState({ innerHeight: new Animated.Value(e.nativeEvent.layout.height) });
				}
			}}>
			<View {...this.props.panHandler}>
				<Text style={styles.title}>Customization</Text>
			</View>
			{this.renderSlider('Gravity', this.renderGravitySlider, gravity.toFixed(3))}
			{this.renderSlider('Velocity', this.renderVelocitySlider, velocity.toFixed(1))}
			{this.renderSlider('Degree', this.renderDegreeSlider, degree)}
			{this.renderColorPicker()}
    </Animated.View>;
	}

	updateValue = (key, value) => {
		this.props.dispatch(appActions.configureObject(key, value));
	};

	onExpandColor = () => {
		const value = (this.state.isExpand) ? this.innerHeight : (this.innerHeight + 262);
		Animated.spring(
			this.state.innerHeight,
			{
				toValue: value,
				duration: 300
			}
		).start();
		this.setState({ isExpand: !this.state.isExpand });
	}
}

const styles = StyleSheet.create({
	container: {
		width: 400,
		backgroundColor: 'white',
		borderRadius: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		shadowColor: 'black',
		shadowOffset: {
			width: 5,
			height: 5
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		paddingBottom: 10
	},
	title: {
		textAlign: 'center',
		fontSize: 16,
		marginTop: 10,
		marginBottom: 5,
		fontWeight: 'bold',
		userSelect: 'none'
	},
	sliderContainer: {
		width: '100%',
		paddingHorizontal: 10,
		marginTop: 5,
		height: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	sliderTitleContainer: {
		width: 75,
		height: '100%',
		justifyContent: 'center',
		marginRight: 15
	},
	sliderValueContainer: {
		width: 75,
		height: '100%',
		justifyContent: 'center',
		marginLeft: 20
	},
	sliderTitle: {
		fontSize: 13,
		fontWeight: 'bold'
	},
	sliderValue: {
		fontSize: 12
	},
	slider: {
		width: 100,
		height: 30
	},
	colorButton: {
		width: 100,
		height: 20,
	}
});
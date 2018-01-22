import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { connect } from 'react-universal-ui';

type Props = {
	object ?: Object,
	configs ?: Object
}

@connect(({ app }) => ({
	object: app.object,
	configs: app.configs
}))

export default class ObjectPhysics extends Component {
	props: Props;

	render() {
		const { x, y } = this.props.object;
		return <View style={[styles.object, { top: y, left: x, backgroundColor: this.props.configs.color }]}/>;
	}
}

const styles = StyleSheet.create({
	object: {
		backgroundColor: 'red',
		width: 50,
		height: 50,
		borderRadius: 25,
		position: 'absolute',
	}
});
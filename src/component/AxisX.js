import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class AxisX extends Component {
	render() {
		return <View>
      <Text>AxisX</Text>
    </View>;
	}
}

const styles = StyleSheet.create({
	axis: {
		position: 'absolute',
		bottom: 0,
		left: 0,
	}
});
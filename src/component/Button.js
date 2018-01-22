import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button } from 'react-universal-ui';

type Props = {
	title ?: string
}

export default class GameButton extends Component {
	props: Props;

	render() {
		return <Button
			{...this.props}
			wrapperStyle={styles.buttonWrapper}
			title={this.props.title}
			innerStyle={styles.innerStyle}
		/>;
	}
}

const styles = StyleSheet.create({
	buttonWrapper: {
		position: 'absolute',
		backgroundColor: 'lightblue',
		width: 200,
		height: 50,
		justifyContent: 'center'
	},
	innerStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

export class RotatingView extends Component {
  state = {
    spinValue: new Animated.Value(0),
    nextValue: 0,
  };

  componentDidMount() {
    this.spin(this.props.startValue, 500);
  }

  setSpinValue(value) {
    this.spin(value, 1000);
  }

  spin(toValue, duration) {
    Animated.timing(this.state.spinValue, {
      toValue: toValue,
      duration: duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(); // Starts the animation
  }

  render() {
    var val = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View
        style={{
          ...this.props.style,
          transform: [{ rotate: val }], // Bind rotation to animated value
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

RotatingView.propTypes = {
  duration: PropTypes.number, //How long
};

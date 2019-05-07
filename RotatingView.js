import React, { Component } from 'react';
import { Animated, Easing, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types'

export class RotatingView extends Component {
    state = {
        spinValue: new Animated.Value(0),
        toValue:0,
        nextValue:0,
    }
    
    componentDidMount() {
      this.spin();
      this.curr_spin_value = 0;
    }

    spin() {
      this.state.spinValue.stopAnimation();
      Animated.timing(
        this.state.spinValue,                                   // The animated value to drive
        {
            toValue: this.state.toValue || 0,                   // Animate to 360/value
            duration: this.props.duration || 8000,              // Make it take a while
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }
      ).start( () => {
        this.props.onFinishedAnimating(this);
        this.setState({toValue:this.state.nextValue});
        this.spin();
      });                    // Starts the animation
    }

    render() {
        this.curr_spin_value = this.state.spinValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    transform: [{rotate:this.curr_spin_value}],       // Bind rotation to animated value
                }}
            >
              {this.props.children}
            </Animated.View>
        );
    }
}

RotatingView.propTypes = {
    duration: PropTypes.number,             //How long
    toValue: PropTypes.number,              //How much rotation, eg. 0.5 will rotate 180deg
    onFinishedAnimating: PropTypes.func,    //What to do when animation finishes, see Aminated docs
};

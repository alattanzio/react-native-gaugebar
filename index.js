import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { RotatingView } from './RotatingView';
import * as Progress from 'react-native-progress';

let ImageResRPM = require('./textures/gauge_rpm1.png');
let ImageResSpeed = require('./textures/gauge_speed1.png');
let ImageResPercentage = require('./textures/gauge_perc1.png');
let ImageResIndicator = require('./textures/gauge_indicator.png');

export default class GaugeBar extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      power_value: 0,
      power_scale: 1.0,
      is_loading: true,
      view_digital: false,
    };

    this.rot_view = null;
  }

  setPowerValue(power_value) {
    this.setState({ power_value: power_value });
    if (this.rot_view) {
      this.rot_view.setSpinValue(power_value * this.state.power_scale); // force restart of animation
    }
  }

  setPowerScale(power_scale) {
    this.setState({ power_scale: power_scale });
  }

  setIsLoading(loading) {
    this.setState({ is_loading: loading });
  }

  render() {
    // background image based on type
    let imageBkg = ImageResRPM;
    let endValue = 0.75;
    if (this.props.gaugeType == 'speed') {
      imageBkg = ImageResSpeed;
    } else if (this.props.gaugeType == 'percentage') {
      this.setState({ is_percentage: true });
      imageBkg = ImageResPercentage;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          if (this.state.view_digital) {
            this.setPowerScale(this.state.power_scale);
            this.setPowerValue(this.state.power_value);
          }
          this.setState({ view_digital: !this.state.view_digital });
        }}>
        <ImageBackground
          style={{ height: this.props.width, width: this.props.width }}
          resizeMode="contain"
          source={imageBkg}>
          {this.renderIndicator(endValue)}
          {this.renderValue()}
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  renderIndicator(endValue) {
    if (this.state.is_loading)
      return (
        <Progress.CircleSnail
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          color={['gray', 'white', 'blue']}
        />
      );

    if (!this.state.view_digital)
      return (
        <View>
          <RotatingView
            ref={rot_view => {
              this.rot_view = rot_view;
            }}
            style={{ height: null, width: null }}
            duration={1000}
            toValue={endValue}
            startValue={this.state.power_value * this.state.power_scale}>
            <Image
              style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
              resizeMode="contain"
              source={ImageResIndicator}
            />
          </RotatingView>
          <Text
            style={{
              height: null,
              color: 'white',
              textAlign: 'center',
              backgroundColor: 'transparent',
              position: 'relative',
              top: '-70%',
              fontSize: 10,
              justifyContent: 'center',
            }}>
            {this.props.title.split(',').length > 1
              ? this.props.title.split(',')[0]
              : this.props.title}
          </Text>
        </View>
      );
    // digital
    else
      return (
        <View>
          <Text
            style={{
              height: null,
              color: 'white',
              textAlign: 'center',
              backgroundColor: 'transparent',
              position: 'relative',

              top: '170%',
              fontSize: 10,
              justifyContent: 'center',
            }}>
            {this.props.sub_title != null ? this.props.sub_title : ''}
          </Text>
          <Text
            style={{
              height: null,
              color: 'white',
              textAlign: 'center',
              backgroundColor: 'transparent',
              position: 'relative',
              top: '170%',
              marginTop: -2,
              fontSize: 20,
              justifyContent: 'center',
            }}>
            {this.props.title.split(',').length > 1
              ? this.props.title.split(',')[0]
              : this.props.title}
          </Text>
        </View>
      );
  }

  renderValue() {
    // no value if it's still loading
    if (this.state.is_loading) return;

    var marginTop = -10;
    var fontSize = 32;

    if (!this.state.view_digital) {
      marginTop = -10;
      fontSize = 32;
    }

    if (!this.state.view_digital)
      return (
        <Text
          style={{
            height: null,
            fontFamily: 'System',
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            marginLeft: 0,
            fontSize: 12,
            fontStyle: 'italic',
            fontWeight: 'bold',
            justifyContent: 'center',
          }}>
          {this.state.power_value + (this.state.is_percentage ? '%' : '')}
        </Text>
      );
    else
      return (
        <Text
          style={{
            height: null,
            fontFamily: 'System',
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'transparent',
            marginLeft: 0,
            marginTop: -10,
            fontSize: 32,
            fontStyle: 'italic',
            fontWeight: 'bold',
            justifyContent: 'center',
          }}>
          {this.state.power_value + (this.state.is_percentage ? '%' : '')}
        </Text>
      );
  }
}

GaugeBar.propTypes = {
  gaugeType: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
};

GaugeBar.defaultProps = {
  gaugeType: 'rpm',
  title: 'Gauge',
  width: 100,
};


# react-native-gaugebar

[![npm version](https://badge.fury.io/js/react-native-gaugebar.png)](https://badge.fury.io/js/react-native-gaugebar)

![alt-text](https://raw.githubusercontent.com/alattanzio/react-native-gaugebar/master/preview.gif)

## Getting started

`$ npm install react-native-gaugebar --save`

## Expo Snack
https://snack.expo.io/@alattanzio/gaugebar-2

## Usage
```javascript
import GaugeBar from 'react-native-gaugebar';

renderGauge() {
  return (
    <GaugeBar gaugeType="speed"
      ref={(cbar1) => { this.cbar1 = cbar1; }}
      title="Speed"
      sub_title="km/h"
      width={200}
    />
  )
}

```
  

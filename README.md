
# react-native-gaugebar

file: ![alt-text](https://github.com/alattanzio/react-native-gaugebar/blob/master/preview.gif)

## Getting started

`$ npm install react-native-gaugebar --save`


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
  

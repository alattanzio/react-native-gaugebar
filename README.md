
# react-native-gaugebar

## Getting started

`$ npm install react-native-gaugebar --save`

### Mostly automatic installation

`$ react-native link react-native-gaugebar`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-gaugebar` and add `RNGaugebar.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNGaugebar.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNGaugebarPackage;` to the imports at the top of the file
  - Add `new RNGaugebarPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-gaugebar'
  	project(':react-native-gaugebar').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-gaugebar/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-gaugebar')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNGaugebar.sln` in `node_modules/react-native-gaugebar/windows/RNGaugebar.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Gaugebar.RNGaugebar;` to the usings at the top of the file
  - Add `new RNGaugebarPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import GaugeBar from 'react-native-gaugebar';

renderGauge() {
	return (
		<GaugeBar gaugeType="speed"
			ref={(cbar1) => { this.cbar1 = cbar1; }}
			title="Speed"
			sub_title="km/h"
		/>
	)
}

```
  
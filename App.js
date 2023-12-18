import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text, TouchableWithoutFeedback } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import { parse, interpolatePath } from 'react-native-redash';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('screen');
const fill = "white";
const lefteye = "M30.43 16.78C30.43 24.39 24.29 30.57 16.72 30.57C9.15 30.57 3 24.39 3 16.78C3 9.18 9.15 3 16.72 3C24.29 3 30.43 9.18 30.43 16.78Z";
const righteye = "M162.99 16.79C162.99 24.4 156.84 30.57 149.27 30.57C141.7 30.57 135.56 24.4 135.56 16.79C135.56 9.18 141.7 3.01 149.27 3.01C156.84 3.01 162.99 9.18 162.99 16.79Z";

const App = ({ }) => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);
  const [rating, setRating] = React.useState(0);

  const expressions = [
    parse("M141.5 132.55C140.92 75.87 120.92 48.22 81.5 49.63C42.09 51.03 22.09 78.67 21.5 132.55L141.5 132.55Z"),
    parse("M122.32 87.65C121.94 68.08 108.83 58.53 83 59.02C57.17 59.5 44.06 69.04 43.68 87.65L122.32 87.65Z"),
    parse("M38.02 58.05L99.77 40.83L102.99 52.35L41.23 69.57L38.02 58.05Z"),
    parse("M122.32 64.68C121.94 84.25 108.83 93.79 83 93.31C57.17 92.82 44.06 83.28 43.68 64.68L122.32 64.68Z"),
    parse("M142.99 49.74C142.4 106.42 122.4 134.06 82.99 132.66C43.57 131.26 23.57 103.62 22.99 49.74L142.99 49.74Z"),
  ];

  const animatedProps = useAnimatedProps(() => {
    return {
      d: interpolatePath(progress.value, [0, 1, 2, 3, 4], expressions),
    };
  });

  const handleStarPress = (value) => {
    setRating(value);
    progress.value = withTiming(value, { duration: 530, easing: Easing.bezier(0.33, 1, 0.68, 1) });
  };

  const renderStar = (value) => (
    <TouchableOpacity onPress={() => handleStarPress(value)}>
      <Icon name={rating >= value ? "star" : "staro"} size={32} color={fill} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient style={styles.container} colors={['#1d4c1e', '#151618']}>
      <View style={styles.svgWrapper}>
        <View style={{ width: width, alignItems: 'center' }}>
          <Svg width={width} height={height / 4} viewBox="0 0 166 136" style={styles.svgContainer}>
            <G>
              <Path d={lefteye} fill={fill} />
              <AnimatedPath animatedProps={animatedProps} fill={fill} />
              <Path d={righteye} fill={fill} />
            </G>
          </Svg>
        </View>
      </View>

      <View style={styles.feedbackWrapper}>
        {renderStar(0)}
        {renderStar(1)}
        {renderStar(2)}
        {renderStar(3)}
        {renderStar(4)}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    paddingBottom: 40,
    backgroundColor: 'white'
  },
  feedbackWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * .9,
    position: 'absolute',
    bottom: 50,
  },
  headings: {
    justifyContent: "center"
  },
  heading: {
    color: "white",
    lineHeight: 20,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  svgContainer: {
    marginBottom: 40
  },
  svgWrapper: {
    alignItems: "center",
    justifyContent: "center"
  },
});

export default App;

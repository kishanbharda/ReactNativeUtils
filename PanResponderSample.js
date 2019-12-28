import React, { Component } from 'react';
import { View, Text, PanResponder, Animated, ScrollView, Dimensions, Image, StyleSheet, Slider } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const BAR_INITIAL_HEIGHT = 100;
const FULLSCREEN_MARGIN_TOP = 150;

class PanResponderSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.scrollOffset = 0;

    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - BAR_INITIAL_HEIGHT })

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if ((this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) || !this.state.isScrollEnabled && gestureState.dy < 0) {
          return true
        } else {
          return false
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveY > SCREEN_HEIGHT - FULLSCREEN_MARGIN_TOP) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 10,
          }).start();
        }
        else if (gestureState.moveY < FULLSCREEN_MARGIN_TOP) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 10,
          }).start();
        }
        else if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true });
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + FULLSCREEN_MARGIN_TOP,
            tension: 10,
          }).start();
        }
        else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false });
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - FULLSCREEN_MARGIN_TOP,
            tension: 10,
          }).start();
        }
      }
    });
  }

  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - BAR_INITIAL_HEIGHT],
      outputRange: [SCREEN_HEIGHT / 2, BAR_INITIAL_HEIGHT],
      extrapolate: "clamp"
    });

    animatedBarWidth = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - BAR_INITIAL_HEIGHT],
      outputRange: [100, 30],
      extrapolate: "clamp"
    });

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - BAR_INITIAL_HEIGHT],
      outputRange: [200, 32],
      extrapolate: "clamp"
    });

    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - BAR_INITIAL_HEIGHT],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - BAR_INITIAL_HEIGHT],
      outputRange: [SCREEN_WIDTH / 2 - 90, 10],
      extrapolate: "clamp"
    });

    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })

    return ( 
      <Animated.View style={{flex: 1, backgroundColor: 'orange'}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: BAR_INITIAL_HEIGHT}}
        >
          <Text style={{fontSize: 22}}>Anim et Lorem cupidatat ipsum veniam excepteur occaecat exercitation excepteur adipisicing. Laboris ut do dolore ipsum consequat ex aliqua esse anim cillum proident aliquip duis consectetur. Adipisicing pariatur proident ipsum nisi aliqua mollit fugiat et mollit aliquip sunt nisi veniam. Labore quis eiusmod qui do velit officia. Anim labore ut commodo mollit pariatur deserunt in.

Nisi reprehenderit sit aliqua dolor officia est fugiat consectetur. Aute reprehenderit velit do fugiat enim reprehenderit magna velit. Velit irure duis consectetur occaecat voluptate voluptate dolore nulla ipsum. Est sunt exercitation veniam proident proident in. Laborum officia nostrud elit non consectetur nisi Lorem. Minim culpa eiusmod cupidatat anim veniam velit magna amet.

Anim aliqua qui dolore ullamco. Proident consequat consequat quis nulla occaecat id sint qui nisi voluptate. Irure cillum ea sit exercitation elit. Irure duis proident id consectetur tempor anim elit proident excepteur. Cupidatat ullamco mollit in ex labore enim irure elit. Id deserunt deserunt aliqua qui voluptate. Eu duis fugiat exercitation consectetur culpa reprehenderit.

Irure nostrud deserunt veniam reprehenderit nulla. Cupidatat magna nisi eu consequat excepteur proident ex tempor in. Aute ex ex velit deserunt cupidatat laborum.

Esse eiusmod in ipsum duis. Cillum consequat magna minim irure ullamco reprehenderit adipisicing velit est. Qui dolore in ut nulla non anim deserunt culpa nisi qui aliquip sint duis nostrud. Ad tempor eiusmod cillum culpa laboris commodo exercitation amet aliqua enim.</Text>
        </ScrollView>
        <Animated.View 
          {...this.panResponder.panHandlers} 
          style={[animatedHeight, { 
            position: 'absolute', 
            left: 0, 
            right: 0, 
            zIndex: 10, 
            backgroundColor: 'white', 
            height: SCREEN_HEIGHT,
            borderTopLeftRadius: 30, 
            borderTopRightRadius: 30, 
            overflow: 'hidden'
          }]}
        >
           <ScrollView
            scrollEnabled={this.state.isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y
            }}
            contentContainerStyle={{paddingBottom: 60}}
          >
            <Animated.View style={[styles.bar, { width: animatedBarWidth }]} />

            <Animated.View
              style={{ height: animatedHeaderHeight, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
                <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                  <Image style={{ flex: 1, width: null, height: null }}
                    source={require('../headerBg.jpeg')} 
                  />
                </Animated.View>
                <Animated.Text style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10 }}>Hotel California(Live)</Animated.Text>
              </View>
              <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <Ionicons name="md-pause" size={32} />
                <Ionicons name="md-play" size={32} />
              </Animated.View>
            </Animated.View>

            <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Hotel California (Live)</Text>
                <Text style={{ fontSize: 18, color: '#fa95ed' }}>Eagles - Hell Freezes Over</Text>
              </View>

              <View style={{ height: 40, width: SCREEN_WIDTH, alignItems: 'center' }}>
                <Slider
                  style={{ width: 300 }}
                  step={1}
                  minimumValue={18}
                  maximumValue={71}
                  value={18}
                />
              </View>

              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Ionicons name="md-rewind" size={40} />
                <Ionicons name="md-pause" size={50} />
                <Ionicons name="md-fastforward" size={40} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                <Ionicons name="md-add" size={32} style={{ color: '#fa95ed' }} />
                <Ionicons name="md-more" size={32} style={{ color: '#fa95ed' }} />
              </View>

            </Animated.View>

            <View style={{paddingHorizontal: 10}}>
              <Text style={{fontSize: 16, color: "#3fa121"}}>Amet sit cillum velit voluptate nulla exercitation labore consectetur exercitation aute qui. Consectetur non ut id deserunt dolore proident cillum nisi ipsum mollit mollit. Aliqua ad proident sunt ullamco aliquip minim sit adipisicing eu eiusmod nostrud. Exercitation do Lorem laborum est veniam consectetur nisi irure duis est veniam est. Eu adipisicing ex consequat aute sunt quis amet.</Text>
              <Text style={{fontSize: 18, color: '#243da1'}}>Labore ea cupidatat minim elit et dolore reprehenderit mollit magna dolor cupidatat quis non. Laborum enim commodo ad ad minim pariatur elit amet commodo sunt deserunt sint enim. Id ullamco deserunt pariatur officia tempor amet minim in quis deserunt sit sit do magna. Commodo eu veniam quis eiusmod ex sit proident qui.</Text>
              <Text style={{fontSize: 16, color: "#65da21"}}>Amet sit cillum velit voluptate nulla exercitation labore consectetur exercitation aute qui. Consectetur non ut id deserunt dolore proident cillum nisi ipsum mollit mollit. Aliqua ad proident sunt ullamco aliquip minim sit adipisicing eu eiusmod nostrud. Exercitation do Lorem laborum est veniam consectetur nisi irure duis est veniam est. Eu adipisicing ex consequat aute sunt quis amet.</Text>
            </View>

          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#aaaaaa',
    marginTop: 10,
    alignSelf: 'center'
  }
})

export default PanResponderSample;

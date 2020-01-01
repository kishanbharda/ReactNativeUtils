import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, Image, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 150;
const PROFILE_IMAGE_MIN_HEIGHT = 50;

class TwitterHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scrollY = new Animated.Value(0);
    
    this.fixedHeaderHeight = this.scrollY.interpolate({
      inputRange:[0, 220],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 1)'],
      extrapolate: "clamp"
    });

    this.imageSize = this.scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    this.avatarTopPosition = this.scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [(HEADER_MAX_HEIGHT / 2) - (PROFILE_IMAGE_MAX_HEIGHT / 2), 10],
      extrapolate: "clamp"
    });

    this.avatarLeftPosition = this.scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [(Dimensions.get('screen').width / 2) - (PROFILE_IMAGE_MAX_HEIGHT / 2), 60],
      extrapolate: "clamp"
    });

    this.textPosition = this.scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [(HEADER_MAX_HEIGHT / 2) + (PROFILE_IMAGE_MAX_HEIGHT / 2) + 20, 20],
      extrapolate: "clamp"
    });

    this.headerHeight = this.scrollY.interpolate({
      inputRange: [0, 220],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

  }

  render() {
    const AnimatedIB = Animated.createAnimatedComponent(ImageBackground);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Animated.ScrollView 
            style={{flex: 1}}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
          >
            <Animated.View style={{marginTop: 300}}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <View style={{height: 100, borderWidth: 1}} key={item.toString()} />
                ))
              }
            </Animated.View>
          </Animated.ScrollView>

          <Animated.View 
            style={
              [
                styles.header, 
                {
                  height: this.headerHeight
                }
              ]
            }
          >
            <AnimatedIB
              source={require('../headerBg.jpeg')}
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
            >
              <TouchableOpacity 
                style={styles.btnBar}
                onPress={() => {
                  this.props.navigation.openDrawer();
                }}
              >
                <Icon name="bars" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Animated.Image
                source={require('../avatar.jpeg')}
                style={[styles.avatar, {
                  position: 'absolute',
                  height: this.imageSize,
                  width: this.imageSize,
                  top: this.avatarTopPosition,
                  left: this.avatarLeftPosition,
                }]}
              />
              
              <Animated.Text style={[{fontSize: 22, fontWeight: 'bold', color: '#ffffff', alignSelf: 'center'},{
                position: 'absolute',
                top: this.textPosition
              }]}>
                Steve Rogers
              </Animated.Text>
            </AnimatedIB>
          </Animated.View>

          
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1111,
    flexDirection: 'row',
  },
  avatar: {
    borderRadius: PROFILE_IMAGE_MAX_HEIGHT,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignSelf: 'center'
  },
  btnBar: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    position: 'absolute',
    top: 15,
  }
})

export default TwitterHeader;

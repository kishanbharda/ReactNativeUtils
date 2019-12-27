import React, { Component } from 'react';
import { View, Text, Button, ScrollView, Image, Animated, StyleSheet, Easing, ImageBackground } from 'react-native';

class HeaderAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.scrollY = new Animated.Value(0);
  }

  componentDidMount = () => {
  }

  render() {
    this.fixedHeaderTopPosition = this.scrollY.interpolate({
      inputRange: [200, 202],
      outputRange: [-70, 0],
      extrapolate:"clamp",
    });
    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.fixedHeader, {
          position: 'absolute',
          top: this.fixedHeaderTopPosition,
          left: 0,
          right: 0
        }]}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../avatar.jpeg')}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#777777'}}>
            John Cena
          </Text>
        </Animated.View>
        <Animated.ScrollView 
          style={{flex: 1}}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollY } } }
          ])}
        > 
          <ImageBackground 
            source={require('../avatar.jpeg')}
            style={{height: 200, width: '100%', justifyContent: 'center', alignItems: 'center'}}
            resizeMode="cover"
          >
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>
              John Cena
            </Text>
          </ImageBackground>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <View key={item.toString()} style={{height: 100, borderWidth: 1, width: '100%'}} />
            ))
          }
          <Button 
            title="Go To Products"
            onPress={() => {
              this.props.navigation.navigate('Products');
            }}
          />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fixedHeader: {
    height: 70,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 3,
    },
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
    zIndex: 100
  },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#555555',
    overflow: 'hidden',
    marginRight: 10
  }
})

export default HeaderAnimation;

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image, ScrollView } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import RadioButtonRN from 'radio-buttons-react-native';
import { Video } from 'expo-av';

import getToken from '../api/getToken';
import initDataDetailLecture from '../api/initDataDetailLecture';
import global from '../global';
import submitExercise from '../api/submitExercise';

var hobbies = [
    {label: "2", id: 0},
    {label: "II", id: 1},
    {label: "Hai", id: 2},
];

const Tab = ({ tab, page, isTabActive, onPressHandler, onTabLayout, styles }) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 20,
    paddingVertical: 10,
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor,
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
  const textStyle = {
    color: styles.textColor,
    fontWeight: '600',
  };
  const iconStyle = {
    tintColor: styles.textColor,
    resizeMode: 'contain',
    width: 22,
    height: 22,
    marginLeft: 10,
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

class Lecture extends Component {
    constructor(props) {
        super(props);
        this.state = { listData: [] };
    }

    componentDidMount() {
        const id = this.props.route.params;
        const user_id = global.onSignIn.id;

        // console.log(this.props);

        getToken()
        .then(token => initDataDetailLecture(token, user_id, id))
        .then(listData => this.setState({ listData }))
        .catch(err => this.gotoLogin());
    }

    compareAnswer(e) {
        // console.log(e);

        // const user_id = global.onSignIn.id;
        // const document_id = e.id;

        /*
        const answer = e.correct
        const user_answer = (get from RadioButton)
        
        const is_correct = answer === user_answer;

        const data = {
            user_id: user_id,
            document_id: e.id,
            answer: user_answer,
            is_correct: is_correct,
        };

        getToken()
        .then(token => submitExercise(token, data))
        .then(res => console.log(res))
        .catch(err => console.log(err))
        */
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    _scrollX = new Animated.Value(0);
    // 6 is a quantity of tabs
    interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
        scale: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [1, 1.2, 1],
        extrapolate: 'clamp',
        }),
        opacity: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
        }),
        textColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['#000', '#fff', '#000'],
        }),
        backgroundColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
        extrapolate: 'clamp',
        }),
    }));

    render() {
        const { listData } = this.state;
        // console.log(listData);

        const PageLyThuyet = ({e}) => (
            <ScrollView style={styles.container}>
                <Text style = {formatText}> {e.name} </Text>
                <Text style = {formatText}>{e.meta.description}</Text>
            </ScrollView>
          );
          
        const PageVideo = ({e}) => (
            <ScrollView style={styles.container}>
                <Text style = {formatText}> {e.name} </Text>
                <Video
                    // ref={null}
                    source={{uri: e.meta.url}}
                    useNativeControls
                    resizeMode='contain'
                    style={video}
                />
            </ScrollView>
        );
        const PageBaiTap = ({e}) => (
            <ScrollView style={styles.container}>
            <Text style = {formatText}> {e.name} </Text>
            <Text style = {formatText}> {e.meta.question} </Text>
            <RadioButtonRN
                // data={e.meta.answers}
                data={hobbies}
                initial={1}
                circleSize={16}
                style={radioBtn}
            />
            <TouchableOpacity
                style={btnMark}
                onPress={this.compareAnswer(e)}
            >
                <Text style = {{color: '#fff'}}>Gửi</Text>
            </TouchableOpacity>
            </ScrollView>
        );
        const {
            container, row1, titleStyle, iconStyle, video,
            wrapper, formatText, btnMark, radioBtn, 
        } = styles;

        

        return (
        <View style={ container }>
            <ScrollableTabView
                renderTabBar={() => (
                <TabBar
                underlineColor="#000"
                tabBarStyle={{ backgroundColor: "#666363", borderTopColor: '#d2d2d2', borderTopWidth: 1 }}
                renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                    <Tab
                        key={page}
                        tab={tab}
                        page={page}
                        isTabActive={isTabActive}
                        onPressHandler={onPressHandler}
                        onTabLayout={onTabLayout}
                        styles={this.interpolators[page]}
                    />
                )}
                />
            )}
            onScroll={(x) => this._scrollX.setValue(x)}
            >
            {
                listData.map(data => {
                    if(data.document_types.name === "Lý thuyết") {
                        // console.log(data);
                        return (
                            <PageLyThuyet tabLabel={{label: data.name}} e={data} key={0} />
                        );
                    }
                    if(data.document_types.name === "Bài tập") {
                        return (
                            <PageBaiTap tabLabel={{label: data.name}} e={data} key={1} />
                        );
                    }
                    if(data.document_types.name === "Video") {
                        return (
                            <PageVideo tabLabel={{label: data.name}} e={data} key={2} />
                        );
                    }
                })
            }
            </ScrollableTabView>
        </View>
    );
  }
}

export default Lecture;

const styles = StyleSheet.create({
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 28,
    },
    wrapper: {
        margin: 20,
        backgroundColor: '#666363',
        borderRadius: 25,
    },
    btnMark: {
        marginLeft: 220,
        margin: 10,
        height: 40,
        backgroundColor: '#262525',
        borderRadius: 20,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formatText: {
        margin: 10,
        fontSize: 20,
        color: '#fff',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        fontSize: 30
    },
    row1: { 
        backgroundColor: '#666363',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30, margin: 5 },
    container: {
        flex: 1,
        backgroundColor: '#262525',
    },
    productImage: {
        margin: 5,
        borderRadius: 10,
        width: 90,
        height: (90 * 450) / 400
    },
    productContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#007bff',
        fontSize: 25,
        fontWeight: '700',
    },
    txtDel: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '700',
    },
    txtTitle: {
        backgroundColor: '#FFF',
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 25,
        fontWeight: '700',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    radioBtn: {
        width: 300,
        marginLeft: 35,
    },
  });

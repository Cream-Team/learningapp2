import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, View } from 'react-native';

import DropDownItem from "react-native-drop-down-item";


class Course extends Component {
    constructor(props) {
        super();
    }
    goBack = () => {
        this.props.navigation.pop();
    }
    gotoCourseDetail() {
        this.props.navigation.navigate('DetCourse');
      }
  render() {
    const {
      container, txtTitle, row1, txtName, descript,contai, titleStyle, hr
    } = styles;
    return (
        <View style={ container }>
            <View style={row1}>
                <Text style={titleStyle}>Khoá học React Native</Text>
            </View>
            <View style={hr}></View>
          <ScrollView style={ descript }>
            <DropDownItem
                //key={1}
                header={
                <View style={ contai }>
                    <Text style = {txtTitle}>★ Mở Đầu</Text>
                </View>
                }
            >
                <TouchableOpacity>
                    <Text
                        style = {txtName}
                        // onPress = {}
                    >● Giới thiệu chung</Text>
                </TouchableOpacity>
                <Text style = {txtName}>● Giới thiệu môn học</Text>
                <Text style = {txtName}>● Đánh giá</Text>
            </DropDownItem>
            <DropDownItem
                //key={1}
                header={
                <View style={ contai }>
                    <Text style = {txtTitle}>★ Chương 1</Text>
                </View>
                }
            >
                <Text style = {txtName}>● Bài 1</Text>
                <Text style = {txtName}>● Bài 2</Text>
                <Text style = {txtName}>● Bài 3</Text>
            </DropDownItem>
            <DropDownItem
                //key={1}
                header={
                <View style={ contai }>
                    <Text style = {txtTitle}>★ Chương 2</Text>
                </View>
                }
            >
                <Text style = {txtName}>● Bài 1</Text>
                <Text style = {txtName}>● Bài 2</Text>
                <Text style = {txtName}>● Bài 3</Text>
            </DropDownItem>
            <DropDownItem
                //key={1}
                header={
                <View style={ contai }>
                    <Text style = {txtTitle}>★ Kết thúc khoá học</Text>
                </View>
                }
            >
                <Text style = {txtName}>● Chúc mừng hoàn thành khoá học</Text>
            </DropDownItem>
          </ScrollView>
        </View>
      );
  }
}

export default Course;

const styles = StyleSheet.create({
    row1: { backgroundColor: '#666363' , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30, margin: 5 },
    iconCup: { 
        width: 40, 
        height: 40, 
        margin: 5,
        borderRadius: 25,
    },
    container: {
        flex: 1,
        backgroundColor: '#262525',
    },
    descript: {
        margin: 15,
    },
    hr: {
        height: 10,
        backgroundColor: '#666363',
        borderColor: 'gray',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    contai: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#262525',
    },
    score: { 
        margin: 15,
        flexDirection: 'row', 
    },
    txtTienDo: {
        marginLeft: 5,
        marginTop: 16,
        color: '#fff',
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    txtDel: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '700',
    },
    txtTitle: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 25,
        fontWeight: '400',
    },
    startStyle: {
        marginLeft: 190,
        backgroundColor: '#0075b4',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
        width: 70,
    },
});

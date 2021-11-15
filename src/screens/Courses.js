import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { DEVICE_WIDTH, PADDING_CONTENT, TEXTSIZE } from "../constant/Constant";

const listData = [
    {key: 0, name: 'Khóa học 1', brief: 'Đây là khóa học 1'},
    {key: 1, name: 'Khóa học 2', brief: 'Đây là khóa học 2'},
    {key: 2, name: 'Khóa học 3', brief: 'Đây là khóa học 3'},
];

class Courses extends Component {
    render() {
        return(
            <View style={ styles.container }>
                <ScrollView>
                    { listData.map((item) => {
                        return (
                            <TouchableOpacity
                                style={ styles.rect2 }
                                // onPress
                            >
                                <Text style={ styles.textButton }> {item.name} </Text>
                                <Text style={ styles.textButton }> {item.brief} </Text>
                            </TouchableOpacity>
                        );
                    }) }
                </ScrollView>
            </View>
        );
    }
}

export default Courses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rect2: {
        borderColor: "#000",
        borderWidth: 1,
        flexDirection: "column",
        width: DEVICE_WIDTH,
        height: 100,
        padding: PADDING_CONTENT,
    },

    textButton: {
        color: "#000",
        fontSize: TEXTSIZE
    },
});
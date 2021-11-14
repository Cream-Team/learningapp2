import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Courses extends Component {
    render() {
        return(
            <View style={ styles.container }>
                <Text>This is Courses</Text>
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
});
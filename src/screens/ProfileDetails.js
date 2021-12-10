import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class ProfileDetails extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Text>CHỨC NĂNG VẪN ĐANG PHÁT TRIỂN</Text>
            </View>
        );
    }
}

export default ProfileDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


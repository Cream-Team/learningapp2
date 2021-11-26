import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { DEVICE_WIDTH, PADDING_CONTENT, TEXTSIZE } from "../constant/Constant";
import initDataCourse from "../api/initDataCourses";
import getToken from "../api/getToken";

class ListCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { listData: [] };
    }
    componentDidMount() {
        getToken()
        .then(token => initDataCourse(token))
        .then(listData => this.setState({ listData }))
        .catch(err => this.gotoLogin());
    }

    gotoCourse() {
        this.props.navigation.navigate("Course");
    }
    render() {
        const { listData } = this.state;
        return(
            <View style={ styles.container }>
                <ScrollView>
                    { listData.map((item) => {
                        return (
                            <TouchableOpacity
                                style={ styles.rect2 }
                                onPress={this.gotoCourse.bind(this)}
                                key={item.id}
                            >
                                <Text style={ styles.textButton }> {item.code} </Text>
                                <Text style={ styles.textButton }> {item.started_at} </Text>
                            </TouchableOpacity>
                        );
                    }) }
                </ScrollView>
            </View>
        );
    }
}

export default ListCourses;

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
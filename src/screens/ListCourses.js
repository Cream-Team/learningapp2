import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { DEVICE_WIDTH, PADDING_CONTENT, TEXTSIZE } from "../constant/Constant";
import initDataCourse from "../api/initDataCourses";
import getToken from "../api/getToken";
import { TextInput } from "react-native-gesture-handler";

class ListCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { listData: [], data: [], search: ''};
    }

    componentDidMount() {
        getToken()
        .then(token => initDataCourse(token))
        .then(listData => this.setState({ listData, data: listData }))
        .catch(err => this.gotoLogin());
    }
    
    gotoCourse(id) {
        this.props.navigation.navigate("Course", id);
    }

    gotoLogin() {
        this.props.navigation.navigate("Login");
    }

    _search(text){
        let list = [];
        this.state.data.map(function(value){
          if(value.code.indexOf(text) > -1){
            list.push(value);
          }
        });
        this.setState({
          listData:list,
          search:text
        });
    }

    render() {
        const { listData } = this.state;
        // console.log(listData);

        return(
            <View style={ styles.container }>
                <ScrollView>
                    <View>
                        <TextInput
                            placeholder='Search'
                            value={this.state.search}
                            onChangeText={(text)=>this._search(text)}
                        >
                        </TextInput>
                    </View>
                    { listData.map((item) => {
                        return (
                            <TouchableOpacity
                                style={ styles.rect2 }
                                onPress={() => this.gotoCourse(item.id)}
                                key={item.id}
                            >
                                <Text style={ styles.textButton }> {item.code} </Text>
                                <Text style={ styles.textButton }> {item.started_at} </Text>
                                <Image style={ styles.productImage } source={{uri:item.thumbnail}}></Image>
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
    productImage: {
        margin: 5,
        borderRadius: 10,
        width: 90,
        height: (90 * 450) / 400
    },
});
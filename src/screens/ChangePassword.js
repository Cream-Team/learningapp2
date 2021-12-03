import React, { Component } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { DEVICE_WIDTH, MARGIN_VIEW, PADDING_CONTENT, TEXTSIZE } from "../constant/Constant";

import global from "../global";
import getToken from "../api/getToken";
import changeInfoApi from "../api/changeInfoApi";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            rePass: ''
        };
    }

    goBackToMain() {
        this.props.navigation.pop();
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đổi thông tin thành công',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onFail() {
        Alert.alert(
            'Thông báo',
            'Đổi thông tin thất bại',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    async onChangeProfile() {
        const { pass, rePass } = this.state;
        if(pass === rePass) {
            const token = await getToken();
            changeInfoApi(token, pass)
            .then(res => {
            if (res.msg) {
                this.onFail();
            } else {
                this.onSuccess();
                global.onSignIn.email = res.email;
                this.goBackToMain();
            }
            })
            .catch(err => {
            this.onFail();
            console.log(err);
            });
        } else {
            this.onFail();
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.rect }>
                    <TextInput
                        placeholder='Mật khẩu mới'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({
                            pass: text
                        })}
                        style = {styles.textInput}
                    >
                    </TextInput>
                </View>
                
                <View style={ styles.rect }>
                    <TextInput
                        placeholder='Nhập lại mật khẩu mới'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({
                            rePass: text
                        })}
                        style = {styles.textInput}
                    >
                    </TextInput>
                </View>
                
                <TouchableOpacity
                    onPress={this.onChangeProfile.bind(this)}
                >
                    <Text>Đồng ý</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        color: "#000",
        width: DEVICE_WIDTH-40,
        height: 48,
        fontSize: TEXTSIZE,
    },
    rect: {
        width: DEVICE_WIDTH-40,
        height: 48,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        marginTop: MARGIN_VIEW,
        marginLeft: MARGIN_VIEW,
        marginRight: MARGIN_VIEW,
        padding: PADDING_CONTENT
    },
});
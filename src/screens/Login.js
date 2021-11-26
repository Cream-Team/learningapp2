import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { DEVICE_WIDTH, MARGIN_VIEW, PADDING_CONTENT, TEXTSIZE } from '../constant/Constant';
import global from '../global';
import signIn from '../api/signIn';
import saveToken from '../api/saveToken';
import getToken from '../api/getToken';
import initData from "../api/initDataCourses";
import getUserLogged from "../api/getUserLogged";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        getToken()
        .then(token => getUserLogged(token))
        .then(res => this.redirectToMain(res))
        .catch(err => console.log(err));
    }

    redirectToMain(res) {
        if(res.email) {
            global.onSignIn = res;
            this.props.navigation.navigate("Home")
        }
    }

    gotoMain() {
        this.props.navigation.navigate("Home")
    }

    gotoRegister() {
        this.props.navigation.navigate("Register")
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đăng nhập thành công',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
      }
    
    onFail() {
        Alert.alert('Alert Title', 'My Alert Msg', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    }

    onSignIn() {
        const { email, password } = this.state;
        signIn(email, password)
          .then(res => {
            if(res.user) {
              global.onSignIn = res.user;
              saveToken(res.access_token);
              this.onSuccess();
              this.gotoMain();
            } else {
              console.log(res)
              this.onFail();
            }
          })
          .catch(err => {
            console.log(err)
            this.onFail();
          });
    }

    render() {
        const { email, password } = this.state;
        return (
            <View styles={ styles.container }>
                <View style = { styles.rect }>
                    <TextInput
                        placeholder="Email"
                        textBreakStrategy="highQuality"
                        keyboardType="email-address"
                        style={ styles.textInput }
                        onChangeText={text => this.setState({email: text})}
                        color="#000"
                    ></TextInput>
                </View>
                <View style={ styles.rect }>
                <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        style={ styles.textInput }
                        onChangeText={text => this.setState({password: text})}
                        color="#000"
                    ></TextInput>
                </View>

                <TouchableOpacity
                    onPress={this.onSignIn.bind(this)}
                    style={ styles.button }
                >
                    <Text style={ styles.textButton }>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.gotoRegister.bind(this)}
                    style={ styles.button }
                >
                    <Text style={ styles.textButton }>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
        
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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

    textInput: {
        color: "#000",
        width: DEVICE_WIDTH-40,
        height: 48,
        fontSize: TEXTSIZE,
    },

    textButton: {
        color: "#000",
        fontSize: TEXTSIZE
    },

    button: {
        width: DEVICE_WIDTH - 40,
        height: 48,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,1)",
        borderRadius: 15,
        backgroundColor: "#ffd11a",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        marginTop: MARGIN_VIEW,
        marginLeft: MARGIN_VIEW,
        marginRight: MARGIN_VIEW,
        padding: PADDING_CONTENT
    }
});
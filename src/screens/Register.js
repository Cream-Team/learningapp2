import React, { Component } from "react";
import {
    StyleSheet, Text, View, Alert
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { theme } from "../core/theme";

import { Registerhead } from "../components/Registerhead";
import { LinearGradient } from "expo-linear-gradient";

import register from "../api/register";
import saveToken from "../api/saveToken";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: ''
        };
    }

    gotoMain() {
        this.props.navigation.navigate("Home")
    }

    goBack() {
        this.props.navigation.pop()
    }

    onSuccess() {
        Alert.alert(
            'Thông báo',
            'Đăng ký thành công',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }
    
    onFail() {
        Alert.alert(
            'Thông báo',
            'Đăng ký thất bại',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onSignUp() {
        const { email, password, rePassword } = this.state;
        if (password !== rePassword) {
            this.onFail();
        } else {
            register(email, password)
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
    }

    render() {
      const { email, password, rePassword } = this.state;
      return (
        <View styles={styles.container}>
          <View style={styles.head}>
            <Registerhead />
          </View>
          <View style={styles.body}>
            <View style={styles.rect}>
              <TextInput
                placeholder="Email"
                textBreakStrategy="highQuality"
                keyboardType="email-address"
                style={styles.textInput}
                onChangeText={(text) => this.setState({ email: text })}
                color="#000"
              ></TextInput>
            </View>
            <View style={styles.rect}>
              <TextInput
                placeholder="Mật khẩu"
                textContentType="password"
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(text) => this.setState({ password: text })}
                color="#000"
              ></TextInput>
            </View>
            <View style={styles.rect}>
              <TextInput
                placeholder="Nhập lại mật khẩu"
                textContentType="password"
                secureTextEntry={true}
                style={styles.textInput}
                onChangeText={(text) => this.setState({ rePassword: text })}
                color="#000"
              ></TextInput>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={this.onSignUp.bind(this)}>
              <LinearGradient
                colors={["#884BCB", "#7A43CB", "#713ECD"]}
                style={styles.button}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: responsiveFontSize(1.5),
                  }}
                >
                  ĐỒNG Ý
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.row}>
              <Text>Đã có tài khoản? Quay trở lại </Text>
              <TouchableOpacity
                onPress={this.goBack.bind(this)}
              >
                <Text style={styles.link}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  head: { marginTop: responsiveHeight(10), marginLeft: responsiveWidth(2.5) },

  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: responsiveHeight(20),
  },

  footerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: responsiveHeight(10),
  },

  rect: {
    width: responsiveWidth(90),
    height: 48,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },

  textInput: {
    color: "#000",
    height: 48,
    textAlign: "left",
    width: responsiveWidth(77.2),
    height: responsiveHeight(7),
    fontSize: responsiveFontSize(2),
    paddingLeft: responsiveWidth(3),
  },

  button: {
    backgroundColor: "#743fcd",
    borderRadius: 40,
    width: responsiveWidth(30),
    height: responsiveHeight(6),
    justifyContent: "center",
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(2),
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    marginTop: responsiveHeight(2.5),
    alignSelf: "center",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

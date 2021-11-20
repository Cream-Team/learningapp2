import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../core/theme";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  MARGIN_VIEW,
  PADDING_CONTENT,
  TEXTSIZE,
} from "../constant/Constant";
import { Loginhead } from "../components/Loginhead";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    const { email, password } = this.state;
    return (
      <View styles={styles.container}>
        <View style={styles.head}>
          <Loginhead />
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
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={(text) => this.setState({ password: text })}
              color="#000"
            ></TextInput>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
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
                SIGN IN
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: responsiveWidth(5),
    height: responsiveHeight(100),
  },

  head: { marginTop: responsiveHeight(10), marginLeft: responsiveWidth(2.5) },

  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: responsiveHeight(16),
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
    paddingLeft: responsiveWidth(3.5),
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

  textButton: {
    color: "#000",
    fontSize: responsiveFontSize(2),
  },

  textNav: {
    color: theme.colors.text,
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#743fcd",
    borderRadius: 40,
    width: responsiveWidth(35),
    height: responsiveHeight(5),
    paddingTop: 10,
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

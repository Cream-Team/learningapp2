import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { DEVICE_WIDTH, MARGIN_VIEW, PADDING_CONTENT, TEXTSIZE } from '../constant/Constant';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
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
                    onPress={() => this.props.navigation.navigate("Home")}
                    style={ styles.button }
                >
                    <Text style={ styles.textButton }>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Register")}
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
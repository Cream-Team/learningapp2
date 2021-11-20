import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const Loginhead = () => (
  <View>
    <Text style={styles.title}>Hello user</Text>
    <Text style={styles.subTitle}>Yo?</Text>
  </View>
);

const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: responsiveFontSize(4.5),
    textAlign: "left",
    marginLeft: responsiveWidth(3),
    marginBottom: 15,
  },
  subTitle: {
    color: "#59595b",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(3),
    marginBottom: 70,
  },
});

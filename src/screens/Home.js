import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListCourses from './ListCourses';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator
            initialRouteName="ListCourse"
            activeColor="tomato"
            // barStyle={{ backgroundColor: '#ffa' }}
        >
            <Tab.Screen
                name="Danh sách khóa học"
                component={ ListCourses }
                options={{
                    tabBarLabel: 'Danh sách khóa học',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="book-open-variant" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Thông tin cá nhân"
                component={ Profile }
                options={{
                    tabBarLabel: 'Thông tin cá nhân',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Home;
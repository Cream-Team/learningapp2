import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import ListCourses from './ListCourses';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator initialRouteName="ListCourse">
            <Tab.Screen
                name="Danh sách khóa học"
                component={ ListCourses }
                options={
                    {
                        // tabBarIcon: () => {
                            
                        // }
                    }
                }
            />
            <Tab.Screen name="Thông tin cá nhân" component={ Profile } />
        </Tab.Navigator>
    );
}

export default Home;
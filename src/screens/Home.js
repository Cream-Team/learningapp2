import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Courses from './Courses';
import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator initialRouteName="Course">
            <Tab.Screen
                name="Courses"
                component={ Courses }
                options={
                    {
                        // tabBarIcon: () => {
                            
                        // }
                    }
                }/>
            <Tab.Screen name="Profile" component={ Profile } />
        </Tab.Navigator>
    );
}

export default Home;
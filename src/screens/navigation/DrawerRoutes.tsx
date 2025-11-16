import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../HomeScreen";
import ProfileScreen from "../ProfileScreen";
import ExploreScreen from "../ExploreScreen";
import AboutScreen from "../AboutScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: { backgroundColor: "#1A73E8" },
                headerTintColor: "#fff",
                drawerActiveTintColor: "#1A73E8",
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
            <Drawer.Screen name="Explore" component={ExploreScreen} options={{ title: "Explore+" }} />
            <Drawer.Screen name="About" component={AboutScreen} options={{ title: "Sobre o App" }} />
        </Drawer.Navigator>
    );
}

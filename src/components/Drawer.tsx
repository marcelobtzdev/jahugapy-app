import { createDrawerNavigator  } from "@react-navigation/drawer";
import { StyleSheet } from 'react-native';
import Home from "../screens/Home";
import TeamList from "../screens/Team/List";
import Logout from "../screens/Auth/Logout";
import Profile from "../screens/User/Profile";
import AddEditTeam from "../screens/Team/AddEdit";
import Stat from "../screens/Stat";
import EventDetail from "../screens/Event/Detail";
import AddEditEventScore from "../screens/Event/Score/AddEditScore";
import { createStackNavigator } from "@react-navigation/stack";

const NavigationDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerShown: false
        }}
    >
        <Stack.Screen name="TeamList" component={TeamList} options={{ title: 'MIS EQUIPOS' }}/>
        <Stack.Screen name="AddEditTeam" component={AddEditTeam} options={{ title: 'AGREGAR EQUIPO' }}/>
    </Stack.Navigator>
);

const EventsStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerShown: false
        }}
    >
        <Stack.Screen name="Events" component={Home} options={{ title: 'EVENTOS' }}/>
        <Stack.Screen name="EventDetail" component={EventDetail} options={{ title: 'DETALLE EVENTO' }}/>
        <Stack.Screen name="AddEditEventScore" component={AddEditEventScore} options={{ title: 'REPORTE' }}/>
    </Stack.Navigator>
);

const Drawer = () => {
    return (
        <NavigationDrawer.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerTintColor: '#fff',
                headerStyle: styles.header, 
                headerTitleStyle: styles.headerTitle, 
                drawerStyle: styles.drawer,
                drawerLabelStyle: styles.label,
                drawerActiveBackgroundColor: '#fff',
                drawerActiveTintColor: '#ed0f34',
                headerTitleAlign: "center",
                headerShadowVisible: false,
                drawerInactiveTintColor: '#fff',
                drawerInactiveBackgroundColor: '#ed0f34'
            }}
        >
            <NavigationDrawer.Screen name="Home" component={EventsStackNavigator} options={{ title: 'EVENTOS' }}/>
            <NavigationDrawer.Screen name="Profile" component={Profile} options={{ title: 'MI CUENTA' }}/>
            <NavigationDrawer.Screen name="Teams" component={StackNavigator} options={{ title: 'MIS EQUIPOS' }}/>
            <NavigationDrawer.Screen name="Stats" component={Stat} options={{ title: 'MIS ESTADISTICAS' }}/>
            <NavigationDrawer.Screen name="Logout" component={Logout} options={{ title: 'SALIR', headerShown: false }}/>
        </NavigationDrawer.Navigator>
        );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ed0f34'
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold'
    },
    drawer: {
        backgroundColor: '#ed0f34'
    },
    label: {
        fontFamily: 'Montserrat-SemiBold'
    }
});

export default Drawer;
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator,  } from "@react-navigation/stack";
import Welcome from "./screens/Welcome";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import Validation from "./screens/Auth/Validation";
import Drawer from "./components/Drawer";
import { useAppSelector } from "./hooks/redux";
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const Router = () => {
  const { user } = useAppSelector((state) => state.user);
  
  return (
    <NavigationContainer>
      {!user && (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerBackTitleVisible: false,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerShadowVisible: false
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
          <Stack.Screen
            name="Validation"
            component={Validation}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
      )}
      {user && (
        <Drawer />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ed0f34',
    elevation: 0,
    borderWidth: 0
  },
  headerTitle: {
    color: '#ed0f34',
  },
});

export default Router;
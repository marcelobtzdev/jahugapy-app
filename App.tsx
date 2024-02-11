import 'expo-dev-client';
import 'react-native-gesture-handler';
import { ReduxProvider, store, persistor} from './src/store';
import Router from './src/Router';
import { PaperProvider, MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AuthLogoutWrapper from './src/components/Wrapper/AuthLogoutWrapper';
import { createNavigationContainerRef } from '@react-navigation/native';
import { injectStore } from './src/config/axios';
import Toast from 'react-native-toast-message';
import { ToastConfig, ErrorToast, SuccessToast } from 'react-native-toast-message';
import { PersistGate } from 'redux-persist/integration/react';

injectStore(store);

SplashScreen.preventAutoHideAsync();

const fontConfig = {
  headlineMedium: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
  headlineSmall: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
  bodyLarge: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 14,
    lineHeight: 20
  }
};

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ed0f34',
    background: '#fff',
    onSurface: '#333',
    onSurfaceVariant: '#888',
    elevation: {
      level1: '#fff'
    },
    outline: '#ed0f34'
  },
  fonts: configureFonts({config: fontConfig}),
};

const toastConfig: ToastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontFamily: 'Montserrat-Regular',
        fontSize: 16, 
        fontWeight: 'normal',
        color: '#000'
      }}
      text1NumberOfLines={3}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#d70000' }}
      text1Style={{
        fontFamily: 'Montserrat-Regular',
        fontSize: 16, 
        fontWeight: 'normal',
        color: '#000'
      }}
      text1NumberOfLines={3}
    />
  ),
}; 

export default function App() {
  const [isLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={paperTheme}>
          <AuthLogoutWrapper navigationRef={navigationRef}>
            <Router />
          </AuthLogoutWrapper>
        </PaperProvider>
        <Toast config={toastConfig}/>
      </PersistGate>
    </ReduxProvider>
  );
}

/**
 * File DOC
 * 
 * @Description Página 'EntryPoint' do Projeto. A partir é direcionado a Navegação do Projeto.
 * @ChangeLog 
 *  - Vinícius Lessa - 14/06/2022: Criação do projeto + arquivos essenciais. Início da Estruturação de Navegação.
 * 
 */

import React from 'react'; // JSX Compilation

// React Navigation Module
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Views
import { 
  SearchCps ,
  ShowResult ,
} from './views'; //index

// Fonts
// import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';

import { css } from './assets/css/css';


export default function App() {
  
  // Load Fonts
  // let [fontsLoaded] = useFonts({
  //   'BebasNeue': require('./assets/fonts/BebasNeue-Regular.ttf') ,
  //   'CenturyGothic': require('./assets/fonts/GOTHIC.ttf') ,
  //   'CenturyGothicB': require('./assets/fonts/GOTHICB.ttf') ,
  // }) ;

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  // React Navigation - Stack (Default) (https://reactnavigation.org/docs/hello-react-navigation/)
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Busca CPS"
      >

        {/* TradePostDetailed - Index: 1 */}
        <Stack.Screen 
          name="Busca CPS"
          component={SearchCps} 
          options={{            
            unmountOnBlur: true,
            gestureHandlerProps:{
              enabled: false
            }
          }}
        />

        {/* TradePostDetailed - Index: 12 */}
        <Stack.Screen
          name="Resultados"
          component={ShowResult} 
          options={{            
            unmountOnBlur: true,
            gestureHandlerProps:{
              enabled: false
            }
          }}
        />        
        
      </Stack.Navigator>      
      
    </NavigationContainer>    
  );
}
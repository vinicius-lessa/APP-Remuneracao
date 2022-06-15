# MTC-MobileApp
<Description>

- Frontend EntryPoint: App.js
<!-- - Backend EntryPoint: Controller.js -->

# NODE MODULES (used within the project)
- expo CLI
    - Description: Expo is a set of tools built around React Native
    - command: $ npm install -g expo-cli (https://reactnative.dev/docs/environment-setup)

- react Navigation
    - Description: React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app.
    - commands:
        Base
        - $ npm install @react-navigation/native (https://reactnavigation.org/docs/getting-started)
        
        Dependencies
        - $ expo install react-native-screens react-native-safe-area-context (https://reactnavigation.org/docs/getting-started)

        Others
        - $ npm install @react-navigation/native-stack (https://reactnavigation.org/docs/hello-react-navigation)

- expo AppLoadging
    - Description: Utilizado no Root do projeto (App.js) para validar o carregamento das fontes customizadas
    - command: $ expo install expo-app-loading

- API Sauce
    - Description: ... (TradePost.js)
    - command: $ npm i apisauce --save

- React Native Mask Input
    - Description: A simple and effective Text Input with mask for ReactNative on iOS, Android, and Web.
    - Docs: https://www.npmjs.com/package/react-native-mask-input - https://github.com/CaioQuirinoMedeiros/react-native-mask-input
    - command(s):
        - $ npm install react-native-mask-input

- Expo Linking
    - Description: ...
    - Docs: https://reactnavigation.org/docs/deep-linking/ - https://docs.expo.dev/guides/linking/
    - command(s):
        - $ expo install expo-linking
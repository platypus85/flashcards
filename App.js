import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import combinedReducer from './src/store/combinedReducer';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';
import { primaryBackgroundColor, primaryColor, highlightBackgroundColor } from './src/themes/default/colors';
import MyStatusBar from './src/navigation/myStatusBar';
import MyStore from './src/store/myStore';
import MyNotifications from './src/notifications/myNotifications';
import { MyNavigator } from './src/navigation/myNavigator';
import {persistStore, autoRehydrate} from 'redux-persist'

const logger = store => next => action => {
  let result = next(action);
  return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combinedReducer,
  composeEnhancers(
    applyMiddleware(logger),
    autoRehydrate()
  )
)

persistStore(store, {storage: AsyncStorage}, () => {
});

export default function App () {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MyStore />
        <MyNotifications />
        <MyStatusBar backgroundColor={primaryBackgroundColor} />
        <MyNavigator />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

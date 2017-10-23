import React, {Component} from 'react';
import {View} from 'react-native';
import {setLocalNotification} from '../utils/notifications.js';

export default class MyNotifications extends Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (<View/>)
  }
}

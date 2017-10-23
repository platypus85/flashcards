import React, {Component} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {getDecks} from '../components/deck/deckActions'

class MyStore extends Component {
  componentDidMount() {
    this
      .props
      .setDecks();
  }
  render() {
    return (<View/>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setDecks: (decks) => dispatch(getDecks(decks))
  }
}

export default connect(null, mapDispatchToProps)(MyStore)

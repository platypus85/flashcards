import { TabNavigator, StackNavigator } from 'react-navigation'
import { primaryBackgroundColor, primaryColor, highlightBackgroundColor } from '../themes/default/colors';
import MyDeck from '../components/deck/myDeck';
import ViewDecks from '../views/viewDecks';
import ViewAddDeck from '../views/viewAddDeck';
import ViewDeck from '../views/viewDeck';
import ViewDeleteDecks from '../views/viewDeleteDecks';
import ViewAddCard from '../views/viewAddCard';
import ViewQuiz from '../views/viewQuiz';

const Tabs = TabNavigator({
  Decks: {
    screen: ViewDecks,
    navigationOptions: {
      tabBarLabel: 'All Decks'
    }
  },
  AddDeck: {
    screen: ViewAddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
  DeleteAllDeck: {
    screen: ViewDeleteDecks,
    navigationOptions: {
      tabBarLabel: 'Delete Decks',
    },
  }
}, {
  navigationOptions: {
    header: null
  },

  tabBarOptions: {
    activeTintColor: primaryColor,
    indicatorStyle: {
      backgroundColor: highlightBackgroundColor,
      height: 5
    },
    style: {
      height: 58,
      backgroundColor: primaryBackgroundColor,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export const MyNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: {
      title: 'Go back',
      headerTintColor: primaryColor,
      headerStyle: {
        backgroundColor: primaryBackgroundColor
      }
    }
  },
  AddCard: {
    screen: ViewAddCard,
    navigationOptions: {
      title: 'Cancel and go back',
      headerTintColor: primaryColor,
      headerStyle: {
        backgroundColor: primaryBackgroundColor
      }
    }
  },
  StartQuiz: {
    screen: ViewQuiz,
    navigationOptions: {
      title: 'Exit quiz and go back',
      headerTintColor: primaryColor,
      headerStyle: {
        backgroundColor: primaryBackgroundColor
      }
    }
  }
})

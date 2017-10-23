import { TabNavigator, StackNavigator } from 'react-navigation'
import { primaryBackgroundColor, primaryColor, highlightBackgroundColor } from '../themes/default/colors';
import MyDeck from '../components/deck/myDeck';
import ScreenDecks from '../screens/screenDecks';
import ScreenAddDeck from '../screens/screenAddDeck';
import ScreenViewDeck from '../screens/screenViewDeck';
import ScreenDeleteDecks from '../screens/screenDeleteDecks';
import ScreenAddCard from '../screens/screenAddCard';
import ScreenQuiz from '../screens/screenQuiz';

const Tabs = TabNavigator({
  Decks: {
    screen: ScreenDecks,
    navigationOptions: {
      tabBarLabel: 'All Decks'
      //tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: ScreenAddDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      //tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  DeleteAllDeck: {
    screen: ScreenDeleteDecks,
    navigationOptions: {
      tabBarLabel: 'Delete Decks',
      //tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
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
    screen: ScreenViewDeck,
    navigationOptions: {
      title: 'Go back',
      headerTintColor: primaryColor,
      headerStyle: {
        backgroundColor: primaryBackgroundColor
      }
    }
  },
  AddCard: {
    screen: ScreenAddCard,
    navigationOptions: {
      title: 'Cancel and go back',
      headerTintColor: primaryColor,
      headerStyle: {
        backgroundColor: primaryBackgroundColor
      }
    }
  },
  StartQuiz: {
    screen: ScreenQuiz,
    navigationOptions: {
      title: 'Exit quiz and go back',
      headerTintColor: primaryColor,
      headerStyle: {
        backgroundColor: primaryBackgroundColor
      }
    }
  }
})

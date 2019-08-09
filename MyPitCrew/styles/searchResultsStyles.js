import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    thumb: {
        width: 50,
        height: 50,
        marginRight: 10
      },
    textContainer: {
      flex: 1
    },
    separator: {
      height: 1,
      backgroundColor: '#ffffff',
      padding: 2
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#48BBEC'
    },
    category: {
      fontSize: 15,
      color: 'orange'
    },
    rowContainer: {
      flexDirection: 'row',
      padding: 10
    },
    image: {
        width: 50,
        height: 50,
      },
      flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
      },
      searchInput: {
        height: 40,
        padding: 8,
        width:"100%",
        flexGrow: 0.5,
        fontSize: 18,
        borderWidth: 2,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
      },
  });
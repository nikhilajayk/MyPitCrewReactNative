import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    description: {
      marginBottom: 20,
      fontSize: 18,
      textAlign: 'center',
      color: '#ffffff'
    },
    container: {      
        height:'100%',
        width:'100%',
        alignItems: 'center'
    },
    flowRight: {
        height:40,
        width:'60%',
      },
      OuterView: {
        padding: 20,        
        flexGrow: 0.5,
        flexDirection:'column',
        justifyContent: 'space-between',
      },
      frontPageLogo: {
        alignItems:'center',
        marginBottom:50,     
        marginTop:100,   
      },
  });

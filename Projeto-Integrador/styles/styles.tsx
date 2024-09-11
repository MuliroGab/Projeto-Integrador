import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    containerLog: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
      },

    TextInput:{
        color: '#FFFFFF'
    },

    touchable: {
        backgroundColor: '#000000'
    },

    qrcode: {
        width: 240,
        height: 240,
    },

    img: {
        width: 20,
        height: 20,
    },

    button: {
    backgroundColor: '#3498db',
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: '#6EC19A',
    },

    buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    },

    header: {
        flexDirection: 'row',
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      headerText: {
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      cell: {
        flex: 1,
        textAlign: 'center',
      },
      btnBack: {
        textAlign: 'center'
      },

      footer: {
        flexDirection: 'row',
        justifyContent: 'center',
      }
})
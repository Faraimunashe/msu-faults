const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    marginHorizontal: 10
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 50,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 20,
    alignItems: "center"
  },
  registerButton: {
    backgroundColor: "#4c5563",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    alignItems: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // or 'cover', 'stretch', 'center', etc.
  },
  imageContainer: {
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;

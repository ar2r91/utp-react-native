import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions, Image,
  Text,
  TextInput,
  View,
} from "react-native";

import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { login, logoutUser } from "../../actions/auth";
import SweetAlert from "react-native-sweet-alert";

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: Dimensions.get("window").width,
      windowHeight: Dimensions.get("window").height,
      name: "arthur",
      password: "arthur",
    };
  }

  alertError(message) {
    SweetAlert.showAlertWithOptions({
      title: "Error",
      subTitle: message,
      confirmButtonTitle: "Ok",
      confirmButtonColor: "#8ca540",
      otherButtonColor: "#8ca540",
      style: "error",
    });
  }

  loginButton() {
    const { name, password } = this.state;
    const credentials = { name, password };

    this.props.login(credentials).catch(err => {
      this.alertError(err.message);
      this.props.logoutUser();
    });
  }

  onFieldChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const { name, password } = this.state;
    const { isFetching } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}>
          <View style={{ margin: 10 }}>
            <View style={{ paddingLeft: 40 }}>
              <Text style={{
                color: "#8ca540", fontSize: 27, fontWeight: "bold", borderColor: "#8ca540",
              }}>Ingresar</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                value={name}
                onChangeText={value => this.onFieldChange("name", value)}
                style={{
                  height: 50, width: 270, fontSize: 20, borderWidth: 2, borderRadius: 25,
                  borderColor: "#8ca540", paddingHorizontal: 15,
                }}
                placeholder="Name" keyboardType="numeric" />
            </View>
          </View>
          <View style={{ margin: 10, alignItems: "center" }}>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={value => this.onFieldChange("password", value)}
              style={{
                height: 50, width: 270, fontSize: 20, borderWidth: 2, borderRadius: 25,
                borderColor: "#8ca540", paddingHorizontal: 15,
              }}
              placeholder="CONTRASEÑA"
              autoCapitalize="none" />
          </View>
          <View style={{ margin: 10, alignItems: "center" }}>
            {isFetching === false ?
              <Button buttonStyle={{
                borderRadius: 25, height: 50, width: 230, backgroundColor: "#8ca540",
              }} onPress={() => this.loginButton()} title="CONÉCTATE" /> :
              <ActivityIndicator color={"#8ca540"} animating={isFetching} />
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.loginReducer.isFetching,
  device_id: state.appReducer.device_id,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

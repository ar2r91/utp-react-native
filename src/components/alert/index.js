import React, {Component} from 'react';
import {connect} from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';

class Alert extends Component {

  constructor(props) {
    super(props);
  }

  /*showAlert = () => {
    this.setState({
      showAlerta: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlerta: false
    });
  };*/

  render() {
    alert(this.props.passedVal)
    return (
      <AwesomeAlert
        show={this.props.passedVal}
        showProgress={false}
        title="AwesomeAlert"
        message="I have a message for you!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        /*onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          this.hideAlert();
        }}*/
      />
    );
  }
}

export default connect()(Alert);
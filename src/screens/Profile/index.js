import React, { Component } from "react";
import {
   Dimensions, FlatList,
   Text,
   View,
   Modal, TextInput,
} from "react-native";

import { connect } from "react-redux";
import Loading from "../../components/loading";
import { Body, ListItem } from "native-base";
import { createNote, getNotes } from "../../actions/app";
import { Button, Icon } from "react-native-elements";

class Profile extends Component {

   constructor(props) {
      super(props);

      this.state = {
         windowWidth: Dimensions.get("window").width,
         windowHeight: Dimensions.get("window").height,
         list: [],
         loading: false,
         modalVisible: false,
         userId: null,
         title: null,
         description: null,
      };
   }

   componentDidMount() {
      const { navigation } = this.props;
      this.focusListener = navigation.addListener("willFocus", () => {
         this.getData();
      });
   }

   onRefresh() {
      this.getData();
   }

   componentWillUnmount() {
      this.focusListener.remove();
   }

   getData() {
      const { user } = this.props;
      this.setState({ loading: true });
      this.props.getNotes(user.id).then((data) => {
         this.setState({ loading: false, list: data });
      });
   }

   onFieldChange(field, value) {
      this.setState({ [field]: value });
   }

   newNote() {
      this.setState({ modalVisible: true });
   }

   hideModal() {
      this.setState({ modalVisible: false, title: null, description: null });
   }

   createNote() {
      const { title, description } = this.state;
      const { user } = this.props;

      this.setState({ loading: true });
      this.props.saveNote(user.id, title, description).then(() => {
         this.onRefresh();
         this.hideModal();
         this.setState({ loading: false });
      });
   }

   renderItem({ item }) {
      return (
        <ListItem>
           <Body style={{ alignItems: "center" }}>
              <Text style={{ color: "black", fontSize: 15, textAlign: "center" }}>{item.title}</Text>
           </Body>
           <Body style={{ alignItems: "center" }}>
              <Text style={{ color: "black", fontSize: 15, textAlign: "center" }}>{item.description}</Text>
           </Body>
        </ListItem>
      );
   }

   render() {
      const { loading, list, modalVisible, title, description, userId } = this.state;
      const { user } = this.props;

      if (user === null || loading === true) {
         return <Loading />;
      }

      return (
        <View style={{ flex: 1 }}>
           <View style={{ flex: 0.1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#8ca540", fontSize: 20, textAlign: "center", fontWeight: "bold" }}>Listado de
                 Notas</Text>
           </View>
           <View style={{ flex: 0.1 }}>
              <View style={{
                 paddingHorizontal: 10,
                 flexDirection: "row",
                 justifyContent: "center",
              }}>
                 <Text style={{
                    fontSize: 20,
                    color: "#8ca540",
                    fontWeight: "bold",
                 }}>Nueva nota </Text>
                 <Icon
                   onPress={() => {
                      this.newNote();
                   }}
                   size={30}
                   type="font-awesome"
                   name="plus-circle"
                   color="green" />
              </View>
           </View>
           <View style={{ flex: 1 }}>
              <FlatList showsHorizontalScrollIndicator={true}
                        data={list}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                        onRefresh={() => this.onRefresh()} refreshing={loading}
              />
           </View>
           <Modal animationType="fade" transparent={true} visible={modalVisible}>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                 <View
                   style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      padding: 20, elevation: 5, borderRadius: 20,
                   }}>
                    <TextInput
                      value={title}
                      onChangeText={value => this.onFieldChange("title", value)}
                      style={{
                         height: 50, width: 270, fontSize: 20, borderWidth: 2, borderRadius: 25,
                         borderColor: "#8ca540", marginBottom: 20, paddingHorizontal: 15,
                      }}
                      placeholder="Título"
                      autoCapitalize="none" />
                    <TextInput
                      value={description}
                      onChangeText={value => this.onFieldChange("description", value)}
                      style={{
                         height: 50, width: 270, fontSize: 20, borderWidth: 2, borderRadius: 25,
                         borderColor: "#8ca540", paddingHorizontal: 15, marginBottom: 20,
                      }}
                      placeholder="Descripción"
                      autoCapitalize="none" />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                       <Button buttonStyle={{
                          borderRadius: 25,
                          height: 50,
                          width: 100,
                          backgroundColor: "#8ca540",
                          marginBottom: 20,
                          marginRight: 10,
                       }} onPress={() => this.createNote()} title="Enviar" />
                       <Button buttonStyle={{
                          borderRadius: 25,
                          height: 50,
                          width: 100,
                          backgroundColor: "#8ca540",
                          marginBottom: 20,
                       }} onPress={() => this.hideModal()} title="Cancelar" />
                    </View>
                 </View>
              </View>
           </Modal>
        </View>
      );
   }
}

const mapStateToProps = state => ({
   user: state.loginReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
   getNotes: (user_id) => dispatch(getNotes(user_id)),
   saveNote: (user_id, title, description) => dispatch(createNote(user_id, title, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

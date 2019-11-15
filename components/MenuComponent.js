import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { DISHES } from "../shared/dishes";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }

  static navigationOptions = {
    title: "Menu"
  };
  render() {
    const rendreMenuItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
          leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };
    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={props.dishes}
        renderItem={rendreMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default Menu;

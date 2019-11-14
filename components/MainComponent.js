import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishDetailComponent";
import { View } from "react-native";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selected: null
    };
  }

  onDishSelect(dishID) {
    this.setState({ selected: dishID });
  }

  render() {
    return (
      <View>
        <Menu
          dishes={this.state.dishes}
          onPress={dishID => this.onDishSelect(dishID)}
        />
        <DishDetail
          dish={
            this.state.dishes.filter(dish => dish.id === this.state.selected)[0]
          }
        />
      </View>
    );
  }
}

export default Main;

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Modal,
  StyleSheet,
  Button,
  PanResponder,
  Alert
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreator";

import * as Animatable from "react-native-animatable";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment, date) =>
    dispatch(postComment(dishId, rating, author, comment, date))
});

function RenderDish(props) {
  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };

  handleViewRef = ref => (this.view = ref);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view.rubberBand(1000).then(endState => console.log(endState.finished ? "finished" : "cancelled"));
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState))
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + dish.name + " to favorite?",
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
            {
              text: "OK",
              onPress: () => {
                props.favorite ? console.log("Already favorite") : props.onPress();
              }
            }
          ],
          { cancelable: false }
        );

      return true;
    }
  });

  const dish = props.dish;
  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={500}
        {...panResponder.panHandlers}
        ref={this.handleViewRef}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() => (props.favorite ? console.log("Already favorite") : props.onFavoritePress())}
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={() => props.onCommentPress()}
          />
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating}</Text>
        <Text style={{ fontSize: 12 }}>{"-- " + item.author + ", " + item.date}</Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={500}>
      <Card title="Comments">
        <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
      </Card>
    </Animatable.View>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: null,
      author: "",
      comment: ""
    };
  }

  markFavorite(dishID) {
    this.props.postFavorite(dishID);
  }
  static navigationOptions = {
    title: "Dish Details"
  };

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    const { author, rating, comment } = this.state;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onFavoritePress={() => this.markFavorite(dishId)}
          onCommentPress={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.formRow}>
            <Rating startingValue={3} onFinishRating={rating => this.setState({ rating })}></Rating>
          </View>
          <View style={styles.formRow}>
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChange={e => this.setState({ author: e.target.value })}
            />
          </View>
          <View style={styles.formRow}>
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onChange={e => this.setState({ comment: e.target.value })}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              title="Submit"
              color="#512DA8"
              onPress={() => this.props.postComment(dishId, rating, author, comment, Date.toISOString())}
              accessibilityLabel="Learn more about.."
            />
          </View>
          <View style={styles.formRow}>
            <Button
              title="Cancel"
              color="#eee"
              onPress={() => this.toggleModal()}
              accessibilityLabel="Learn more about.."
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "center",
    margin: 10
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white"
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

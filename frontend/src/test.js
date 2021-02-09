import React from "react";

export default class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      recipeList: [
        {
          recipe: "Tacos",
          directions: "make tacos",
          ingredients: ["meat"]
        },
        {
          recipe: "pizza",
          directions: "bake",
          ingredients: ["dough"]
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  handleSubmit() {
    const newRecipe = this.state.recipelist[0].recipe;
    setState({
      recipeList[0].recipe: newRecipe
    });
  }

  render() {
    const ITEMS = this.state.recipeList.map(({ directions }) => (
      <li>{directions}</li>
    ));
    return (
      <div>
        <EditList
          input={this.state.input}
          handleChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <ul>{ITEMS}</ul>
      </div>
    );
  }
}

class EditList extends React.Component {
  render() {
    return (
      <div>
        <input
          type='text'
          value={this.props.input}
          onChange={this.props.handleChange}
        />
        <button onClick={this.props.onSubmit}>Submit</button>
      </div>
    );
  }
}
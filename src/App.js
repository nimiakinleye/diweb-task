import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Product from "./components/Product";
import Error from "./components/Error";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     category: "women"
  //   }
  // }
  state = {
    category: "all",
    currency: "$",
  };
  changeCategory = (category) => {
    this.setState({
      category,
    });
  };
  changeCurrency = (currency) => {
    this.setState({
      currency,
    });
  };
  render() {
    return (
      <div className="App">
        <Header
          category={this.state.category}
          changeCategory={this.changeCategory}
          currency={this.state.currency}
          changeCurrency={this.changeCurrency}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Category
                category={this.state.category}
                currency={this.state.currency}
              />
            }
          />
          <Route path="/product/:product_id" element={<Product />} />
          {/* <Route path="/category" element={<Categories />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    );
  }
}

export default App;

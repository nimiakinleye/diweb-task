import React from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import Product from "./pages/Product";
import Error from "./components/Error";
import Cart from "./pages/Cart"
import Noty from "./components/Notification";
import { connect } from "react-redux";

class App extends React.PureComponent {
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
          changeCurrency={this.changeCurrency}
        />
        {this.props.noty.display && <Noty body={this.props.noty.body} />}
        <Routes>
          <Route
            path="/"
            element={
              <Category
                category={this.state.category}
              />
            }
          />
          <Route path="/product/:product_id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/category" element={<Categories />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    noty: state.noty,
  })
}

export default connect(mapStateToProps)(App);

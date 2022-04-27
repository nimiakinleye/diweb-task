import { getCurrencies, getCategories } from "../queries";
import { Query } from "@apollo/client/react/components";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Logo from "../assets/logo.svg";
import CartIcon from "../assets/icons/cart.svg";
import Dropdown from "../assets/icons/dropdown.svg";
import CurrencyDropDown from "./CurrencyDropDown";
import CartOverlay from "./CartOverlay";
import { NavLink, Link } from "react-router-dom";

class Header extends React.PureComponent {
  state = {
    showCurrency: false,
    showCartOverlay: false,
  };
  toggleShowCurrency = () => {
    this.setState({
      showCurrency: !this.state.showCurrency,
    });
  };
  toggleShowCart = () => {
    this.setState({
      showCartOverlay: !this.state.showCartOverlay,
    });
  };
  myCurrencyQuery = ({ data, error, loading }) => {
    if (error)
      return (
        <div style={this.currencyStyle} className="currency_dropdown">
          <p>An error occured while fetching currencies</p>
        </div>
      );
    if (loading)
      return (
        <div style={this.currencyStyle} className="currency_dropdown">
          <p>Loading Currencies...</p>
        </div>
      );
    else {
      return (
        <CurrencyDropDown
          currencies={data.currencies}
          changeCurrency={this.props.changeCurrency}
        />
      );
    }
  };
  myQuery = ({ data, loading, error }) => {
    if (error) return <p>An Error Occured while loading categories</p>;
    if (loading) return <p>Loading categories...</p>;
    else {
      return (
        <ul>
          {data.scandiwebCategories.map((category, i) => {
            return (
              <NavLink to="/" key={i} className="no_decoration">
                <li
                  onClick={() => {
                    this.props.changeCategory(category.name);
                  }}
                  className={`uppercase ${
                    this.props.category === category.name ? "active_link" : null
                  }`}
                >
                  {category.name}
                </li>
              </NavLink>
            );
          })}
        </ul>
      );
    }
  };
  currencyStyle = {
    padding: "0 8px",
    fontSize: "16px",
  };

  render() {
    const {
      props,
      toggleShowCurrency,
      myQuery,
      toggleShowCart,
      myCurrencyQuery,
    } = this;
    const { cart, currency } = props;
    return (
      <div className="master_header">
        <div className="header">
          <div>
            <Query query={getCategories}>{myQuery}</Query>
            {/* <ul className="categories">{categoryList}</ul> */}
            <Link className="logo" to="/">
              <img src={Logo} alt="logo" />
            </Link>
            <div className="currency_cart">
              <div>
                <div
                  onMouseEnter={toggleShowCurrency}
                  onMouseLeave={toggleShowCurrency}
                  className="currency cursor_pointer"
                >
                  <span>{currency}</span>
                  <img
                    className={`currency_dropdown_icon ${
                      this.state.showCurrency ? "rotate" : ""
                    }`}
                    src={Dropdown}
                    alt="dropdown"
                  />
                  {this.state.showCurrency && (
                    <Query query={getCurrencies}>{myCurrencyQuery}</Query>
                  )}
                </div>
                <div onClick={toggleShowCart} className="cart cursor_pointer">
                  <img src={CartIcon} alt="cart" />
                  {cart.length > 0 && (
                    <div className="cart_length">{cart.length}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {this.state.showCartOverlay && (
            <CartOverlay toggle={toggleShowCart} />
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  changeCategory: PropTypes.func.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(Header);

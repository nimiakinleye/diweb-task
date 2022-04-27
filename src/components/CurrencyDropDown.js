import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CurrencyDropDown extends React.PureComponent {
  render() {
    const { props } = this;
    const { currencies, changeCurrency } = props;
    return (
      <div className="currency_dropdown">
        {currencies.map((currency) => {
          return (
            <div
              onClick={() => changeCurrency(currency.symbol)}
              className="currency_dropdown_item"
              key={currency.label}
            >
              <span
                style={{ marginRight: "10px" }}
              >{`${currency.symbol} `}</span>
              <span>{currency.label}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

CurrencyDropDown.propTypes = {
  currencies: PropTypes.array.isRequired,
  changeCurrency: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (newCurrency) =>
      dispatch({ type: "CHANGE_CURRENCY", payload: newCurrency }),
  };
};

export default connect(null, mapDispatchToProps)(CurrencyDropDown);

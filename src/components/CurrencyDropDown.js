import React from 'react'
import { connect } from 'react-redux'

class CurrencyDropDown extends React.Component {
  render () {
    return (
      <div className="currency_dropdown">
        { this.props.currencies.map(currency => {
          return (
            <div onClick={() => this.props.changeCurrency(currency.symbol) } className="currency_dropdown_item" key={currency.label}>
              <span style={{marginRight: '10px'}}>{`${currency.symbol} `}</span><span>{currency.label}</span>
            </div>
          )
        }) }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (newCurrency) => dispatch({ type: 'CHANGE_CURRENCY', payload: newCurrency })
  }
}

export default connect(null, mapDispatchToProps)(CurrencyDropDown);
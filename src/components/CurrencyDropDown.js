import React from 'react'

class CurrencyDropDown extends React.Component {
  render () {
    return (
      <div className="currency_dropdown">
        { this.props.currencies.map(currency => {
          return (
            <div onClick={() => { this.props.changeCurrency(currency.symbol) }} className="currency_dropdown_item" key={currency.label}>
              <span style={{marginRight: '10px'}}>{`${currency.symbol} `}</span><span>{currency.label}</span>
            </div>
          )
        }) }
      </div>
    )
  }
}

export default CurrencyDropDown;
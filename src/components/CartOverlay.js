import React from "react";

class CartOverlay extends React.Component {
  render() {
    return (
      <div className="cart_overlay">
        <div className="bag" onClick={this.props.print}>This is the cart overlay</div>
        <div onClick={this.props.toggle} className="modal_env"></div>
      </div>
    );
  }
}

export default CartOverlay;

import React from "react";
import PropTypes from "prop-types";

class Button extends React.PureComponent {
  render() {
    const { props } = this;
    const strokeStyle = {
      border: "1px solid #1D1F22",
      padding: "13px",
      color: "#1D1F22",
    };
    const style = {
      background: "#5ECE7B",
      padding: "13px",
      color: "#fff",
    };
    return (
      <div
        className="button_parent"
        style={props.type === "stroke" ? strokeStyle : style}
      >
        {props.text}
      </div>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Button;

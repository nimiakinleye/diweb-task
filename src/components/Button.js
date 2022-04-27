import React from "react";

class Button extends React.PureComponent {
  render() {
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
        style={this.props.type === "stroke" ? strokeStyle : style}
      >
        {this.props.text}
      </div>
    );
  }
}

export default Button;

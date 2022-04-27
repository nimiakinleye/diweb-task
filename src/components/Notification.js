import React from "react";
import info from "../assets/icons/info.svg";
import PropTypes from "prop-types";

class Noty extends React.PureComponent {
  render() {
    const { body } = this.props;
    return (
      <div className="noty">
        <div>
          <img src={info} alt="" />
          <p className="body">{body}</p>
        </div>
      </div>
    );
  }
}

Noty.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Noty;

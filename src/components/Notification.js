import React from "react";
import info from '../assets/icons/info.svg';

class Noty extends React.PureComponent {
  render() {
    return (
      <div className="noty">
        <div>
          <img src={info} alt="" /><p className="body">{this.props.body}</p>
        </div>
      </div>
    );
  }
}

export default Noty;

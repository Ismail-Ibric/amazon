import React from "react";

class OutsideClickHandler extends React.Component {
  componentDidMount() {
    document
      .addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount(){
    document
      .removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.props.onOutsideClick();
    }
  }

  render() {
    return 
  }
}

export default OutsideClickHandler;
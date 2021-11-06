import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AnimateIcon extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef(); // is still undefined at this point
    this.setWrapperRef = this.setWrapperRef.bind(this);
    //this.animBasket = this.animBasket.bind(this);
    this.onBasketPoping_End = this.onBasketPoping_End.bind(this);
    this.onAddToBasket_Click = this.onAddToBasket_Click.bind(this);

    //console.log( "anim_id::  ", this.props.id );
  }

  componentDidMount() {
    document.addEventListener("transitionend", this.onBasketPoping_End);

    const btn_el = document.querySelector("button[anim_id='" + this.props.anim_id + "']")
    //console.log("btn_el:   ", btn_el, this.props.anim_id);

    btn_el.addEventListener("click", this.onAddToBasket_Click);
  }

  componentWillUnmount() {
    document.removeEventListener("transitionend", this.onBasketPoping_End);

    const btn_el = document.querySelector("button[anim_id='" + this.props.anim_id + "']")
    //console.log("btn_el:   ", btn_el, this.props.anim_id);

    btn_el.removeEventListener("click", this.onAddToBasket_Click);
  }

  setWrapperRef(node) {
    this.wrapperRef = node; // is no longer undefined
  }

  onBasketPoping_End(event) {
    if (this.wrapperRef.contains(event.target))
      this.wrapperRef.classList.toggle("basket-anim");
  }

  onAddToBasket_Click(event) {
    //if (this.wrapperRef.contains(event.target))
      this.wrapperRef.classList.toggle("basket-anim");

    console.log( "onAddToBasket_Click" );
  }

  // animBasket(event) {
  //   this.wrapperRef.classList.toggle("basket-anim");
  // }

  render() {
    return (
      // {...this.props}
      <div ref={this.setWrapperRef} className={this.props.className} >
        {this.props.children}
      </div>
    );
  }
}

AnimateIcon.propTypes = {
  children: PropTypes.element.isRequired,
};

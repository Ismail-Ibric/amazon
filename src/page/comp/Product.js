import React from "react";
import "./Product.css";
//import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import Icon from "@material-ui/core/Icon";
import { useStateValue } from "../../util/StateProvider";
//import OutsideClickHandler from "../../util/OutsideClickHandler";
import AnimateIcon from "../../util/AnimateIcon";

function Product({ id, title, image, price, rating, index }) {
  // eslint-disable-next-line
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (e) => {

    // send Item to State
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        index: index
      },
    });

    const anim_id = e.target.getAttribute('anim_id');
    const anim_id_el = document.querySelector("[anim_id='"+anim_id+"']")
    console.log("anim_id_el:   ", anim_id_el, anim_id);

    // const wrapper = wrapperRef.current;
    // wrapper.classList.toggle("basket-boost");
  };

  // const wrapperRef = React.createRef();

  // function onBasketPoping_Start() {
  // }

  // function onBasketPoping_End() {
  //   const wrapper = wrapperRef.current;
  //   wrapper.classList.toggle("basket-boost");
  // }

  // const mountEventListener_BasketPoping = () => {
  //   window.addEventListener("transitionstart", onBasketPoping_Start);
  //   return window.removeEventListener("transitionend", onBasketPoping_End);
  // };

  // React.useEffect(mountEventListener_BasketPoping, []);

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <span className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </span>
        <span className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        </span>
      </div>
      <img className="product__image" src={image} alt="" />
      {/* <div className="product__BasketIconContainer"> */}
        {/* <ShoppingBasket className="product__BasketIcon" /> */}
        {/* <Icon className="product__StarIcon">shopping_basket</Icon> */}
      {/* </div>      */}
      <button className="product__AddToBasket" onClick={addToBasket} anim_id={index}>
        Add to Basket
      </button>
      
      <AnimateIcon anim_id={index} className="product__BasketIconContainer">
        <Icon className="product__StarIcon">shopping_basket</Icon>
      </AnimateIcon>
      
    </div>
  );
}

export default Product;

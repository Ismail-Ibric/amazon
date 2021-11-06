export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  let data;
  switch (action.type) {
    case "ADD_TO_BASKET":
      data = { ...state, basket: [...state.basket, action.item] };
      //localStorage.setItem("basket", data);
      return data;
    case "SET_USER":
      data = {...state, user: action.user};
      //localStorage.setItem("user", data);
      return data;
    case "EMPTY_BASKET":
      data = {...state, basket: []};
      //localStorage.setItem("basket", data);
      return data;
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      if (action.index >= 0) newBasket.splice(action.index, 1);
      else console.warn(`Can't remove product (id: ${action.id}, action.index: ${action.index}`);
      data = { ...state, basket: newBasket };
      //localStorage.setItem("basket", data);
      return data;
    default:
      return state;
  }
};

// selector that sums up all the amounts
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

export default reducer;

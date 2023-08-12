export const actionType = {
  SET_USER: "SET_USER",
  SET_PRODUCT:"SET_PRODUCT",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ALL_PRODUCT: "SET_ALL_PRODUCT",
  SET_FILTER: "SET_FILTER",
  SET_FILTER_BY_NEW_OLD: "SET_FILTER_BY_NEW_OLD",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_CART_QTY:"SET_CART_QTY",
  SET_CART_PRODUCT:"SET_CART_PRODUCT",
  SET_PRODUCT_INDEX:"SET_PRODUCT_INDEX",
  SET_CARTS:"SET_CARTS"
};

const reducer = (state, action) => {
  switch (action.type) {
        case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
        case actionType.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
        case actionType.SET_CARTS:
      return {
        ...state,
        carts: action.carts,
      };
        case actionType.SET_CART_PRODUCT:
      return {
        ...state,
        carts: action.carts,
      };
      case actionType.SET_CART_QTY:
      return {
        ...state,
        cartQty: action.cartQty,
      };
        case actionType.SET_ALL_PRODUCT:
      return {
        ...state,
        allProduct: action.allProduct,
      };
      case action.SET_ALL_USERS:
        return{
          ...state,
          allUser:action.allUser
        };
       
          case actionType.SET_SEARCH_TERM:
            return {
              ...state,
              searchTerm: action.searchTerm,
            };
          case actionType.SET_FILTER_TERM:
            return {
              ...state,
              filterTerm: action.filterTerm,
            };
          case actionType.SET_FILTER_BY_NEW_OLD:
            return {
              ...state,
              filterByNewOld: action.filterByNewOld,
            };
          case actionType.SET_PRODUCT_INDEX:
            return{
              ...state,
              productIndex: action.productIndex
            }
    default:
      return state;
  }
};

export default reducer;

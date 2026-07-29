import React from "react";
import { cartReducer, State, initialState } from "./cart.reducer";
import { Item, getItem } from "./cart.utils";
import { useLocalStorage } from "@utils/use-local-storage";
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item["id"]) => void;
  // updateItem: (id: Item["id"], payload: object) => void;
  // updateItemQuantity: (id: Item["id"], quantity: number) => void;
  clearItemFromCart: (id: Item["id"]) => void;
  getItemFromCart: (id: Item["id"]) => any | undefined;
  isInCart: (id: Item["id"]) => boolean;
  // updateCartMetadata: (metadata: Metadata) => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

import { toast } from "@utils/toast";

export const CartProvider: React.FC = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    `chawkbazar-cart`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) => {
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
    toast.success("Added to Cart", `${item.name} has been added to your cart.`);
  };
  const removeItemFromCart = (id: Item["id"]) => {
    const item = getItem(state.items, id);
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
    if (item) {
      toast.success("Cart Updated", `Quantity of ${item.name} has been decreased.`);
    }
  };
  const clearItemFromCart = (id: Item["id"]) => {
    const item = getItem(state.items, id);
    dispatch({ type: "REMOVE_ITEM", id });
    if (item) {
      toast.success("Removed from Cart", `${item.name} has been removed.`);
    }
  };
  const isInCart = (id: Item["id"]) => !!getItem(state.items, id);
  const getItemFromCart = (id: Item["id"]) => getItem(state.items, id);
  // const inStock=()=>{}
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
  return <cartContext.Provider value={value} {...props} />;
};

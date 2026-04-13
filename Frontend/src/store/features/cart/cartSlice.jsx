import { createSlice } from "@reduxjs/toolkit";
const loadStateFromLocalStorage = () => {
  try {
    const cartData = window.localStorage.getItem("cart");
    if (cartData == null) {
      return {
        items: [],
      };
    }

    return JSON.parse(cartData); // this line load cart items from local storage if item present there
  } catch (error) {
    console.log("Error while load cart items", error);
    return {
      items: [],
    };
  }
};

const saveStateIntoLocalStorage = (state) => {
  try {
    const cartData = JSON.stringify(state);
    window.localStorage.setItem("cart", cartData);
  } catch (error) {
    console.log("Error while saving item to local storage", error);
  }
};

const initialState = loadStateFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // "we click on add-to-cart Btn so product Item comes & save in item"
      const existingItem = state.items.find((i) => {
        return i.productId == item.productId;
      }); //this item is from localStorage cart items pehle se cart mai hai

      if (existingItem) {
        existingItem.quantity += item.quantity; // only increase quantity if items already exist in cart
      } else {
        state.items.push(item); // if not exist item in cart so push item in cart
      }
      saveStateIntoLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => {
        return item.productId !== itemId; //  matched item ke alawa sab return krdo
      });
      saveStateIntoLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => {
        return item.productId == productId;
      });
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveStateIntoLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

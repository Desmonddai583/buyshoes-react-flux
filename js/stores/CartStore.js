const EventEmitter = require("events");
const dispatcher = require("../AppDispatcher");
import UndoStore from "./UndoStore";

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
}

let _cartItems = {
  // "jameson-vulc": {
  //   id: "jameson-vulc",
  //   quantity: 1,
  // },
};

dispatcher.register((action) => {
  dispatcher.waitFor([UndoStore.undoToken]);
  let handler = handlers[action.type];
  handler && handler(action);
});

let handlers = {
  addCartItem(action) {
    let { productId } = action;
    if (_cartItems[productId]) {
      _cartItems[productId].quantity += 1;
    } else {
      _cartItems[productId] = {
        id: productId,
        quantity: 1,
      }
    }
    emitChange();
  },

  removeCartItem(action) {
    let { productId } = action;
    delete _cartItems[productId];
    emitChange();
  },

  updateCartItemQuantity(action) {
    let { productId, quantity } = action;
    if (!_cartItems[productId]) return;
    if (quantity <= 0) {
      return;
    } else {
      _cartItems[productId].quantity = quantity;
    }
    emitChange();
  },

  undoShoppingCart(action) {
    let { cartItems } = action;
    if(cartItems){
      _cartItems = cartItems;
    }
    emitChange();
  }
}

export default {
  getCartItems() {
    return _cartItems;
  },

  cartItems() {
    return _cartItems;
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  }
}
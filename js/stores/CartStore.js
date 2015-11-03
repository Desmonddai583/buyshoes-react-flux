const EventEmitter = require("events");

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

module.exports = {

  addCartItem(productId) {
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

  removeCartItem(productId) {
    delete _cartItems[productId];
    emitChange();
  },

  updateCartItemQuantity(productId,quantity) {
    if (!_cartItems[productId]) return;
    if (quantity <= 0) {
      return;
    } else {
      _cartItems[productId].quantity = quantity;
    }
    emitChange();
  },

  getCartItems() {
    return _cartItems;
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  },
}

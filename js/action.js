const dispatcher = require("./AppDispatcher");
const LoggingService = require("./Services/LoggingService");

LoggingService()

export function addCartItem(productId) {
  dispatcher.dispatch({type: "addCartItem", productId: productId});
}

export function removeCartItem(productId) {
  dispatcher.dispatch({type: "removeCartItem", productId: productId});
}

export function updateCartItemQuantity(productId, quantity) {
  dispatcher.dispatch({type: "updateCartItemQuantity", productId: productId, quantity: quantity});
}

export function undoShoppingCart(cartItems) {
  dispatcher.dispatch({type: "undoShoppingCart", cartItems: cartItems})
}

export default dispatcher;
import dispatcher from '../AppDispatcher';
import EventEmitter from 'events';
import CartStore from "./CartStore";
import _ from 'lodash';

let emitter = new EventEmitter();
let _history = [];

function emitChange() {
  emitter.emit("change");
}

let undoToken = dispatcher.register((action) => {
  let handler = handlers[action.type];
  handler && handler(action);
});

let handlers = {
  addCartItem(action) {
    _history.push(_.cloneDeep(CartStore.cartItems()));
    emitChange();
  },

  removeCartItem(action) {
    _history.push(_.cloneDeep(CartStore.cartItems()));
    emitChange();
  }
};

export default {
  lastHistoryItems() {
    return _history.pop();
  },

  isHistoryEmpty() {
    return _history.length == 0 ? true : false; 
  },

  undoToken:undoToken,

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  }
}
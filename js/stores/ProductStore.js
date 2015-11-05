const {products} = require("../data");
const LikeStore = require("./LikeStore");
const EventEmitter = require("events");

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
}

let _productItems = products;
let _showOnlyLike = false;

module.exports = {

  getProductItems() {
    return _productItems;
  },

  productItems() {
    return _productItems;
  },

  showOnlyLike() {
    return _showOnlyLike;
  },

  filteredProducts() {
    if(!_showOnlyLike){
      return this.productItems();
    } else {
      let filteredProducts ={};
      let likeItems = LikeStore.likeItems();
      for (let id in _productItems) {
        let item = _productItems[id];
        if(id in likeItems){
          filteredProducts[id]=item;
        }
      };
      return filteredProducts;
    }
  },

  toggleShowOnlyLike() {
    _showOnlyLike=!_showOnlyLike;
    emitChange();
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  },
}
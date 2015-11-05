const React = require("react");
const QuantityControl = require("./QuantityControl");
const CartStore = require("../stores/CartStore");
const ProductStore = require("../stores/ProductStore");
const LikeStore = require("../stores/LikeStore");
const connect = require("./connect");
let {addLikeItem} = LikeStore;
let {addCartItem} = CartStore;

let Product = React.createClass({
  render() {
    let {id,name,price,imagePath} = this.props.product;
    let {likeItems,cartItems} = this.props;
    let item = cartItems[id];

    let productControl;
    if(item != null) {
      let {quantity} = item;
      productControl = (
        <QuantityControl item={item} variant="gray"/>
      );

    } else {
      productControl = (
        <a onClick={addCartItem.bind(null, id)} className="product__add">
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }

    let productHeartImg = likeItems[id]?("img/heart-liked.svg"):("img/heart.svg");
    return (
      <div className="product">

        <div className="product__display">
          <div className="product__img-wrapper">
            <img className="product__img" src={imagePath} />
          </div>

          <div className="product__control">
            {productControl}
          </div>

          <div className="product__price">
            {"$"+price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <a onClick={addLikeItem.bind(null, id)} className="product__like">
            <img className="product__heart" src={productHeartImg} />
          </a>
        </div>
      </div>
    );
  }
});

let Products = React.createClass({
  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },

  renderProducts() {
    let {likeItems,cartItems,filteredProducts} = this.props;
    let productViews = Object.keys(filteredProducts).map(id => {
      let product = filteredProducts[id];
      return (
        <Product key={id} product={product} likeItems={likeItems} cartItems={cartItems}/>
      );
    });

    return productViews;
  },

  render() {
    return (
      <div ref="products" className="products">
        {this.renderProducts()}
      </div>
    );
  },
});

@connect(CartStore,"cartItems")
@connect(LikeStore,"likeItems")
@connect(ProductStore,"filteredProducts")
class ConnectedProducts extends Products {};

module.exports = ConnectedProducts;
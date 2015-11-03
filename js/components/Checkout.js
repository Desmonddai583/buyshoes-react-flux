const React = require("react");
const CartStore = require("../stores/CartStore");
const {products} = require("../data");

let Checkout = React.createClass({
  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },

  render() {
    let cartItems = CartStore.getCartItems();
    let items = Object.keys(cartItems).map((key) => {
      let item = Object.assign({}, cartItems[key]);
      item.price = products[key].price;
      return item;
    });

    let total = items.reduce((prev, currItem) => {
      return prev + currItem.quantity * currItem.price;
    }, 0).toFixed(2);

    return (
      <div className="checkout">
        <hr className="checkout__divider" />

        <input type="text" className="checkout__coupon-input" placeholder="coupon code" />

        {/*
        <div className="checkout__line">
          <div className="checkout__line__label">
            Discount
          </div>
          <div className="checkout__line__amount">
            -$90
          </div>
        </div>
        */}

        <div className="checkout__line">
          <div className="checkout__line__label">
            Subtotal
          </div>
          <div className="checkout__line__amount">
            {`$${total}`}
          </div>
        </div>

        <a className="checkout__button">
          <img className="checkout__button__icon" src="img/cart-icon.svg" />
          <div className="checkout__button__label">
            Checkout
          </div>
        </a>
      </div>
    );
  }
});

module.exports = Checkout;
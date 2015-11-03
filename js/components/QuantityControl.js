const React = require("react");
const CartStore = require("../stores/CartStore");
let {updateCartItemQuantity} = CartStore;

let QuantityControl = React.createClass({
  render() {
    let {variant} = this.props;
    let {id, quantity} = this.props.item;

    let className = "adjust-qty";
    if(variant === "gray") {
      className = "adjust-qty adjust-qty--gray";
    }

    return (
      <div className={className}>
        <a onClick={updateCartItemQuantity.bind(null, id, quantity - 1)} className="adjust-qty__button">-</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a onClick={updateCartItemQuantity.bind(null, id, quantity + 1)} className="adjust-qty__button">+</a>
      </div>
    );
  }
});

module.exports = QuantityControl;
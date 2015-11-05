const React = require("react");
const SiteTitle = require("./SiteTitle");
const Checkout = require("./Checkout");
const Cart = require("./Cart");
const Products = require("./Products");

let App = React.createClass({
  render: function() {
    return (
      <div className="site">
        <div className="bg">
          <div className="bg__img">
          </div>
        </div>

        <div className="site__main">
          <div className="site__left-sidebar">
            <SiteTitle/>
          </div>
          <div className="site__content">
            <Products/>
          </div> 
        </div>
        <div className="site__right-sidebar">
          <Cart/>
          <Checkout/>
        </div> 
        <a className="site__right-sidebar-toggle">
          <img src="img/arrow-icon.svg" />
        </a>
      </div>
    );
  }
});

module.exports = App;
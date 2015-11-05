const React = require("react");
const {toggleShowOnlyLike} = require("../stores/ProductStore");
const ProductStore = require("../stores/ProductStore");
const connect = require("./connect");

let SiteTitle = React.createClass({
  render() {
    let {showOnlyLike} = this.props;
    let src = showOnlyLike?("img/heart-liked.svg"):("img/heart.svg");

    return (
      <div className="title">
        <h2>Buy Me Shoes</h2>
        <img className="title__heart" src={src} onClick={toggleShowOnlyLike.bind(this)}/>
      </div>
    );
  }
});

@connect(ProductStore,"showOnlyLike")
class ConnectedSiteTitle extends SiteTitle{}

module.exports = ConnectedSiteTitle;
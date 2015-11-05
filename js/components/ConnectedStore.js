const React = require("react");

let ConnectedStore = React.createClass({
  componentDidMount() {
    this.props.store.addChangeListener(this.forceUpdate.bind(this));
  },

  render() {
    let contentRenderFunction = this.props.children;
    let Store = Object.assign({}, this.props.store); 
    let storeProps = {}
    for(let key in Store) {
      if(Store.hasOwnProperty(key)) {
        if(this.props.propNames.indexOf(key) > -1) {
          storeProps[key] = Store[key]();
        }
      }
    }

    return contentRenderFunction(storeProps);
  }
});

module.exports = ConnectedStore;
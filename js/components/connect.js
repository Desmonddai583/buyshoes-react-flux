const React = require("react");
const ConnectedStore = require("./ConnectedStore");

function connect(store,...items) {
  return (klass) => {
    let ViewComponent = klass;
 
    let ConnectedViewComponent = React.createClass({
      render(){
        return (
          <ConnectedStore store={store} propNames={items}>
            {propValues => <ViewComponent {...propValues} {...this.props}/>}
          </ConnectedStore>
        );
      }
    });

    let klassReplacement = ConnectedViewComponent;

    return klassReplacement;
  };
}

module.exports=connect;
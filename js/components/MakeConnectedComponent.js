const React = require("react");
const ConnectedStore = require("./ConnectedStore");

function MakeConnectedComponent(ViewComponent,store,...propNames) {
  let ConnectedViewComponent = React.createClass({
    render(){
      return (
        <ConnectedStore store={store} propNames={propNames}>
          {props => <ViewComponent {...props} {...this.props}/>}
        </ConnectedStore>
      );
    }
  });

  return ConnectedViewComponent;
}

module.exports = MakeConnectedComponent;
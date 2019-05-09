import React from "react";

import ClientView from "./ClientView";
import ManipView from "./ManipView";
import AdminView from "./AdminView";

class ContractOrch extends React.Component {
  state = { showView: "client"};





  constructor(props) {

        super(props);
        this.changeViewAdmin = this.changeViewAdmin.bind(this);
        this.changeViewManip = this.changeViewManip.bind(this);
        this.changeViewClient = this.changeViewClient.bind(this);
        this.showView = this.showView.bind(this);
        
  } 

  
  

  changeViewAdmin = e =>{
    if(e) e.preventDefault();
    const showView = "admin";
    this.setState({showView});
  }
  changeViewManip = e =>{
    if(e) e.preventDefault();
    const showView = "manip";
    this.setState({showView});
  }
  changeViewClient = e =>{
    if(e) e.preventDefault();
    const showView = "client";
    this.setState({showView});
  }

  showView = (itemsLength, manipLength) => {
    
    if (this.state.showView === "admin"){

      return (<AdminView drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>);
     
    }else if(this.state.showView === "manip"){

      return (<ManipView drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>);

    }else{

      return (<ClientView drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>);
    }
  }

  render() {

    const { drizzleState } = this.props;
    const ItemFactory = drizzleState.contracts.ItemFactory;
    const ManipFactory = drizzleState.contracts.ManipFactory;

    var manipulatorsLength = ManipFactory.getManipLength[this.state.manipulatorCounterKey];
    var itemsLength = ItemFactory.getItemsLength[this.state.itemCounterKey];

  
    return (
      <div>
      <p><a href="/" onClick={this.changeViewAdmin}>Administrador</a></p>
      <p><a href="/" onClick={this.changeViewManip}>Manipulador</a></p>
      <p><a href="/" onClick={this.changeViewClient}>Cliente</a></p>

      {this.showView(itemsLength, manipulatorsLength)}
        
      </div>
    );
  }
}

export default ContractOrch;
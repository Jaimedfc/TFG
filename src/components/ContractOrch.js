import React from "react";

import ShowManipulators from "./ShowManipulators";
import ShowItems from "./ShowItems";

class ContractOrch extends React.Component {
  state = { manipulatorCounterKey:null,
            createManipulatorId:null,
            itemCounterKey:null};




  componentDidMount() {
    const { drizzle } = this.props;
    const ManipFactory = drizzle.contracts.ManipFactory;
    const ItemFactory = drizzle.contracts.ItemFactory;

    var manipulatorCounterKey;
    var itemCounterKey;
      
    manipulatorCounterKey = ManipFactory.methods["getManipLength"].cacheCall();
    itemCounterKey = ItemFactory.methods["getItemsLength"].cacheCall();
      

    this.setState({ manipulatorCounterKey, itemCounterKey });
    console.log(drizzle);
    console.log(this.props.drizzleState);

  }

  createManipulator = e => {
    if(e) e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ManipFactory;
    const manipName = String(document.getElementById("manipName").value);
    const manipNameLocation = String(document.getElementById("manipNameLocation").value);
    const manipLatitude = parseFloat(document.getElementById("manipLatitude").value);
    const manipLongitude = parseFloat(document.getElementById("manipLongitude").value);
    const manipInfo = String(document.getElementById("manipInfo").value);

    const createManipulatorId = contract.methods["createManipulator"].cacheSend(manipName,manipNameLocation,manipLatitude,manipLongitude,manipInfo, {
      from: drizzleState.accounts[0], gas: 4712388,
        gasPrice: 100000000000
    });

  
    // save the `createConId` for later reference
    this.setState({ createManipulatorId});
     
   };

  render() {

    const { drizzleState } = this.props;
    const ItemFactory = drizzleState.contracts.ItemFactory;
    const ManipFactory = drizzleState.contracts.ManipFactory;

    var manipulatorsLength = ManipFactory.getManipLength[this.state.manipulatorCounterKey];
    var itemsLength = ItemFactory.getItemsLength[this.state.itemCounterKey];
    
  
    return (
      <div>
        <h1>Sección para Admins</h1>
        <h3>Se han creado {(manipulatorsLength && manipulatorsLength.value) || 0} manipuladores.</h3>

        <form onSubmit={this.createManipulator.bind(this)}>
            <p><input id="manipName" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Nombre del manipulador" required/></p>
            <p><input id="manipNameLocation" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Nombre de la localización" required/></p>
            <p><input id="manipLatitude" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Latitud" required/></p>
            <p><input id="manipLongitude" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Longitud" required/></p>
            <p><textarea id="manipInfo" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Información del manipulador" required></textarea></p>
            <input type="submit" value="Crear nuevo manipulador"/> 
        </form>


        <ShowManipulators manipLength={(manipulatorsLength && manipulatorsLength.value) || 0} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
        <ShowItems drizzle={this.props.drizzle}
            drizzleState={this.props.drizzleState}
            isManipulator={false}
            isAdmin={true}
            itemsLength={(itemsLength && itemsLength.value) || 0}
            manipLength={(manipulatorsLength && manipulatorsLength.value) || 0}
        />
        
        <h1>Sección para Manipuladores</h1>
        <ShowItems drizzle={this.props.drizzle}
         drizzleState={this.props.drizzleState}
         isManipulator={true}
         isAdmin={false}
         itemsLength={(itemsLength && itemsLength.value) || 0}
         manipLength={(manipulatorsLength && manipulatorsLength.value) || 0}
        />


        <hr/>

        <h1>Sección para clientes</h1>
        <ShowItems drizzle={this.props.drizzle}
         drizzleState={this.props.drizzleState}
         isManipulator={false}
         itemsLength={(itemsLength && itemsLength.value) || 0}
         manipLength={(manipulatorsLength && manipulatorsLength.value) || 0}
        />
        
      </div>
    );
  }
}

export default ContractOrch;
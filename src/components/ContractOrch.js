import React from "react";

import ShowManipulators from "./ShowManipulators";

class ContractOrch extends React.Component {
  state = { manipulatorCounterKey:null, createManipulatorId:null};




  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.ManipFactory;
    var manipulatorCounterKey;
      
    manipulatorCounterKey = contract.methods["getManipLength"].cacheCall();
      

    this.setState({ manipulatorCounterKey });
    console.log(drizzle);
    console.log(this.props.drizzleState);

  }

  createManipulator = e => {
    if(e) e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ManipFactory;
    const manipName = String(document.getElementById("manipName").value);
    const manipNameLocation = String(document.getElementById("manipNameLocation").value);
    const manipLatitude = Number(document.getElementById("manipLatitude").value);
    const manipLongitude = Number(document.getElementById("manipLongitude").value);
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
    const contract = drizzleState.contracts.ManipFactory;
    var manipulatorsLength = contract.getManipLength[this.state.manipulatorCounterKey];
    
  
    return (
      <div>
        <h2>Sección para Admins</h2>
        <h3>Se han creado {(manipulatorsLength && manipulatorsLength.value) || 0} manipuladores.</h3>

        <form onSubmit={this.createManipulator.bind(this)}>
            <p><input id="manipName" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Nombre del manipulador" required/></p>
            <p><input id="manipNameLocation" type="text" style={{width:"200"}} ref={(element) => { this.input = element }} placeholder="Nombre de la localización" required/></p>
            <p><input id="manipLatitude" type="text" style={{width:"200"}} ref={(element) => { this.input = element }} placeholder="Latitud" required/></p>
            <p><input id="manipLongitude" type="text" style={{width:"200"}} ref={(element) => { this.input = element }} placeholder="Longitud" required/></p>
            <p><textarea id="manipInfo" type="text" style={{width:"200"}} ref={(element) => { this.input = element }} placeholder="Información del manipulador" required></textarea></p>
            <input type="submit" value="Crear nuevo manipulador"/> 
        </form>


        <ShowManipulators manipLength={(manipulatorsLength && manipulatorsLength.value) || 0} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
      </div>
    );
  }
}

export default ContractOrch;
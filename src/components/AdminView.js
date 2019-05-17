import React from "react";
import ItemManager from "./ItemManager";
import ManipulatorManager from "./ManipulatorManager";

class AdminView extends React.Component {


  state = { manipulatorCounterKey:null,
            itemCounterKey:null,
            createManipulatorId:null};


    componentDidMount() {
    const { drizzle } = this.props;
    const ManipFactory = drizzle.contracts.ManipFactory;
    const ItemFactory = drizzle.contracts.ItemFactory;

    var manipulatorCounterKey;
    var itemCounterKey;
      
    manipulatorCounterKey = ManipFactory.methods["getManipLength"].cacheCall();
    itemCounterKey = ItemFactory.methods["getItemsLength"].cacheCall();
      

    this.setState({ manipulatorCounterKey, itemCounterKey });

    }

    createManipulator = e => {
      if(e) e.preventDefault();
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.ManipFactory;
      const manipName = String(document.getElementById("manipName").value);
      const manipNameLocation = String(document.getElementById("manipNameLocation").value);
      const manipLatitudeInt = Number(document.getElementById("manipLatitudeInt").value.trim());
      const manipLongitudeInt = Number(document.getElementById("manipLongitudeInt").value.trim());
      const manipLatitudeDec = Number(document.getElementById("manipLatitudeDec").value.trim());
      const manipLongitudeDec = Number(document.getElementById("manipLongitudeDec").value.trim());
      const manipLatitudeExp = document.getElementById("manipLatitudeDec").value.trim().length;
      const manipLongitudeExp = document.getElementById("manipLongitudeDec").value.trim().length;
      const manipInfo = String(document.getElementById("manipInfo").value);

      const createManipulatorId = contract.methods["createManipulator"].cacheSend(manipName,manipNameLocation,manipLatitudeInt,manipLatitudeDec,manipLatitudeExp,manipLongitudeInt,manipLongitudeDec,manipLongitudeExp,manipInfo, {
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

            <h3>Se han creado {(manipulatorsLength && manipulatorsLength.value) || 0} manipuladores.</h3>

            <form onSubmit={this.createManipulator.bind(this)}>
              <p><label>Nombre: </label><input id="manipName" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Nombre del manipulador" required/></p>
              <p><label>Localización: </label><input id="manipNameLocation" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Nombre de la localización" required/></p>
              <p><label>Latitud: </label><input id="manipLatitudeInt" type="text" ref={(element) => { this.input = element }} placeholder="Parte entera" required/>.<span><input id="manipLatitudeDec" placeholder="Parte decimal" type="text" ref={(element) => { this.input = element }} required/></span></p>
              <p><label>Longitud: </label><input id="manipLongitudeInt" type="text" ref={(element) => { this.input = element }} placeholder="Parte entera" required/>.<span><input id="manipLongitudeDec" placeholder="Parte decimal" type="text" ref={(element) => { this.input = element }} required/></span></p>
              <p><label>Información de interés: </label></p><p><textarea id="manipInfo" type="text" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Información del manipulador" required></textarea></p>
              <input type="submit" value="Crear nuevo manipulador"/> 
            </form>


            <ManipulatorManager manipLength={(manipulatorsLength && manipulatorsLength.value) || 0} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
            <ItemManager drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
              isManipulator={false}
              isAdmin={true}
              itemsLength={(itemsLength && itemsLength.value) || 0}
              manipLength={(manipulatorsLength && manipulatorsLength.value) || 0}
            />
          </div>
        );
    }
};

export default AdminView;
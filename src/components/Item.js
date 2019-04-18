import React from "react";
import ShowRute from "./ShowRute";

class Item extends React.Component {


  state = { itemNameKey: null,
            itemTypeKey: null,
            itemRuteLengthKey: null,
            itemExpirationDateKey: null,
            deleteContractId:null,
            itemIsDeliveredKey:null,
            addVisitKey:[] };


    constructor(props) {

        super(props);
        
        this.deleteContract = this.deleteContract.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.addRuteVisit = this.addRuteVisit.bind(this);
        this.showRute = this.showRute.bind(this);
        this.parseDate = this.parseDate.bind(this);
    } 

    componentDidMount() {

        console.log("==== COMPONENTE ITEM MONTADO ============", this.props.address );

        const { drizzle } = this.props;

        const json = require('../contracts/Item.json');

        if (drizzle.contracts[this.props.address] === undefined){

          const contractConfig = {
             contractName: this.props.address,
             web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.address)
          };

          drizzle.addContract(contractConfig, []);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

        const { drizzle } = this.props;

        const instance = drizzle.contracts[this.props.address];

        if (!instance) return;

        let changed = false;

        let { itemNameKey, itemTypeKey, itemRuteLengthKey, itemExpirationDateKey, itemIsDeliveredKey } = this.state;

        if (!this.state.itemNameKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemNameKey = instance.methods["name"].cacheCall();
            
            changed = true;
        }

        if (!this.state.itemTypeKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemTypeKey = instance.methods["itType"].cacheCall();
            
            changed = true;
        }

        if (!this.state.itemRuteLengthKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemRuteLengthKey = instance.methods["ruteLength"].cacheCall();
            
            changed = true;
        }

        if (!this.state.itemExpirationDateKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemExpirationDateKey = instance.methods["expirationDate"].cacheCall();
            
            changed = true;
        }

        if (!this.state.itemIsDeliveredKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemIsDeliveredKey = instance.methods["isDelivered"].cacheCall();
            
            changed = true;
        }


        if (changed) {
            // Actualizar el estado local
            this.setState({ itemNameKey, itemTypeKey, itemExpirationDateKey, itemRuteLengthKey, itemIsDeliveredKey });
        }
    }

    

    deleteContract(){

      const {drizzle, drizzleState} = this.props;
      const ItemFactory = drizzle.contracts.ItemFactory;
      const deleteContractId = ItemFactory.methods["destroyItem"].cacheSend(this.props.address, {
              from: drizzleState.accounts[0]
          });
      this.setState({ deleteContractId });
      this.props.drizzle.deleteContract(this.props.address);
    }

    showButtons(){
      if(this.props.isManipulator){
        return(<div>
            <form onSubmit={this.addRuteVisit}>
              <p><input id={"manipulator"+this.props.index} min={0} max={this.props.manipulators.length} type="number" style={{width:"200px"}} ref={(element) => { this.input = element }} placeholder="Número de manipulador" required/></p>
              <p>Fecha de Entrada: <input id={"itemDateIn"+this.props.index} type="date" style={{width:"200"}} ref={(element) => { this.input = element }} required/></p>
              <p>(Si es el último hito en la ruta, seleccione cualquier fecha) Fecha de Salida: <input id={"itemDateOut"+this.props.index} type="date" style={{width:"200"}} ref={(element) => { this.input = element }} required/></p>
              <p>(Si es el último hito en la ruta, seleccione cualquier transporte) Tipo de transpote de salida:</p>
                <select name="trsp" id={"trsp"+this.props.index}>
                  <option value={1}> Tierra </option>
                  <option value={2}> Mar </option>
                  <option value={3}> Aire </option>
                </select>

              <p>¿Es el último hito en la ruta?</p>
                <select name="isDelivered" id={"isDelivered"+this.props.index}>
                  <option value={"true"}> Sí </option>
                  <option value={"false"}> No </option>
                </select>
              <input type="submit" value="Crear nuevo hito en la ruta"/> 
            </form>

            <button onClick={this.deleteContract}>Eliminar Item</button>
            <hr/>
          </div>)
      }
    }

    parseDate(input) {
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }

    addRuteVisit(e){

        if(e) e.preventDefault();

        const { drizzle, drizzleState } = this.props;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return null;

        const addVisitKey = [...this.state.addVisitKey];
        let visitKeyItem;

        const manip = (Number(document.getElementById("manipulator"+this.props.index).value))-1;
        let dateIn = this.parseDate(document.getElementById("itemDateIn"+this.props.index).value);
        let dateOut = this.parseDate(document.getElementById("itemDateOut"+this.props.index).value);
        const trsp = Number(document.getElementById("trsp"+this.props.index).value);
        const isDelivered = document.getElementById("isDelivered"+this.props.index).value === "true";

        const manipAddress = this.props.manipulators[manip].value;
        dateIn = dateIn.getTime() * 1000;
        
        dateOut = dateOut.getTime() * 1000;
        
    
        visitKeyItem = instance.methods["addVisit"].cacheSend(manipAddress,dateIn,dateOut,trsp,isDelivered, {
              from: drizzleState.accounts[0], gas: 4712388,
        gasPrice: 100000000000
          });
        addVisitKey.push(visitKeyItem);
        this.setState({addVisitKey});



    }

    showRute(ruteLength){

      if (ruteLength > 0){


        return (<ShowRute address={this.props.address}
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                manipulators={this.props.manipulators}
                ruteLength={ruteLength}/>);
      }else return null;
    }


    render() {

      let itemName = "Waiting";
      let itemType = "Waiting";
      let ruteLength = "Waiting";
      let expirationDate = new Date();
      let isDelivered = "Waiting";


      const instance = this.props.drizzleState.contracts[this.props.address];
        
      if (instance && instance.initialized) {

          itemName = instance.name[this.state.itemNameKey];
          itemName = (itemName && itemName.value) || "??";

          itemType = instance.itType[this.state.itemTypeKey];
          itemType = (itemType && itemType.value) || "??";

          isDelivered = instance.isDelivered[this.state.itemIsDeliveredKey];
          isDelivered = (isDelivered && isDelivered.value) || false;

          if (Number(itemType) === 0){
            itemType = "Animal";
          } else if(Number(itemType) === 1){
            itemType = "Vegetal";
          }else{
            itemType = "Otros";
          }

          ruteLength = instance.ruteLength[this.state.itemRuteLengthKey];
          ruteLength = (ruteLength && ruteLength.value) || 0;

          expirationDate = instance.expirationDate[this.state.itemExpirationDateKey];
          expirationDate = (expirationDate && expirationDate.value) || 0;

          expirationDate = new Date(Number(expirationDate) * 1000);

         



      }

        if (!this.props.isManipulator && !isDelivered){
          return null;
        }else{


          return (
            <div>

              <h2>{"Item número "+(this.props.index + 1)+": "+this.props.address}</h2>
              <ul>
                <li>Su nombre es: {itemName}</li>
                <li>Es un item de tipo: {itemType}</li>
                <li>Caduca el dia <input value={String(expirationDate.getDate())} style={{width:"200px"}} readOnly/> del mes <input value={String(expirationDate.getMonth()+1)} style={{width:"200px"}} readOnly/> del año <input value={String(expirationDate.getFullYear())} style={{width:"200px"}} readOnly/></li>
              </ul>
              {this.showRute(ruteLength)}
              {this.showButtons()}

          </div>
        );
      
    }}
};

export default Item;
import React from "react";
import ShowRute from "./ShowRute";

class Item extends React.Component {


  state = { itemNameKey: null,
            itemTypeKey: null,
            itemRuteLengthKey: null,
            itemExpirationDateKey: null,
            deleteContractId:null,
            addVisitKey:[] };


    constructor(props) {

        super(props);
        
        this.deleteContract = this.deleteContract.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.addRuteVisit = this.addRuteVisit.bind(this)
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

        let { itemNameKey, itemTypeKey, itemRuteLengthKey, itemExpirationDateKey } = this.state;

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


        if (changed) {
            // Actualizar el estado local
            this.setState({ itemNameKey, itemTypeKey, itemExpirationDateKey, itemRuteLengthKey });
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
              <p><input id={"itemDateIn"+this.props.index} type="date" style={{width:"200"}} ref={(element) => { this.input = element }} placeholder="Fecha de entrada" required/></p>
              <p><input id={"itemDateOut"+this.props.index} type="date" style={{width:"200"}} ref={(element) => { this.input = element }} placeholder="Fecha de salida" required/></p>
              <p>Tipo de transpote de salida:</p>
                <select name="trsp" id={"trsp"+this.props.index}
                  <option value="Land"> Tierra </option>
                  <option value="Sea"> Mar </option>
                  <option value="Air"> Aire </option>
                </select>
              <input type="submit" value="Crear nuevo hito en la ruta"/> 
            </form>

            <button onClick={this.deleteContract}>Eliminar Manipulador</button>
          </div>)
      }
    }

    addRuteVisit(e){

        if(e) e.preventDefault();

        const { drizzle } = this.props;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return null;

        const visitKey = [... this.state.visitKey];
        const visitKeyItem;

        const manip = Number(document.getElementById("manipulator"+this.props.index).value);
        const dateIn = document.getElementById("itemDateIn"+this.props.index).value;
        const dateOut = document.getElementById("itemDateOut"+this.props.index).value;
        const trsp = String(document.getElementById("trsp"+this.props.index).value);

        const manipAddress = this.props.manipulators[manip];
        const reference = new Date(2019,1,1);
        const daysDateIn = (dateIn - reference)/(1000*60*60*24);       //days since 1st January 2019
        const daysDateOut = (dateOut - reference)/(1000*60*60*24);       //days since 1st January 2019

        visitKeyItem = instance.methods["addVisit"].cacheSend(manipAddress,daysDateIn,daysDateOut,trsp, {
              from: drizzleState.accounts[0]
          });
        visitKey.push(visitKeyItem);
        this.setState({visitKey});



    }


    render() {

      let itemName = "Waiting";
      let itemType = "Waiting";
      let ruteLength = "Waiting";
      let expirationDate = "Waiting";
      const reference = new Date(2019,1,1);


      const instance = this.props.drizzleState.contracts[this.props.address];
        
      if (instance && instance.initialized) {

          itemName = instance.name[this.state.itemNameKey];
          itemName = (itemName && itemName.value) || "??";

          itemType = instance.itType[this.state.itemTypeKey];
          itemType = (itemType && itemType.value) || "??";

          if (itemType === Animal){
            itemType = "Animal";
          } else if(itemType === Greens){
            itemType = "Vegetal";
          }else{
            itemType = "Otros";
          }

          ruteLength = instance.ruteLength[this.state.itemRuteLengthKey];
          ruteLength = (ruteLength && ruteLength.value) || 0;

          let expirationDateDays = instance.expirationDate[this.state.itemExpirationDateKey];
          expirationDateDays = (expirationDateDays && expirationDateDays.value) || "??";

          expirationDate = reference + (expirationDateDays*1000*60*60*24);



      }

        return (
          <div>

            <h1>{"Item número "+(this.props.index + 1)+": "+this.props.address}</h1>
            <ul>
              <li>Su nombre es: {itemName}</li>
              <li>Es un item de tipo: {itemType}</li>
              <li>A seguido la siguiente ruta:</li>
              <li><ShowRute address={this.props.address}
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                manipulators={manipulators}
                ruteLength={ruteLength}/></li>
            </ul>
            <p>{showButtons()}</p>

          </div>
        );
    }
};

export default Item;
import React from "react";
import ShowRoute from "./ShowRoute";
import { Container, Row, Col } from 'reactstrap';


class Item extends React.Component {


  state = { itemNameKey: null,
            itemTypeKey: null,
            itemRouteLengthKey: null,
            itemExpirationDateKey: null,
            deleteContractId:null,
            itemIsDeliveredKey:null,
            addVisitKey:[],
            showRoute: false };


    constructor(props) {

        super(props);
        
        this.deleteContract = this.deleteContract.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.addRouteVisit = this.addRouteVisit.bind(this);
        this.showRoute = this.showRoute.bind(this);
        this.parseDate = this.parseDate.bind(this);
        this.changeStateRoute = this.changeStateRoute.bind(this);
    } 

    componentDidMount() {

        console.log("==== COMPONENTE ITEM MONTADO ============", this.props.address );

        const { drizzle } = this.props;
        const instance = drizzle.contracts[this.props.address];
        const json = require('../contracts/Item.json');

        if (instance === undefined){

          const contractConfig = {
             contractName: this.props.address,
             web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.address)
          };

          drizzle.addContract(contractConfig, []);
        }
        if (!instance) return;

        let changed = false;

        let { itemNameKey, itemTypeKey, itemRouteLengthKey, itemExpirationDateKey, itemIsDeliveredKey } = this.state;

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

        if (!this.state.itemRouteLengthKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemRouteLengthKey = instance.methods["routeLength"].cacheCall();
            
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
            this.setState({ itemNameKey, itemTypeKey, itemExpirationDateKey, itemRouteLengthKey, itemIsDeliveredKey });
        }
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

        const { drizzle } = this.props;

        const instance = drizzle.contracts[this.props.address];

        if (!instance) return;

        let changed = false;

        let { itemNameKey, itemTypeKey, itemRouteLengthKey, itemExpirationDateKey, itemIsDeliveredKey } = this.state;

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

        if (!this.state.itemRouteLengthKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            itemRouteLengthKey = instance.methods["routeLength"].cacheCall();
            
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
            this.setState({ itemNameKey, itemTypeKey, itemExpirationDateKey, itemRouteLengthKey, itemIsDeliveredKey });
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
          <h3>Crear nuevo hito en la ruta</h3>
            <form onSubmit={this.addRouteVisit}>
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
                  <option value={"false"}> No </option>
                  <option value={"true"}> Sí </option>
                </select>
              <input type="submit" value="Crear nuevo hito en la ruta"/> 
            </form>
            <hr/>
          </div>)
      }else if(this.props.isAdmin){

        return(<div>
            <button onClick={this.deleteContract}>Eliminar Item</button>
            <hr/>
          </div>)
      }else{
        return null;
      }
    }

    parseDate(input) {
      var parts = input.match(/(\d+)/g);
      return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
    }

    addRouteVisit(e){

        if(e) e.preventDefault();

        const { drizzle, drizzleState } = this.props;
        const instance = drizzle.contracts[this.props.address];

        if (!instance) return null;

        const addVisitKey = [...this.state.addVisitKey];
        let visitKeyItem;

        const manip = (Number(document.getElementById("manipulator"+this.props.index).value))-1;
        let dateIn = this.parseDate(String(document.getElementById("itemDateIn"+this.props.index).value));
        let dateOut = this.parseDate(String(document.getElementById("itemDateOut"+this.props.index).value));
        const trsp = Number(document.getElementById("trsp"+this.props.index).value);
        const isDelivered = document.getElementById("isDelivered"+this.props.index).value === "true";

        const manipAddress = this.props.manipulators[manip].value;
        dateIn = dateIn.getTime();
        
        dateOut = dateOut.getTime();
        
    
        visitKeyItem = instance.methods["addVisit"].cacheSend(manipAddress,dateIn,dateOut,trsp,isDelivered, {
              from: drizzleState.accounts[0], gas: 4712388,
        gasPrice: 100000000000
          });
        addVisitKey.push(visitKeyItem);
        this.setState({addVisitKey});



    }

    showRoute(routeLength){

      if ( routeLength>0 && this.state.showRoute){


        return (<ShowRoute address={this.props.address}
                drizzle={this.props.drizzle} 
                drizzleState={this.props.drizzleState}
                manipulators={this.props.manipulators}
                routeLength={routeLength}/>);
      }else return null;
    }

    changeStateRoute(e){
      if(e) e.preventDefault();
      let showRoute=false;
      if (this.state.showRoute){
        showRoute=false;
        this.setState({showRoute});
      }else {
        showRoute=true;
        this.setState({showRoute});
      }
      
    }


    render() {

      let itemName = "Waiting";
      let itemType = "Waiting";
      let routeLength = "Waiting";
      let expirationDate = new Date();
      let isDelivered = "Waiting";
      let showRouteState = this.state.showRoute;
      const mL = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];



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

          routeLength = instance.routeLength[this.state.itemRouteLengthKey];
          routeLength = (routeLength && routeLength.value) || 0;

          expirationDate = instance.expirationDate[this.state.itemExpirationDateKey];
          expirationDate = (expirationDate && expirationDate.value) || 0;

          expirationDate = new Date(Number(expirationDate));

         



      }

        if (!this.props.isManipulator && !isDelivered && !this.props.isAdmin){
          return (
            <Container>
              <h4>Lo sentimos, este producto no esta disponible en estos momentos.</h4>
            </Container>
          );
        }else{


          return (
            <div>

              <h2>{"Item número "+(this.props.index + 1)+": "+this.props.address}</h2>
              <ul>
                <li>Su nombre es: {itemName}</li>
                <li>Es un item de tipo: {itemType}</li>
                <li>Caduca el dia <input value={String(expirationDate.getDate())} style={{width:"200px"}} readOnly/> del mes <input value={mL[expirationDate.getMonth()]} style={{width:"200px"}} readOnly/> del año <input value={String(expirationDate.getFullYear())} style={{width:"200px"}} readOnly/></li>
              </ul>
              <form onSubmit={this.changeStateRoute}>
                <input type="submit" value="Mostrar/Ocultar ruta"/>
              </form>
              {this.showRoute(routeLength)}
              {this.showButtons()}
              

          </div>
        );
      
    }}
};

export default Item;
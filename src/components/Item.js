import React from "react";
import ShowRoute from "./ShowRoute";
import { Container, Row, Col, Media, Form, Button, Input, FormGroup, Label, FormText } from 'reactstrap';


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
        return(<Container>
          <h3>Crear nuevo hito en la ruta</h3>
            <Form onSubmit={this.addRouteVisit}>
              <FormGroup>
                <Label>Manipulador</Label>
                <Input id={"manipulator"+this.props.index} min={0} max={this.props.manipulators.length} type="number" ref={(element) => { this.input = element }} placeholder="Número de manipulador" required/>
                </FormGroup>
              <FormGroup>
                <Label>Fecha de Entrada</Label> 
                <Input id={"itemDateIn"+this.props.index} type="date" ref={(element) => { this.input = element }} required/>
              </FormGroup>
              <FormGroup>
                <Label>Fecha de Salida</Label>
                <Input id={"itemDateOut"+this.props.index} type="date" ref={(element) => { this.input = element }} required/>
                <FormText>Si es el último hito en la ruta, seleccione cualquier fecha</FormText>
              </FormGroup>
              <FormGroup>
                <Label>Tipo de transpote de salida</Label>
                <Input type="select" name="trsp" id={"trsp"+this.props.index}>
                  <option value={1}> Tierra </option>
                  <option value={2}> Mar </option>
                  <option value={3}> Aire </option>
                </Input>
                <FormText>Si es el último hito en la ruta, seleccione cualquier transporte</FormText>
              </FormGroup>
              <FormGroup>
                <Label>¿Es el último hito en la ruta?</Label>
                <Input type="select" name="isDelivered" id={"isDelivered"+this.props.index}>
                  <option value={"false"}> No </option>
                  <option value={"true"}> Sí </option>
                </Input>
              </FormGroup>
              <Button type="submit" outline color="primary">Crear nuevo hito en la ruta</Button> 
            </Form>
            <hr/>
          </Container>)
      }else if(this.props.isAdmin){

        return(<Container>
            <Button outline color="danger" onClick={this.deleteContract}>Eliminar Item</Button>
            <hr/>
          </Container>)
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
              <h4 className="subrayar pointer" onClick={this.props.click} >Lo sentimos, este producto no esta disponible en estos momentos.</h4>
            </Container>
          );
        }else{

          if(itemType === "Animal"){

            return (
              <Media>
                <Media left href="#">
                  <Media object src="img/animal.jpg" alt="Carne" onClick={this.props.click} className="pointer rounded-circle"/>
                </Media>
                <Media body className="marginLeft">
                  <Media heading onClick={this.props.click} className="pointer subrayar">
                    {"Producto número "+(this.props.index + 1)+": "+itemName}
                  </Media>
                  <ul>
                  <li>Caduca el dia <Input plaintext value={String(expirationDate.getDate())} /> del mes <Input plaintext value={String(mL[expirationDate.getMonth()])}/> del año <Input plaintext value={String(expirationDate.getFullYear())}/></li>
                </ul>
                <Form onSubmit={this.changeStateRoute}>
                  <Button type="submit" outline color="primary">Mostrar/Ocultar ruta</Button> 
                </Form>
                {this.showRoute(routeLength)}
                {this.showButtons()}
                </Media>                
            </Media>
          );
          }else if(itemType === "Vegetal"){

            return (
              <Media>
                <Media left href="#">
                  <Media object src="./img/greens.jpg" alt="Cultivo" onClick={this.props.click} className="pointer rounded-circle"/>
                </Media>
                <Media body className="marginLeft">
                  <Media heading onClick={this.props.click} className="pointer subrayar">
                    {"Producto número "+(this.props.index + 1)+": "+itemName}
                  </Media>
                  <ul>
                  <li><Input plaintext value={"Caduca el dia "+String(expirationDate.getDate())+" del mes "+String(mL[expirationDate.getMonth()])+" del año "+String(expirationDate.getFullYear())} /></li>
                </ul>
                <Form onSubmit={this.changeStateRoute}>
                  <Button type="submit" outline color="primary">Mostrar/Ocultar ruta</Button> 
                </Form>
                {this.showRoute(routeLength)}
                {this.showButtons()}
                </Media>                
            </Media>
          );
          }else{

            return (
              <Media>
                <Media left href="#">
                  <Media object src="img/animal.jpg" alt="Carne" onClick={this.props.click} className="pointer rounded-circle"/>
                </Media>
                <Media body className="marginLeft">
                  <Media heading onClick={this.props.click} className="pointer subrayar">
                    {"Producto número "+(this.props.index + 1)+": "+itemName}
                  </Media>
                  <ul>
                  <li><Input plaintext value={"Caduca el dia "+String(expirationDate.getDate())+" del mes "+String(mL[expirationDate.getMonth()])+" del año "+String(expirationDate.getFullYear())} readOnly/></li>
                </ul>
                <Form onSubmit={this.changeStateRoute}>
                  <Button type="submit" outline color="primary">Mostrar/Ocultar ruta</Button> 
                </Form>
                {this.showRoute(routeLength)}
                {this.showButtons()}
                </Media>                
            </Media>
          );
          }
          
      
    }}
};

export default Item;
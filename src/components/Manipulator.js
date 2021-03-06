import React from "react";
import { Media, Button } from 'reactstrap';

class Manipulator extends React.Component {


  state = { manipulatorNameKey: null,
            manipulatorLocationNameKey: null,
            manipulatorLocationKey: null,
            manipulatorInfoKey: null,
            deleteContractId:null };


    constructor(props) {

        super(props);
        
        this.deleteContract = this.deleteContract.bind(this);
        this.calcGeoLocation = this.calcGeoLocation.bind(this);
        this.showButton = this.showButton.bind(this);
    } 

    componentDidMount() {


        const { drizzle } = this.props;
        const instance = drizzle.contracts[this.props.address];

        const json = require('../contracts/Manipulator.json');
        
        if (instance === undefined){
          const contractConfig = {
             contractName: this.props.address,
             web3Contract: new drizzle.web3.eth.Contract(json.abi, this.props.address)
          };

          drizzle.addContract(contractConfig, []);

        }


        if (!instance) return;

        let changed = false;

        let { manipulatorNameKey, manipulatorLocationNameKey, manipulatorInfoKey, manipulatorLocationKey } = this.state;

        if (!this.state.manipulatorNameKey) {
            manipulatorNameKey = instance.methods["name"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorLocationNameKey) {
            manipulatorLocationNameKey = instance.methods["locationName"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorInfoKey) {
            manipulatorInfoKey = instance.methods["info"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorLocationKey) {
            manipulatorLocationKey = instance.methods["location"].cacheCall();
            
            changed = true;
        }


        if (changed) {
            this.setState({ manipulatorNameKey, manipulatorLocationNameKey, manipulatorLocationKey, manipulatorInfoKey });
        }
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

        const { drizzle } = this.props;

        const instance = drizzle.contracts[this.props.address];

        if (!instance) return;

        let changed = false;

        let { manipulatorNameKey, manipulatorLocationNameKey, manipulatorInfoKey, manipulatorLocationKey } = this.state;

        if (!this.state.manipulatorNameKey) {
            manipulatorNameKey = instance.methods["name"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorLocationNameKey) {
            manipulatorLocationNameKey = instance.methods["locationName"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorInfoKey) {
            manipulatorInfoKey = instance.methods["info"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorLocationKey) {
            manipulatorLocationKey = instance.methods["location"].cacheCall();
            
            changed = true;
        }


        if (changed) {
            this.setState({ manipulatorNameKey, manipulatorLocationNameKey, manipulatorLocationKey, manipulatorInfoKey });
        }
    }


    showButton(){
      if(this.props.isAdmin){
        return (<Button onClick={this.deleteContract} outline color="danger">Eliminar manipulador</Button>)
      }else return null;
    }

    calcGeoLocation(_num, _exp){
      const num = Number(_num);
      const exp = Number(_exp);
      return num*Math.pow(10, -1*exp);
      
      
    }

    deleteContract(){

      const {drizzle, drizzleState} = this.props;
      const manipFactory = drizzle.contracts.ManipFactory;
      const deleteContractId = manipFactory.methods["destroyManipulator"].cacheSend(this.props.address, {
              from: drizzleState.accounts[0]
          });
      this.setState({ deleteContractId });
      this.props.drizzle.deleteContract(this.props.address);
    }


    render() {

      let manipulatorName = "Waiting";
      let manipulatorLocationName = "Waiting";
      let manipulatorInfo = "Waiting";
      let manipulatorLocation = "Waiting";
      let latitude = 0;
      let longitude = 0;

      const instance = this.props.drizzleState.contracts[this.props.address];
        
      if (instance && instance.initialized) {

          manipulatorName = instance.name[this.state.manipulatorNameKey];
          manipulatorName = (manipulatorName && manipulatorName.value) || "??";

          manipulatorLocationName = instance.locationName[this.state.manipulatorLocationNameKey];
          manipulatorLocationName = (manipulatorLocationName && manipulatorLocationName.value) || "??";

          manipulatorInfo = instance.info[this.state.manipulatorInfoKey];
          manipulatorInfo = (manipulatorInfo && manipulatorInfo.value) || "??";

          manipulatorLocation = instance.location[this.state.manipulatorLocationKey];
          manipulatorLocation = (manipulatorLocation && manipulatorLocation.value) || "??";
          latitude = this.calcGeoLocation(manipulatorLocation.latNum, manipulatorLocation.latExp);
          longitude = this.calcGeoLocation(manipulatorLocation.longNum, manipulatorLocation.longExp)


      }

        return (
          <Media>
            <Media left href="#">
              <Media object src="img/edificio.jpg" alt="Manipulador" onClick={this.props.click} className="pointer rounded-circle"/>
            </Media>
            <Media body className="marginLeft">
              <Media heading onClick={this.props.click} className="pointer subrayar">
              {"Manipulador número "+(this.props.index + 1)+": "+manipulatorName}
              </Media>
              <ul>
                <li>Se sitúa en: {manipulatorLocationName}.  <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/search/?api=1&query="+String(latitude)+","+String(longitude)}>Mostrar en el mapa</a></li>
                <li>Información adicional: {manipulatorInfo}</li>
              </ul>
              {this.showButton()}
            </Media>
          </Media>
        );
    }
};

export default Manipulator;




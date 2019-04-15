import React from "react";

class Manipulator extends React.Component {


  state = { manipulatorNameKey: null,
            manipulatorLocationNameKey: null,
            manipulatorLocationKey: null,
            manipulatorInfoKey: null,
            deleteContractId:null };


    constructor(props) {

        super(props);
        
        this.deleteContract = this.deleteContract.bind(this);
    } 

    componentDidMount() {

        console.log("==== COMPONENTE Manipulator MONTADO ============", this.props.address );

        const { drizzle } = this.props;

        const json = require('../contracts/Manipulator.json');
        
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

        let { manipulatorNameKey, manipulatorLocationNameKey, manipulatorInfoKey, manipulatorLocationKey } = this.state;

        if (!this.state.manipulatorNameKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            manipulatorNameKey = instance.methods["name"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorLocationNameKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            manipulatorLocationNameKey = instance.methods["locationName"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorInfoKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            manipulatorInfoKey = instance.methods["info"].cacheCall();
            
            changed = true;
        }

        if (!this.state.manipulatorLocationKey) {
            // Decirle a drizzle que queremos observar el metodo getState().
            manipulatorLocationKey = instance.methods["location"].cacheCall();
            
            changed = true;
        }


        if (changed) {
            // Actualizar el estado local
            this.setState({ manipulatorNameKey, manipulatorLocationNameKey, manipulatorLocationKey, manipulatorInfoKey });
        }
    }


    // changeItem = e => {
    //     if(e) e.preventDefault();
    //     const { drizzle, drizzleState } = this.props;
    //     const contract = drizzle.contracts.Factory;
    //     const id = "modifContract"+ this.props.index;
    //     const item = String(document.getElementById(id).value);
        
    //     const setGoodId = contract.methods["setItem"].cacheSend(item,this.props.address, {
    //          from: drizzleState.accounts[0]
    //      });
          
            
    //     this.setState({ setGoodId });
        
        
    // };
    

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

      }

        return (
          <div>

            <h2>{"Manipulador número "+(this.props.index + 1)+": "+this.props.address}</h2>
            <ul>
              <li>Su nombre es: {manipulatorName}</li>
              <li>Su localización es: {manipulatorLocationName} 
                  ({manipulatorLocation.lat},{manipulatorLocation.long})</li>
              <li>Información: {manipulatorInfo}</li>
            </ul>
            <button onClick={this.deleteContract}>Eliminar Manipulador</button>

          </div>
        );
    }
};

export default Manipulator;




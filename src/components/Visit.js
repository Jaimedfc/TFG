import React from "react";

class Visit extends React.Component {


  state = { };


    constructor(props) {

        super(props);
        this.showVisit = this.showVisit.bind(this);
        
    } 

    componentDidMount() {

      
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

    
    }

    showVisit(manipulatorAddress, dateIn, dateOut, trsp){

      if(this.props.index === 0){
        return(<div>
              <p>Su manipulador está en la dirección :</p> <input value={manipulatorAddress} style={{width:"200"}} readOnly/>
              <p>Su fecha de nacimiento/plantación es:</p> <input value={dateIn} style={{width:"200"}} readOnly/>
              <p>"Su fecha de salida es:"+ <span><input value={"El día "+dateOut.getDay()+ " del mes "+ dateOut.getMonth()+" del año "+dateOut.getFullYear()} style={{width:"200"}} readOnly/></span> + " por " + <span><input value={trsp} style={{width:"200"}} readOnly/></span></p>
            </div>);
      }else if(this.props.index === (this.props.visitsLength-1)){
        return(<div>
              <p>Su manipulador está en la dirección :</p> <input value={manipulatorAddress} style={{width:"200"}} readOnly/>
              <p>Su fecha de entrada es:</p> <input value={"El día "+dateIn.getDay()+ " del mes "+ dateIn.getMonth()+" del año "+dateIn.getFullYear()} style={{width:"200"}} readOnly/>
            <hr/>
            </div>);
      }else{
        return(<div>
              <p>Su manipulador está en la dirección :</p> <input value={manipulatorAddress} style={{width:"200"}} readOnly/>
              <p>Su fecha de entrada es:</p> <input value={"El día "+dateIn.getDay()+ " del mes "+ dateIn.getMonth()+" del año "+dateIn.getFullYear()} style={{width:"200"}} readOnly/>
              <p>"Su fecha de salida es:"+ <span><input value={"El día "+dateOut.getDay()+ " del mes "+ dateOut.getMonth()+" del año "+dateOut.getFullYear()} style={{width:"200"}} readOnly/></span> + " por " + <span><input value={trsp} style={{width:"200"}} readOnly/></span></p>
            </div>);
      }
    }



    render() {

      let manipulatorAddress = this.props.manipulator;
      let dateIn = this.props.dateIn;
      let dateOut = this.props.dateOut;
      let trsp = this.props.trsp;

      let reference = new Date(2019,1,1);
      reference = reference.getTime();
      dateIn = reference + (dateIn*1000*60*60*24);
      dateIn = new Date(dateIn);
      dateOut = reference + (dateOut*1000*60*60*24);
      dateOut = new Date(dateOut);


        return (
          <div>

            <h3>{"Hito en la ruta número "+(this.props.index + 1)}</h3>
            {this.showVisit(manipulatorAddress,dateIn,dateOut,trsp)}
          </div>
        );
    }
};

export default Visit;
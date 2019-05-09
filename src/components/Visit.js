import React from "react";

class Visit extends React.Component {


  //state = { };


    constructor(props) {

        super(props);
        this.showVisit = this.showVisit.bind(this);
        
    } 

    //componentDidMount() {

      
    //}


    //componentDidUpdate(prevProps, prevState, snapshoot) {

    
    //}

    showVisit(manipulatorAddress, _dateIn, _dateOut, trsp){

      let dateIn = Number(_dateIn);
      dateIn = new Date(dateIn);
      const dateOut = new Date(Number(_dateOut));
      let _trsp;
      const mL = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      if (Number(trsp) === 0){
            _trsp = "Tierra";
          } else if(Number(trsp) === 1){
            _trsp = "Mar";
          }else{
            _trsp = "Aire";
          }

      if(this.props.index === 0){
        return(<div>
              <p>Su manipulador está en la dirección :</p> <input value={manipulatorAddress} style={{width:"200px"}} readOnly/>
              <p>Su fecha de nacimiento/plantación es:</p> <input value={"El día "+dateIn.getDate()+ " de "+ mL[dateIn.getMonth()]+" del año "+dateIn.getFullYear()} style={{width:"400px"}} readOnly/>
              <p>Su fecha de salida es: <span><input value={"El día "+dateOut.getDate()+ " de "+ mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()} style={{width:"400px"}} readOnly/></span>   por   <span><input value={_trsp} style={{width:"200"}} readOnly/></span></p>
            </div>);
      }else if(this.props.index === (this.props.visitsLength-1)){
        return(<div>
              <p>Su manipulador está en la dirección :</p> <input value={manipulatorAddress} style={{width:"200px"}} readOnly/>
              <p>Su fecha de entrada es:</p> <input value={"El día "+dateIn.getDate()+ " de "+ mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()} style={{width:"400px"}} readOnly/>
            <hr/>
            </div>);
      }else{
        return(<div>
              <p>Su manipulador está en la dirección :</p> <input value={manipulatorAddress} style={{width:"200px"}} readOnly/>
              <p>Su fecha de entrada es:</p> <input value={"El día "+dateIn.getDate()+ " de "+ mL[dateIn.getMonth()]+" del año "+dateOut.getFullYear()} style={{width:"400px"}} readOnly/>
              <p>Su fecha de salida es: <span><input value={"El día "+dateOut.getDate()+ " de "+mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()} style={{width:"400px"}} readOnly/></span>  por  <span><input value={_trsp} style={{width:"200"}} readOnly/></span></p>
            </div>);
      }
    }



    render() {



        return (
          <div>

            <h3>{"Hito en la ruta número "+(this.props.index + 1)}</h3>
            {this.showVisit(this.props.manipulator,this.props.dateIn,this.props.dateOut,this.props.trsp)}
          </div>
        );
    }
};

export default Visit;
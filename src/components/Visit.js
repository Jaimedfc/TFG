import React from "react";

class Visit extends React.Component {


  state = { };


    constructor(props) {

        super(props);
        
    } 

    componentDidMount() {

      
    }


    componentDidUpdate(prevProps, prevState, snapshoot) {

    
    }



    render() {

      let manipulatorAddress = this.props.manipulator;
      let dateIn = this.props.dateIn;
      let dateOut = this.props.dateOut;
      let trsp = this.props.trsp;

      const reference = new Date(2019,1,1);
      dateIn = reference + (dateIn*1000*60*60*24);
      dateOut = reference + (dateOut*1000*60*60*24);


        return (
          <div>

            <h3>{"Hito en la ruta número "+(this.props.index + 1)}</h3>
            <ul>
              <li>Su manipulador está en la dirección : {manipulatorAddress}</li>
              <li>Su fecha de llegada es: {dateIn}</li>
              {dateOut && (<li>{("Su fecha de salida es:"+ dateOut + " por " + trsp)}</li>)}
            </ul>
          </div>
        );
    }
};

export default Visit;
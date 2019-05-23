import React from "react";
import {Container, Input} from 'reactstrap';
import ShowManipulator from "./ShowManipulator";

class Visit extends React.Component {



    constructor(props) {

        super(props);
        this.showVisit = this.showVisit.bind(this);
        
    } 

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
        if(this.props.type === "Animal"){
          return(<Container>
            <ul>
              <li>
                <p>Manipulado por:</p>
                <ShowManipulator isAdmin={false} key={"Visita"+this.props.index} address={manipulatorAddress} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
              </li>
              <li><Input plaintext value={"Animal nacido el "+dateIn.getDate()+ " de "+mL[dateIn.getMonth()]+" del año "+dateIn.getFullYear()}/></li>
              <li><Input plaintext value={"El manipulador lo transportó el "+dateOut.getDate()+ " de "+mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear() + " por " +_trsp}/></li>
            </ul>
            <hr/>
        </Container>);
        }else if(this.props.type === "Vegetal"){
          return(<Container>
            <ul>
              <li>
                <p>Manipulado por:</p>
                <ShowManipulator isAdmin={false} key={"Visita"+this.props.index} address={manipulatorAddress} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
              </li>
              <li><Input plaintext value={"Cultivo plantado el "+dateIn.getDate()+ " de "+mL[dateIn.getMonth()]+" del año "+dateIn.getFullYear()}/></li>
              <li><Input plaintext value={"El manipulador lo transportó el "+dateOut.getDate()+ " de "+mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()+ " por " +_trsp}/></li>
            </ul>
            <hr/>
        </Container>);
        }else{
          return(<Container>
            <ul>
              <li>
                <p>Manipulado por:</p>
                <ShowManipulator isAdmin={false} key={"Visita"+this.props.index} address={manipulatorAddress} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
              </li>
              <li><Input plaintext value={"Objeto producido el "+dateIn.getDate()+ " de "+mL[dateIn.getMonth()]+" del año "+dateIn.getFullYear()}/></li>
              <li><Input plaintext value={"El manipulador lo transportó el "+dateOut.getDate()+ " de "+mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()+ " por " +_trsp}/></li>
            </ul>
            <hr/>
        </Container>);
        }
        
      }else if(this.props.index === (this.props.visitsLength-1)){
        return(<Container>
                <ul>
                  <li><p>Manipulado por:</p>
                  <ShowManipulator isAdmin={false} key={"Visita"+this.props.index} address={manipulatorAddress} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/></li>
                  <li><Input plaintext value={"El manipulador lo recibió el "+dateOut.getDate()+ " de "+mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()}/></li>
                </ul>
            <hr/>
            </Container>);
      }else{
        return(<Container>
              <ul>
              <li>
                <p>Manipulado por:</p>
                <ShowManipulator isAdmin={false} key={"Visita"+this.props.index} address={manipulatorAddress} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
              </li>
              <li><Input plaintext value={"El manipulador lo recibió el "+dateIn.getDate()+ " de "+mL[dateIn.getMonth()]+" del año "+dateIn.getFullYear()}/></li>
              <li><Input plaintext value={"El manipulador lo transportó el "+dateOut.getDate()+ " de "+mL[dateOut.getMonth()]+" del año "+dateOut.getFullYear()+ " por " +_trsp}/></li>
            </ul>
            <hr/>
            </Container>);
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

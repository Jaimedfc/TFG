import React from "react";
import ItemManager from "./ItemManager";
import ManipulatorManager from "./ManipulatorManager";
import { Container, Form, FormGroup, Label, Row, Col, Button, Input } from "reactstrap";

class AdminView extends React.Component {


  state = {
    manipulatorCounterKey: null,
    itemCounterKey: null,
    createManipulatorId: null
  };


  componentDidMount() {
    const { drizzle } = this.props;
    const ManipFactory = drizzle.contracts.ManipFactory;
    const ItemFactory = drizzle.contracts.ItemFactory;

    var manipulatorCounterKey;
    var itemCounterKey;

    manipulatorCounterKey = ManipFactory.methods["getManipLength"].cacheCall();
    itemCounterKey = ItemFactory.methods["getItemsLength"].cacheCall();


    this.setState({ manipulatorCounterKey, itemCounterKey });

  }

  createManipulator = e => {
    if (e) e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.ManipFactory;
    const manipName = String(document.getElementById("manipName").value);
    const manipNameLocation = String(document.getElementById("manipNameLocation").value);
    const latitude = document.getElementById("manipLatitude").value.trim();
    const longitude = document.getElementById("manipLongitude").value.trim();
    let manipLatitude;
    let manipLongitude;
    let manipLatitudeExp;
    let manipLongitudeExp;
    if(latitude.includes(".")){
      manipLatitudeExp = latitude.split(".",2)[1].length;
      manipLatitude = Number(latitude.split(".",2)[0].trim() + latitude.split(".",2)[1].trim());
    }else if (latitude.includes(",")) {
      manipLatitudeExp = latitude.split(",",2)[1].length;
      manipLatitude = Number(latitude.split(",",2)[0].trim() + latitude.split(",",2)[1].trim());
    } else {
      manipLatitude = Number(latitude);
      manipLatitudeExp = 0;
    }

    if(longitude.includes(".")){
      manipLongitudeExp = longitude.split(".",2)[1].length;
      manipLongitude = Number(longitude.split(".",2)[0].trim() + longitude.split(".",2)[1].trim());
    }else if (longitude.includes(",")) {
      manipLongitudeExp = longitude.split(",",2)[1].length;
      manipLongitude = Number(longitude.split(",",2)[0].trim() + longitude.split(",",2)[1].trim());
    } else {
      manipLongitude = Number(longitude);
      manipLongitudeExp = 0;
    }
    
    const manipInfo = String(document.getElementById("manipInfo").value);

    const createManipulatorId = contract.methods["createManipulator"].cacheSend(manipName, manipNameLocation, manipLatitude, manipLatitudeExp, manipLongitude, manipLongitudeExp, manipInfo, {
      from: drizzleState.accounts[0], gas: 4712388,
      gasPrice: 100000000000
    });

    this.setState({ createManipulatorId });

  };



  render() {

    const { drizzleState } = this.props;
    const ItemFactory = drizzleState.contracts.ItemFactory;
    const ManipFactory = drizzleState.contracts.ManipFactory;

    var manipulatorsLength = ManipFactory.getManipLength[this.state.manipulatorCounterKey];
    var itemsLength = ItemFactory.getItemsLength[this.state.itemCounterKey];


    return (
      <Container fluid>

        <h3 className="margins">Se han creado {(manipulatorsLength && manipulatorsLength.value) || 0} manipuladores.</h3>

        <Form onSubmit={this.createManipulator.bind(this)} className="formBox">
          <FormGroup>
            <Label>Nombre </Label>
            <Input type="text" id="manipName" placeholder="Nombre del manipulador" required />
          </FormGroup>
          <FormGroup>
            <Label>Localización </Label>
            <Input type="text" id="manipNameLocation" placeholder="Nombre de la localización" required />
          </FormGroup>
          <FormGroup>
            <Label>Latitud</Label>
            <Input type="text" id="manipLatitude" placeholder="Latitud" required />
          </FormGroup>
          <FormGroup>
            <Label>Longitud</Label>
            <Input type="text" id="manipLongitude" placeholder="Longitud" required />
          </FormGroup>
          <FormGroup>
            <Label>Información adicional</Label>
            <Input type="text" id="manipInfo" placeholder="Información del manipulador" required />
          </FormGroup>
          <Button type="submit">Crear nuevo manipulador</Button>
        </Form>

        <h4 className="margins">Manipuladores:</h4>
        <ManipulatorManager manipLength={(manipulatorsLength && manipulatorsLength.value) || 0} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        <h4 className="margins">Productos:</h4>
        <ItemManager drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          isManipulator={false}
          isAdmin={true}
          itemsLength={(itemsLength && itemsLength.value) || 0}
          manipLength={(manipulatorsLength && manipulatorsLength.value) || 0}
        />
      </Container>
    );
  }
};

export default AdminView;
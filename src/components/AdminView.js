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
    const manipLatitudeInt = Number(document.getElementById("manipLatitudeInt").value.trim());
    const manipLongitudeInt = Number(document.getElementById("manipLongitudeInt").value.trim());
    const manipLatitudeDec = Number(document.getElementById("manipLatitudeDec").value.trim());
    const manipLongitudeDec = Number(document.getElementById("manipLongitudeDec").value.trim());
    const manipLatitudeExp = document.getElementById("manipLatitudeDec").value.trim().length;
    const manipLongitudeExp = document.getElementById("manipLongitudeDec").value.trim().length;
    const manipInfo = String(document.getElementById("manipInfo").value);

    const createManipulatorId = contract.methods["createManipulator"].cacheSend(manipName, manipNameLocation, manipLatitudeInt, manipLatitudeDec, manipLatitudeExp, manipLongitudeInt, manipLongitudeDec, manipLongitudeExp, manipInfo, {
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
          <Row form>
            <Col>
              <FormGroup>
                <Label>Latitud (Parte entera)</Label>
                <Input type="text" id="manipLatitudeInt" placeholder="Parte entera" required />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Latitud (Parte decimal)</Label>
                <Input type="text" id="manipLatitudeDec" placeholder="Parte decimal" required />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col>
              <FormGroup>
                <Label>Longitud (Parte entera)</Label>
                <Input type="text" id="manipLongitudeInt" placeholder="Parte entera" required />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label> Longitud (Parte decimal)</Label>
                <Input type="text" id="manipLongitudeDec" placeholder="Parte decimal" required />
              </FormGroup>
            </Col>
          </Row>
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
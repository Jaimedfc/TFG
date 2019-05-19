import React from "react";
import QRCode from "qrcode.react";
import Item from "./Item";
import { Container, Row, Col } from 'reactstrap';

class ShowItem extends React.Component {


  state = { showItem:false };


    constructor(props) {

        super(props);
        
        this.showItem = this.showItem.bind(this);
    } 


    showItem(e){
        if(e) e.preventDefault();
        let showItem;
        if (this.state.showItem) {
            showItem=false;
            this.setState( {showItem});
        }else{
            showItem=true;
            this.setState( {showItem});
        }
    }



    render() {
        if(this.state.showItem){
            return(
                <Container fluid className="margins">
                    <Row>
                        <Col md="12">
                        <Item key={"item"+this.props.index} 
                            address={this.props.address}
                            index={this.props.index} 
                            drizzle={this.props.drizzle} 
                            drizzleState={this.props.drizzleState}
                            manipulators={this.props.manipulators}
                            isManipulator={this.props.isManipulator}
                            isAdmin={this.props.isAdmin}
                            click={this.showItem}/>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
                );
        }else{

            return (
          
              <Container className="pointer margins" onClick={this.showItem} fluid>
              <Row>
                    <Col md="3" sm="12">
                        <QRCode value={this.props.address}/>
                    </Col>
                    <Col md="9">
                        <h2 className="subrayar">{"Producto número "+(this.props.index + 1)+"."}</h2>
                    </Col>
                </Row>
                <hr/>
              </Container>
        );
    }
    }
};

export default ShowItem;
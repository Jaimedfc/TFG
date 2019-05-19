import React from "react";
import QRCode from "qrcode.react";
import Manipulator from "./Manipulator";
import { Container, Row, Col } from 'reactstrap';

class ShowManipulator extends React.Component {


  state = { showManip:false };


    constructor(props) {

        super(props);
        
        this.showManip = this.showManip.bind(this);
    } 


    showManip(e){
        if(e) e.preventDefault();
        let showManip;
        if (this.state.showManip) {
            showManip=false;
            this.setState( {showManip});
        }else{
            showManip=true;
            this.setState( {showManip});
        }
    }



    render() {
        if(this.state.showManip){
            return(
                <Container className="margins">
                    <Row>
                        <Col md="auto">
                            <Manipulator click={this.showManip} key={"manip"+this.props.index} address={this.props.address} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
                        </Col>
                    </Row>
                    <hr/>
                </Container>
                );
        }else{

            return (
          
              <Container className="pointer margins" onClick={this.showManip}>
              <Row>
                    <Col md="4" sm="12">
                        <QRCode value={this.props.address}/>
                    </Col>
                    <Col md="8">
                        <h2 className="subrayar">{"Manipulador número "+(this.props.index + 1)+". "}</h2>
                    </Col>
                </Row>
                <hr/>
              </Container>
        );
    }
    }
};

export default ShowManipulator;
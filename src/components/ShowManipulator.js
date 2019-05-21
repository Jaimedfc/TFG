import React from "react";
import QRCode from "qrcode.react";
import Manipulator from "./Manipulator";
import { Container, Row, Col } from 'reactstrap';

class ShowManipulator extends React.Component {


  state = { showManip:false };


    constructor(props) {

        super(props);
        
        this.showManip = this.showManip.bind(this);
        this.showHR = this.showHR.bind(this);
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

    showHR(){
        if(this.props.isAdmin){
            return (<hr/>)
        }else return null;
    }



    render() {
        if(this.state.showManip){
            return(
                <Container className="margins" fluid>
                    <Row>
                        <Col md="auto">
                            <Manipulator isAdmin={this.props.isAdmin} click={this.showManip} key={"manip"+this.props.index} address={this.props.address} index={this.props.index} drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}/>
                        </Col>
                    </Row>
                    {this.showHR()}
                </Container>
                );
        }else{

            return (
          
              <Container className="pointer margins" onClick={this.showManip} fluid>
              <Row>
                    <Col md="3" sm="12">
                        <QRCode value={this.props.address}/>
                    </Col>
                    <Col md="9">
                        <h2 className="subrayar">{"Manipulador número "+(this.props.index + 1)+". "}</h2>
                    </Col>
                </Row>
                {this.showHR()}
              </Container>
        );
    }
    }
};

export default ShowManipulator;
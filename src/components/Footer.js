import React from 'react';
import {
  Container,
    Row,
    Col } from 'reactstrap';

class Footer extends React.Component {

  
  render() {
    if(this.props.view === "admin"){
        return (
          <div id="mainFooter" className="main-footer">
            <Container fluid>
                <Row>
                    <Col className="brief text-center" md="4">
                        <div className="header"><img id="imgFooter" src="img/AdminFooter.png" alt="Admin View" width="200"/></div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </Col>
                    <Col className="contact" md="4">
                        <div className="header">
                            <h6>Contacto</h6>
                        </div>
                        <ul className="contact list-unstyled">
                            <li><span className="icon-map text-primary">Dirección: </span>Calle Esta, Las Rozas de Madrid 28232, Madrid(España)  </li>
                            <li><a href="mailto:jaime.frutos.cerezo@alumnos.upm.es"><span className="icon-phone text-primary">e-mail: </span>jaime.frutos.cerezo@alumnos.upm.es</a></li>
                            <li><span className="icon-mail text-primary">Tlfn: </span>123 45 67 89</li>
                            <li><span className="icon-printer text-primary">Fax: </span>333-999-666</li>
                        </ul>
                    </Col>
                    <Col className="newsletter" md="4">
                        <div className="header">
                            <h6>Noticias</h6>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmo.</p>
                    </Col>
                </Row>
                <ul className="social list-inline">
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Instagram"><i className="fa fa-instagram"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Google plus"><i className="fa fa-google-plus"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Skype"><i className="fa fa-skype"></i></a></li>
                </ul>
            </Container>
            <div className="copyrights">
                <Container>
                    <Row>
                        <Col md="5">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Policy Privacy</a></li>
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Terms of Use</a></li>
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Contact</a></li>
                            </ul>
                        </Col>
                        <Col md="7">
                            <p className="mb-0">© 2019 Company: Las Rozas.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        );
    }else if(this.props.view === "manip"){
        return (
            <div id="mainFooter" className="main-footer">
            <Container fluid>
                <Row>
                    <Col className="brief text-center" md="4">
                        <div className="header"><img id="imgFooter" src="img/ManipFooter.png" alt="Manipulator View" width="200"/></div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </Col>
                    <Col className="contact" md="4">
                        <div className="header">
                            <h6>Contacto</h6>
                        </div>
                        <ul className="contact list-unstyled">
                            <li><span className="icon-map text-primary">Dirección: </span>Calle Esta, Las Rozas de Madrid 28232, Madrid(España)  </li>
                            <li><a href="mailto:jaime.frutos.cerezo@alumnos.upm.es"><span className="icon-phone text-primary">e-mail: </span>jaime.frutos.cerezo@alumnos.upm.es</a></li>
                            <li><span className="icon-mail text-primary">Tlfn: </span>123 45 67 89</li>
                            <li><span className="icon-printer text-primary">Fax: </span>333-999-666</li>
                        </ul>
                    </Col>
                    <Col className="newsletter" md="4">
                        <div className="header">
                            <h6>Noticias</h6>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmo.</p>
                    </Col>
                </Row>
                <ul className="social list-inline">
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Instagram"><i className="fa fa-instagram"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Google plus"><i className="fa fa-google-plus"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Skype"><i className="fa fa-skype"></i></a></li>
                </ul>
            </Container>
            <div className="copyrights">
                <Container>
                    <Row>
                        <Col md="5">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Policy Privacy</a></li>
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Terms of Use</a></li>
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Contact</a></li>
                            </ul>
                        </Col>
                        <Col md="7">
                            <p className="mb-0">© 2019 Company: Las Rozas.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
          );
    }else{
        return (
            <div id="mainFooter" className="main-footer">
            <Container fluid>
                <Row>
                    <Col className="brief text-center" md="4">
                        <div className="header"><img id="imgFooter" src="img/ClientFooter.png" alt="Client View" width="200"/></div>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </Col>
                    <Col className="contact" md="4">
                        <div className="header">
                            <h6>Contacto</h6>
                        </div>
                        <ul className="contact list-unstyled">
                            <li><span className="icon-map text-primary">Dirección: </span>Calle Esta, Las Rozas de Madrid 28232, Madrid(España)  </li>
                            <li><a href="mailto:jaime.frutos.cerezo@alumnos.upm.es"><span className="icon-phone text-primary">e-mail: </span>jaime.frutos.cerezo@alumnos.upm.es</a></li>
                            <li><span className="icon-mail text-primary">Tlfn: </span>123 45 67 89</li>
                            <li><span className="icon-printer text-primary">Fax: </span>333-999-666</li>
                        </ul>
                    </Col>
                    <Col className="newsletter" md="4">
                        <div className="header">
                            <h6>Noticias</h6>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmo.</p>
                    </Col>
                </Row>
                <ul className="social list-inline">
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Instagram"><i className="fa fa-instagram"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Google plus"><i className="fa fa-google-plus"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}} target="_blank" title="Skype"><i className="fa fa-skype"></i></a></li>
                </ul>
            </Container>
            <div className="copyrights">
                <Container>
                    <Row>
                        <Col md="5">
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Policy Privacy</a></li>
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Terms of Use</a></li>
                                <li className="list-inline-item"><a href="/" onClick={e => {if(e) e.preventDefault();}}>Contact</a></li>
                            </ul>
                        </Col>
                        <Col md="7">
                            <p className="mb-0">© 2019 Company: Las Rozas.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
          );
    }
}
}
export default Footer;
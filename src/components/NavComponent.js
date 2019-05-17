
import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container } from 'reactstrap';

class NavComponent extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if(this.props.view === "admin"){
        return (
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/"><img src="img/AdminLogo.png" alt="Admin View"/></NavbarBrand>
              <Container fluid className="text-center justify-content-md-center"><h1 className="">Sección para Administradores</h1></Container>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="#" className="text-primary" onClick={this.props.changeViewClient}>Cliente</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" className="text-primary" onClick={this.props.changeViewAdmin}>Administrador</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" className="text-primary" onClick={this.props.changeViewManip}>Manipulador</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }else if(this.props.view === "manip"){
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><img src="img/ManipLogo.png" alt="Manipulator View"/></NavbarBrand>
                <Container fluid className="text-center justify-content-md-center"><h1 className="">Sección para Manipuladores</h1></Container>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="#" className="text-primary" onClick={this.props.changeViewClient}>Cliente</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" className="text-primary" onClick={this.props.changeViewAdmin}>Administrador</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" className="text-primary" onClick={this.props.changeViewManip}>Manipulador</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
    }else{
        return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/"><img src="img/ClientLogo.png" alt="Client View"/></NavbarBrand>
                <Container fluid className="text-center justify-content-md-center"><h1 className="mb-0">Sección para Clientes</h1></Container>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="#" className="text-primary" onClick={this.props.changeViewClient}>Cliente</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" className="text-primary" onClick={this.props.changeViewAdmin}>Administrador</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" className="text-primary" onClick={this.props.changeViewManip}>Manipulador</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
    }
}
}
export default NavComponent;

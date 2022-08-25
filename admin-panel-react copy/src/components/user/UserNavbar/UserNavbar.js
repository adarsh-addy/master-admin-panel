// import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../Navbar/navbar.css'


export default function UserNavbar() {
    let navigate = useNavigate();
    function logOut(){
      localStorage.removeItem("token");
      navigate("/login")
    
    }
    
      return (
        <>
          {[false].map((expand) => (
            <Navbar key={expand} bg="info" expand={expand} className="">
              <Container fluid>
                <Navbar.Brand href="/userdashboard">User Panel</Navbar.Brand>
                {/* <Form className="d-flex ">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-primary"><strong>Search</strong></Button>
              </Form> */}
                <button type="button" className="btn btn-primary"onClick={logOut}>Logout</button>
    
    
                
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <a href="/userdashboard" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>User</h3>
                    </a>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="position-relative">
                            <img className="rounded-circle" src="img/user.jpg" alt="" style={{width: '40px', height: '40px'}}/>
                            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                        </div>
                        <div className="ms-3">
                            <h6 className="mb-0">User</h6>
                            <span>Panel</span>
                        </div>
                    </div>
                    
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <hr/>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/usercontent">Home</Nav.Link>
                      <Nav.Link href="/usercustomerdetails">User Customer details</Nav.Link>
                      <Nav.Link href="/userengineer">Engineer Master</Nav.Link>
                      <Nav.Link href="/userleadview">Leadview/Modify</Nav.Link>
                      <Nav.Link href="/userplace">Place</Nav.Link>
                      <Nav.Link href="/usercity">City</Nav.Link>
                     
                      {/* <Nav.Link href="/login">Admin Dashboard</Nav.Link> */}
                      {/* <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="/signup">Signup</Nav.Link> */}
                      {/* <Nav.Link href="#action2">Link</Nav.Link>
                      <NavDropdown
                        title="Dropdown"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                          Another action
                        </NavDropdown.Item> */}
                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                          Something else here
                        </NavDropdown.Item>
                      </NavDropdown> */}
                    </Nav>
                    <Form className="d-flex">
                      {/* <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      /> */}
                      {/* <Button variant="outline-success">Search</Button> */}
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          )
          
          )}
    
    
        </>
      );
    }

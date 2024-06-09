import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { authActions } from '../../../Store'; 

function ColorSchemesExample() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token); 

  const handleAddBookClick = () => {
    router.push('/AddBook');
  };

  const handleLogoutClick = () => {
    dispatch(authActions.loggedOut()); 
    router.push('/Login'); // Redirect to login page
  };

  // Conditionally render the Navbar based on the presence of the token
  return token ? (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => router.push('/home')}>BookCart</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => router.push('/books')}>Books</Nav.Link>
          <Nav.Link onClick={handleAddBookClick}>Add Books</Nav.Link>
          <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  ) : null; // If no token, return null to not render the Navbar
}

export default ColorSchemesExample;

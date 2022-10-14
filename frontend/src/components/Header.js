import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import logo from '../assets/thinkers_logo.png'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    localStorage.cartItems = []
  }

  return (
    <header>
      <Navbar
        bg='light'
        expand='lg'
        collapseOnSelect
        className='py-2'
        sticky='top'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src={logo}
                alt='logo'
                width='45'
                height='45'
                className='d-inline-block align-top'
              ></img>
              <span className='navbar-brand-name'>Thinker's Coffee Beans</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='nav-links-align-right'>
              <LinkContainer to='/cart' className='border-right'>
                <Nav.Link className='nav-links-spacer'>
                  <i className='fas fa-shopping-cart'></i>
                  Cart&nbsp;&nbsp;&nbsp;&nbsp;
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  className='mx-3'
                  title={userInfo.name}
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='nav-links-spacer'>
                    <i className='fas fa-user'></i>Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={<i className='fa-solid fa-screwdriver-wrench'></i>}
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productList'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

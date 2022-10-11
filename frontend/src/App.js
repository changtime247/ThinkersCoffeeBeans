import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { HomePage } from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import { Container } from 'react-bootstrap'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/UserListPage'
import UserEditPage from './pages/UserEditPage'
import ProductListPage from './pages/ProductListPage'
import ProductEditPage from './pages/ProductEditPage'
import OrderListPage from './pages/OrderListPage'
import NotFoundPage from './pages/NotFoundPage'
import AboutUsPage from './pages/AboutUsPage'

const App = () => {
  return (
    <Router>
      <div id='all-pages-background'>
        <Header />
        {/* <main className='pt-2 pb-5'> */}
        <main>
          <Container className='margin-x-auto'>
            <Routes>
              <Route path='/order/:id' element={<OrderPage />} />
              <Route path='/shipping' element={<ShippingPage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/placeOrder' element={<PlaceOrderPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart'>
                <Route index element={<CartPage />} />
                <Route path=':id' element={<CartPage />} />
              </Route>
              <Route path='/admin/userList' element={<UserListPage />} />
              <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
              <Route path='/admin/orderList' element={<OrderListPage />} />
              <Route
                path='/admin/productList'
                element={<ProductListPage />}
                exact
              />
              <Route
                path='/admin/productList/:pageNumber'
                element={<ProductListPage />}
                exact
              />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditPage />}
              />
              <Route path='/search/:search' element={<HomePage />} exact />
              <Route path='/page/:pageNumber' element={<HomePage />} exact />
              <Route
                path='/search/:search/page/:pageNumber'
                element={<HomePage />}
                exact
              />
              <Route path='/aboutUs' element={<AboutUsPage />} />
              <Route path='/' element={<HomePage />} exact />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

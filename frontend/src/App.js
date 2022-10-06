import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { HomePage } from './screens/HomePage'
import ProductPage from './screens/ProductPage'
import CartPage from './screens/CartPage'
import { Container } from 'react-bootstrap'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import ProfilePage from './screens/ProfilePage'
import ShippingPage from './screens/ShippingPage'
import PaymentPage from './screens/PaymentPage'
import PlaceOrderPage from './screens/PlaceOrderPage'
import OrderPage from './screens/OrderPage'
import UserListPage from './screens/UserListPage'
import UserEditPage from './screens/UserEditPage'
import ProductListPage from './screens/ProductListPage'
import ProductEditPage from './screens/ProductEditPage'
import OrderListPage from './screens/OrderListPage'
import NotFoundPage from './screens/NotFoundPage'
import AboutUsPage from './screens/AboutUsPage'

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

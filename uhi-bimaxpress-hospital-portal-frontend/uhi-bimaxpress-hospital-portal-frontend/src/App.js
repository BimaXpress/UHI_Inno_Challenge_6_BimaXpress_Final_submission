import React from 'react';
import Login from './containers/shared/login';
import Loader from './containers/shared/loader';
import SideNavbar from './containers/shared/sideNavbar';
import Navbar from './containers/shared/navbar';
import AuthProvider from './containers/context';
import Home from './containers/home';
import Mail from './containers/mail';
import Profile from './containers/profile';
import AddNewCase from './containers/addNewCase';
import EmpanelledCompanies from './containers/empanelledCompanies';
import OrderDetails from './containers/orderDetails';
import CaseBucket from './containers/caseBucket';
import Logistics from './containers/logistics';
import styleScroll from './scrollbar.module.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  var page = window.location.href;

  return (
    <>
      <Loader />
      <div className='flex h-screen'>
        <AuthProvider>
          <div className='w-full flex bg-baseColor overflow-hidden'>
            <div>{!page.includes('login') && <SideNavbar />}</div>
            <div
              className={`flex flex-col h-auto w-full ${styleScroll.customScroll} overflow-y-scroll`}
            >
              {!page.includes('login') && <Navbar />}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                {/* Multiple Routes for mails */}
                <Route path={'/mail/:category/:page'} element={<Mail />} />
                <Route path={'/detailMail/:messageId'} element={<Mail />} />
                <Route path='/userDetails/:category' element={<Profile />} />
                <Route
                  path='/empanelledCompanies'
                  element={<EmpanelledCompanies />}
                />
                // logistics flow route
                <Route path='/orderDetails' element={<OrderDetails />} />
                // Basic auth route
                <Route path='/login' element={<Login />} />
                // Cases flow route
                <Route path='/addNewCase' element={<AddNewCase />} />
                <Route path='/' element={<Home />} />
                <Route path='/addNewCase' element={<AddNewCase />} />
                <Route path='/newCase/:id' element={<AddNewCase />} />
                <Route path='/orderDetails' element={<OrderDetails />} />
                <Route path='/login' element={<Login />} />
                <Route path='/caseBucket/:bucket' element={<CaseBucket />} />
                <Route path='/orders/:category' element={<Logistics />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;

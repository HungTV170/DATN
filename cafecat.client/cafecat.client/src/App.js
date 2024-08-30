// App.js

import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom';
import PagesError404 from './pages/pages-error-404';
import PagesLogin from './pages/pages-login';
import PagesRegister from './pages/pages-register';
import PagesAdminHome from './pages/pages-admin-home/pages-admin-home';
import PrivateRoute from './services/private-route-services';
import UserProfile from './pages/pages-admin-home/users-profile';
import {IPageBuilder}  from './helper/IPageBuilder';
import Dashboard from './pages/pages-admin-home/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={process.env.REACT_APP_PATH_HOME} />}  />
        <Route path={process.env.REACT_APP_PATH_HOME} element={<PrivateRoute element={PagesAdminHome} />}>
          <Route path="" element={<Navigate to={process.env.REACT_APP_DASHBOARD} />}  />
          <Route path={process.env.REACT_APP_DASHBOARD}  element={<Dashboard />}  />
          <Route path={process.env.REACT_APP_COMPONENT_PROFILE}  element={<UserProfile />}  />
          {/* <Route path={process.env.REACT_APP_COMPONENT_CUSTOMER} element={<Customer />} >
            <Route index element={<All />} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<Detail />} />
          </Route> */}
          <Route path={process.env.REACT_APP_COMPONENT_CUSTOMER} element={<IPageBuilder opt="Customer" type="All"/>} >
            <Route index element={<IPageBuilder opt="Customer" type="List"/>} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<IPageBuilder opt="Customer" type="Detail"/>} />
          </Route>
          <Route path={process.env.REACT_APP_COMPONENT_TABLE} element={<IPageBuilder opt="Table" type="All"/>} >
            <Route index element={<IPageBuilder opt="Table" type="List"/>} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<IPageBuilder opt="Table" type="Detail"/>} />
          </Route>
          <Route path={process.env.REACT_APP_COMPONENT_MENU} element={<IPageBuilder opt="Menu" type="All"/>} >
            <Route index element={<IPageBuilder opt="Menu" type="List"/>} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<IPageBuilder opt="Menu" type="Detail"/>} />
          </Route>
          <Route path={process.env.REACT_APP_COMPONENT_ORDER} element={<IPageBuilder opt="Order" type="All"/>} >
            <Route index element={<IPageBuilder opt="Order" type="List"/>} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<IPageBuilder opt="Order" type="Detail"/>} />
          </Route>
          <Route path={process.env.REACT_APP_MENU_ORDER} element={<IPageBuilder opt="OrderMenu" type="All"/>} >
            <Route index element={<IPageBuilder opt="OrderMenu" type="List"/>} />
          </Route>
          <Route path={process.env.REACT_APP_COMPONENT_EMPLOYEE} element={<IPageBuilder opt="Employee" type="All"/>} >
            <Route index element={<IPageBuilder opt="Employee" type="List"/>} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<IPageBuilder opt="Employee" type="Detail"/>} />
          </Route>
          <Route path={process.env.REACT_APP_COMPONENT_RESERVATION} element={<IPageBuilder opt="Reservation" type="All"/>} >
            <Route index element={<IPageBuilder opt="Reservation" type="List"/>} />
            <Route path={`${process.env.REACT_APP_COMPONENT_DETAIL}/:id`} element={<IPageBuilder opt="Reservation" type="Detail"/>} />
          </Route>

        </Route>
        <Route path={process.env.REACT_APP_PATH_LOGIN} element={<PagesLogin />} />
        <Route path={process.env.REACT_APP_PATH_REGISTER} element={<PagesRegister />} />

        <Route path="*" element={<PagesError404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

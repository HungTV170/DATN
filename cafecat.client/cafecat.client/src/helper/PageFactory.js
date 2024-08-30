import List from './list/List';
import Detail from './detail/Detail';

import CustomerDetail from './detail/customerDetail';
import CustomerList from './list/customerList';
import CustomerOpt from './options/CustomerOptions';

import TableList from './list/tableList';
import TableDetail from './detail/tableDetail';
import TableOpt from './options/TableOptions';

import MenuOpt from './options/MenuOptions';
// import MenuList from './list/menuList';
import MenuList from './list/menuList';
import menuDetail from './detail/menuDetail';


import OrderOpt from './options/OrderOptions';
import OrderList from './list/orderList';
import OrderDetail from './detail/orderDetail';

import OrderMenu from '../pages/pages-admin-home/Order/OrderMenu';

import EmpOpt from './options/EmployeeOptions';
import EmpList from './list/employeeList';
import EmpDetail from './detail/employeeDetail';

import ReserOpt from './options/reservationOptions';
import ReserList from './list/reservationList';
import ReserDetail from './detail/reservationDetail';
import {Outlet} from 'react-router-dom';


export const Factory = () => {

  const CreateStyle = (type) =>{
    let options={}; 
    switch(type){
      case "Customer" :    
        options.detail = CustomerDetail; 
        options.list = CustomerList;
        break;
      case "Table" : 
        options.detail = TableDetail;
        options.list = TableList;
        break;
      case "Menu" :
        options.detail = menuDetail;
        options.list = MenuList;
        break;
      case "Order" :
        options.detail = OrderDetail;
        options.list = OrderList;
        break;
      case "OrderMenu" :
        options.list = OrderMenu;
        break;
      case "Employee" :
        options.list = EmpList;
        options.detail = EmpDetail;
        break;
      case "Reservation" :
        options.list = ReserList;
        options.detail = ReserDetail;
        break;
      default : options = {};
    }
    return options;
  }
  const CreateOption = (type) => {
    let options;
    switch(type){
      case "Customer" : options = CustomerOpt ;break;
      case "Table" : options = TableOpt;break;
      case "Menu" : options = MenuOpt;break;
      case "Order" : options = OrderOpt;break;
      case "OrderMenu" : options = MenuOpt;break;
      case "Employee" : options = EmpOpt;break;
      case "Reservation" : options = ReserOpt;break;
      default : options = null;
    }
    return options;
  };

  const All = () => {
    return <Outlet />;
  };

  return {
    CreateStyle,
    CreateOption,
    List,
    Detail,
    All
  };
};

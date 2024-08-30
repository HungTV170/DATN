import { Link, useLocation } from 'react-router-dom';

const Aside = () => {
  const location = useLocation(); 

  const isActive = (path) => location.pathname.includes(path);

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item ">
          <Link
            to={process.env.REACT_APP_DASHBOARD}
            className={`nav-link ${isActive(process.env.REACT_APP_DASHBOARD) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-house-door"></i>
            <span>TỔNG QUAN</span>
          </Link>
        </li>

        <li className="nav-heading">Chức Năng</li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_MENU_ORDER}
            className={`nav-link ${isActive(process.env.REACT_APP_MENU_ORDER) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-cart-check"></i>
            <span>Gọi Món</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_TABLE}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_TABLE) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-calendar-check"></i>
            <span>Tình Trạng Bàn</span>
          </Link>
        </li>

        <li className="nav-heading">Quản Lí</li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_CUSTOMER}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_CUSTOMER) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-person"></i>
            <span>Khách Hàng</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_EMPLOYEE}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_EMPLOYEE) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-people"></i>
            <span>Nhân Viên</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_MENU}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_MENU) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-cup-straw"></i>
            <span>Món Ăn</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_ORDER}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_ORDER) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-bag-check"></i>
            <span>Đơn Hàng</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_RESERVATION}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_RESERVATION) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-calendar-check"></i>
            <span>Đặt Bàn</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={process.env.REACT_APP_COMPONENT_PROFILE}
            className={`nav-link ${isActive(process.env.REACT_APP_COMPONENT_PROFILE) ? '' : 'collapsed'}`}
          >
            <i className="bi bi-person-circle"></i>
            <span>Tài Khoản</span>
          </Link>
        </li>


      </ul>
    </aside>
  );
};

export default Aside;

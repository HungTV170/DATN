import { Outlet } from 'react-router-dom';
import { useEffect} from "react";
import Breadcrumb from  '../../../components/public-component/Breadcrumb';

const Main = ()=>{
    useEffect(() => {
    }, []);

  
    return   (  
      
      <main id="main" className="main" >
        <div className="pagetitle">
          <Breadcrumb/>
        </div>
        <Outlet/>
      </main>
)}
export default Main
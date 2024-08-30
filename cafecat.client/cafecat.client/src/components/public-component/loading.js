const Loading = ()=>{
    return   (  
        <>
            <button className="btn btn-primary" type="button" disabled style={{ width: '100%', height: '100px'}}>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
        </>
)}
export default Loading 

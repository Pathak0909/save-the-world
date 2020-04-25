import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import "./Loader.css"
import Loader from 'react-loader-spinner'
const loader =()=>(
    <div className="loader">
        <Loader
	     type="Puff"
	     color="#8A2BE2"
	     height={100}
	     width={100}
	     timeout={3000} //3 secs
	  />
    </div>
    
)
export default loader;
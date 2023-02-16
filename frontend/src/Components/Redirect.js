/**
 * @file URL redirection component
 * @author Ugo Balducci
 * @version 1.0.0
 */

import React, { useEffect } from "react";

const Redirect = ( props ) => {
   const { url } = props

   useEffect(() => {
        window.location.href = url;
    }, [url]);


   return <h5>Redirecting...</h5>;
};

export default Redirect;
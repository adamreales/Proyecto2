import "./Denegada.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Denegada() 
{
    
    return (
        <>
         
            <h1>No se ha podido completar la compra.
            Ha ocurrido un problema al procesar el pago. 
            Por favor, inténtalo de nuevo o utiliza otro método de pago.</h1>
           
       </>
    );
}
export default Denegada;

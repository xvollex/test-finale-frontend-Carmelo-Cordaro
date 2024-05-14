import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function TokenCheck() 
{
    const token = Cookies.get('token');

    if (!token) { //token non presente
        return false;
    }

    try {
        const decodedToken = jwtDecode(token); //decodifica del token
        const expirationTime = decodedToken.exp * 1000; //scadenza token in millisecondi
        const currentTime = Date.now();

        console.log("token",decodedToken);

        if (expirationTime < currentTime) { //token scaduto
            return false;
        }

  
    } catch (e) {
        console.log("Errore",e);
        return false; //c'è stato un errore quindi non sono riuscito a verificare correttamente il token
    }

    return true; //se sono arrivato fin qui vuol dire che ho passato tutte le istruzioni precedenti, quindi il token è valido
}

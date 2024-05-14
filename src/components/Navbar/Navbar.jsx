import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { TokenCheck } from "../../Tokencheck";


export function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Stato per autenticazione
  const [isAdmin, setIsAdmin] = useState(false); // Stato per ruolo admin

  useEffect(() => {
    if (TokenCheck()) { // Se il token è valido
      setIsAuthenticated(true);

    }
  }, []);  

  const handleLogout = () => {
    Cookies.remove("token"); // Rimuovi il token dai cookie
    navigate("/"); // Reindirizza alla home page
    window.location.reload(); // Ricarica la pagina per aggiornare lo stato
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand">Meteo</div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/meteo">Meteo</NavLink>
            
            {isAuthenticated && (
              <>
                {/*Ho avuto un problema con il token che non c'è l'ho fatta a risolvere. Tra l'altro la gestionione della login con il token
                 sono stato in grado di riuscere a implementarlo senza problemi nell'esercitazione finale dei corsi.
                 La mia idea era quella di mostrare la pagina del meteo dopo essere autenticato. */}
              </>
            )}
          </div>
          {isAuthenticated && (
            <div style={{ marginLeft: "auto" }}>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

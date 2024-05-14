import "./home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TokenCheck } from "../../../Tokencheck";

export function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const isValidToken = TokenCheck(); 
    setIsAuthenticated(isValidToken); 
    if(!isValidToken)
      {
        navigate("/");
      }

  }, [navigate]);

  return (
    <div className="home-wrapper">
      <div className="home-content text-center p-5">
        {isAuthenticated ? (
          <>
            <h1 className="home-title">Benvenuto</h1>
            <p className="home-subtitle">Puoi iniziare a esplorare il meteo.</p>
          </>
        ) : (
          <>
            <h1 className="home-title">Benvenuto nel meteo!</h1>
            <p className="home-subtitle">Accedi o Registrati per poter cominciare.</p>
            <div className="home-buttons">
              <Link className="btn btn-primary home-btn" to="/login">Accedi</Link>
              <Link className="btn btn-secondary home-btn" to="/register">Registrati</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

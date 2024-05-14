import React, { useState } from 'react';
import { meteo, saveMeteoData } from '../../../services/RESTService';
import './Meteo.css';

export function Meteo() {
  const [cittaS, setCittaS] = useState('');
  const [meteoDati, setMeteoDati] = useState('');
  const [error, setError] = useState('');

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setCittaS(selectedCity);
    setMeteoDati('');
    setSuccessMessage('');

    try {
      const data = await meteo(selectedCity);
      setMeteoDati(data);
      await saveToDatabase(data);
    } catch (error) {
      setError('Errore nel recupero dei dati meteorologici.');
      console.error('Errore:', error);
    }
  };

  const saveToDatabase = async (meteoDati) => {
    try {
      if (meteoDati) {
        await saveMeteoData({
          temperatura: meteoDati.main.temp,
          descrizione: meteoDati.weather[0].description,
          citta: meteoDati.name,
          umidita: meteoDati.main.humidity,
          temperaturaMax: meteoDati.main.temp_max,
          temperaturaMin: meteoDati.main.temp_min
        });
        setSuccessMessage('Dati salvati con successo nel database');
      } else {
        console.log('Nessun dato meteo disponibile per il salvataggio nel database');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="meteo-container">
      <h2 className="meteo-heading">Previsioni Meteo</h2>
      <div className="input-container">
        <label htmlFor="city" className="label">Seleziona una città:</label>
        <select id="city" value={cittaS} onChange={handleCityChange} className="select">
          <option value="">Seleziona una città</option>
          <option value="Palermo">Palermo</option>
          <option value="Catania">Catania</option>
          <option value="Roma">Roma</option>
          <option value="Milano">Milano</option>
        </select>
      </div>
      {error && <p className="alert alert-danger">{error}</p>}
      {meteoDati && (
        <div className="meteo-info">
          <h3>{meteoDati.name}</h3>
          <p>Temperatura: {meteoDati.main.temp}°C</p>
          <p>Temperatura Max: {meteoDati.main.temp_max}°C</p>
          <p>Temperatura Min: {meteoDati.main.temp_min}°C</p>
          <p>Umidità: {meteoDati.main.humidity}%</p>
          <p>Descrizione: {meteoDati.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

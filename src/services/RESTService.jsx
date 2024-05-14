export async function login(userData) {
  try {
    const response = await fetch("http://localhost:8080/api/utente/login",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseData = response.json();
    return {
      status: response.status,
      data: responseData
    };
  } catch (error) {
    console.error('Error during the request:', error);
  }
}
  

export async function registerUser(userData) 
{
    const response = await fetch("http://localhost:8080/api/utente/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });

    return response; 
  
}


export async function meteo(citta) 
{
  try 
  {
    const apiKey = 'ce4c9380d5419981e2f9abbdcd98d4aa';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=${apiKey}&lang=it&units=metric`);

    if (!response.ok) 
      
      {
      throw new Error('errore meteo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export const saveMeteoData = async ({temperatura, descrizione, citta, temperaturaMin, temperaturaMax, umidita}) => {
  try {
    const response = await fetch('http://localhost:8080/api/meteo/salva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({temperatura, descrizione, citta, temperaturaMin, temperaturaMax, umidita}),
    });

    if (!response.ok) {
      throw new Error('Errore durante il salvataggio dei dati');
    }

   
    return response; 
  } catch (error) {
    console.error('Errore durante il salvataggio nel database:', error);
    throw error;
  }
};
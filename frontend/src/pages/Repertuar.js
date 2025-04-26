import React, { useState, useEffect } from 'react';
import './Repertuar.css';

const Repertuar = () => {
  const [spektakle, setSpektakle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // W normalnej sytuacji pobieralibyśmy dane z API
    // Tutaj symulujemy pobranie danych
    const fetchSpektakle = async () => {
      try {
        setLoading(true);
        // Zamiast realnego API, tutaj mamy dane statyczne
        const data = [
          {
            id: 1,
            title: 'Baba Jaga',
            description: 'Historia słowiańskiej wiedźmy, która mieszka w chatce na kurzej stopce. Spektakl inspirowany tradycyjnymi bajkami słowiańskimi, zaprasza widzów do magicznego świata pełnego tajemnic, zagadek i ludowych mądrości.',
            image: '/images/Jaga.png',
            duration: 90,
            ageRestriction: 6,
            director: 'Anna Nowak',
            cast: ['Maria Kowalska', 'Jan Wiśniewski', 'Zofia Lis']
          },
          {
            id: 2,
            title: 'Królewna Śnieżka',
            description: 'Klasyczna baśń o pięknej księżniczce, złej macosze i siedmiu krasnoludkach. Ta ponadczasowa opowieść o miłości, przyjaźni i odwadze w nowej, współczesnej aranżacji teatralnej zachwyci zarówno dzieci jak i dorosłych.',
            image: '/images/Sniezka.png',
            duration: 75,
            ageRestriction: 4,
            director: 'Piotr Kowalczyk',
            cast: ['Julia Wójcik', 'Tomasz Nowak', 'Aleksandra Kos']
          },
          {
            id: 3,
            title: 'Calineczka',
            description: 'Wzruszająca opowieść o maleńkiej dziewczynce, która przeżywa wielkie przygody. Barwny spektakl muzyczny oparty na baśni Hansa Christiana Andersena, pełen kolorowych kostiumów, piosenek i kreatywnej scenografii.',
            image: '/images/Calineczka.png',
            duration: 60,
            ageRestriction: 3,
            director: 'Magdalena Lewandowska',
            cast: ['Karolina Malinowska', 'Adam Kowal', 'Marta Jabłońska']
          },
          {
            id: 4,
            title: 'Król Edyp',
            description: 'Monumentalny dramat Sofoklesa o człowieku zmagającym się z przeznaczeniem. Klasyczna grecka tragedia w nowoczesnej inscenizacji, stawiająca uniwersalne pytania o los, wolną wolę i odpowiedzialność za własne czyny.',
            image: '/images/Edyp.png',
            duration: 120,
            ageRestriction: 16,
            director: 'Krzysztof Zalewski',
            cast: ['Michał Krakowski', 'Katarzyna Wilk', 'Robert Górski']
          }
        ];

        setSpektakle(data);
        setLoading(false);
      } catch (err) {
        setError('Problem z pobraniem danych o spektaklach');
        setLoading(false);
      }
    };

    fetchSpektakle();
  }, []);

  // Funkcja do obsługi przekierowania na stronę szczegółów spektaklu
  const handleShowDetails = (spektaklId) => {
    window.location.href = `/spektakl/${spektaklId}`;
  };

  // Funkcja do obsługi przekierowania na stronę zakupu biletu
  const handleBuyTicket = (spektaklId) => {
    window.location.href = `/kup-bilet/${spektaklId}`;
  };

  // Funkcja do obsługi standardowych obrazów (gdyby nie było właściwych)
  const getSpektaklImage = (imageUrl) => {
    // Jeśli mamy prawdziwy URL obrazu, używamy go
    if (imageUrl) return imageUrl;

    // W przeciwnym razie używamy obrazu zastępczego
    return '/images/spektakle/placeholder.jpg';
  };

  if (loading) {
    return (
      <div className="repertuar-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Ładowanie repertuaru...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repertuar-container">
        <div className="error-message">
          <p>Wystąpił błąd: {error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="repertuar-container">
      {/* <div className="repertuar-header">
        <h1>Repertuar <span className="accent-text">Teatru</span></h1>
        <div className="repertuar-subtitle">Nasze aktualne spektakle</div>
      </div> */}

      {spektakle.length === 0 ? (
        <div className="no-repertuar">
          <div className="no-repertuar-icon"></div>
          <p>Aktualnie brak spektakli w repertuarze.</p>
          <p>Zapraszamy wkrótce!</p>
        </div>
      ) : (
        <div className="spektakle-list">
          {spektakle.map((spektakl) => (
            <div key={spektakl.id} className="spektakl-item">
              <div className="spektakl-image-container">
                <img
                  src={getSpektaklImage(spektakl.image)}
                  alt={spektakl.title}
                  className="spektakl-image"
                />
                <div className="spektakl-age-badge">
                  {spektakl.ageRestriction}+
                </div>
              </div>

              <div className="spektakl-content">
                <h2 className="spektakl-title">{spektakl.title}</h2>

                <div className="spektakl-info">
                  <div className="info-item">
                    <i className="duration-icon"></i>
                    <span>{spektakl.duration} min</span>
                  </div>
                  <div className="info-item">
                    <i className="director-icon"></i>
                    <span>Reżyseria: {spektakl.director}</span>
                  </div>
                </div>

                <p className="spektakl-description">{spektakl.description}</p>

                <div className="spektakl-cast">
                  <span className="cast-label">Obsada:</span>
                  <span className="cast-names">{spektakl.cast.join(', ')}</span>
                </div>

                {/* <div className="spektakl-actions">
                  <button
                    className="action-button details-button"
                    onClick={() => handleShowDetails(spektakl.id)}
                  >
                    <span className="details-icon"></span>
                    Szczegóły
                  </button>
                  <button
                    className="action-button buy-ticket-button"
                    onClick={() => handleBuyTicket(spektakl.id)}
                  >
                    <span className="ticket-icon"></span>
                    Kup bilet
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Repertuar;
// import React from "react";

// function Repertuar() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "30px" }}>
//       {/* <h2>Repertuar</h2>
//       <p>Tu znajdują się spektakle teatru.</p> */}
//     </div>
//   );
// }

// export default Repertuar;
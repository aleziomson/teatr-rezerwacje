import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import "./Spektakle.css";

const Spektakle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [spektakle, setSpektakle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/spektakle")
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, spektakl) => {
          if (!acc[spektakl.date]) {
            acc[spektakl.date] = [];
          }
          acc[spektakl.date].push(spektakl);
          return acc;
        }, {});
        setSpektakle(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd podczas pobierania spektakli:", err);
        setLoading(false);
      });
  }, []);

  const handleBuy = (spektaklId) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/seats?spektaklId=${spektaklId}`);
    }
  };

  // Helper function to get an appropriate image for each performance
  const getSpektaklImage = (title) => {
    // Simplified logic to assign images based on title keywords
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("calineczka")) return "/images/Calineczka.png";
    if (lowerTitle.includes("edyp")) return "/images/Edyp.png";
    if (lowerTitle.includes("śnieżka")) return "/images/Sniezka.png";
    if (lowerTitle.includes("jaga")) return "/images/Jaga.png";
    // Default image if no specific match
    return "/images/theater-default.jpg";
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Ładowanie repertuaru...</p>
    </div>
  );

  return (
    <div className="repertuar-container">
      {/* <div className="repertuar-header">
        <h1>Repertuar</h1>
        <div className="repertuar-subtitle">Nadchodzące spektakle</div>
      </div> */}

      {Object.keys(spektakle).sort().map((date) => (
        <div key={date} className="date-section">
          <div className="date-header">
            <span className="date-text">{date}</span>
            <span className="date-line"></span>
          </div>

          <div className="spektakle-grid">
            {spektakle[date].map((spektakl) => (
              <div key={spektakl.id} className="spektakl-card">
                <div
                  className="spektakl-image"
                  style={{ backgroundImage: `url(${getSpektaklImage(spektakl.title)})` }}
                >
                  <div className="spektakl-time-badge">
                    <div className="spektakl-time">{spektakl.time}</div>
                  </div>
                </div>
                <div className="spektakl-details">
                  <h3 className="spektakl-title">{spektakl.title}</h3>
                  <div className="spektakl-location">
                    <i className="location-icon"></i>
                    {spektakl.location}
                  </div>
                  <button className="buy-ticket-button" onClick={() => handleBuy(spektakl.id)}>
                    <span className="ticket-icon"></span>
                    Kup bilet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spektakle;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Spektakle.css";
// import { useAuth } from "../components/AuthContext";

// const Spektakle = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [spektakle, setSpektakle] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/spektakle")
//       .then((res) => res.json())
//       .then((data) => {
//         const grouped = data.reduce((acc, spektakl) => {
//           if (!acc[spektakl.date]) {
//             acc[spektakl.date] = [];
//           }
//           acc[spektakl.date].push(spektakl);
//           return acc;
//         }, {});
//         setSpektakle(grouped);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Błąd podczas pobierania spektakli:", err);
//         setLoading(false);
//       });
//   }, []);

//   const handleBuy = (spektaklId) => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       navigate(`/seats?spektaklId=${spektaklId}`);
//     }
//   };

//   if (loading) return <p>Ładowanie repertuaru...</p>;

//   return (
//     <div className="spektakle-container">
//       <h2>Spektakle</h2>
//       {Object.keys(spektakle).sort().map((date) => (
//         <div key={date} className="spektakle-group">
//           <h3>{date}</h3>
//           {spektakle[date].map((spektakl) => (
//             <div key={spektakl.id} className="spektakle-item">
//               <div className="spektakle-time">{spektakl.time}</div>
//               <div className="spektakle-title">{spektakl.title}</div>
//               <div className="spektakle-location">{spektakl.location}</div>
//               <button className="btn-ticket" onClick={() => handleBuy(spektakl.id)}>
//                 Kup bilet
//               </button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Spektakle;
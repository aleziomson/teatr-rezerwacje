import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Spektakle.css";
import { useAuth } from "../components/AuthContext";

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

  if (loading) return <p>Ładowanie repertuaru...</p>;

  return (
    <div className="spektakle-container">
      <h2>Repertuar</h2>
      {Object.keys(spektakle).sort().map((date) => (
        <div key={date} className="spektakle-group">
          <h3>{date}</h3>
          {spektakle[date].map((spektakl) => (
            <div key={spektakl.id} className="spektakle-item">
              <div className="spektakle-time">{spektakl.time}</div>
              <div className="spektakle-title">{spektakl.title}</div>
              <div className="spektakle-location">{spektakl.location}</div>
              <button className="btn-ticket" onClick={() => handleBuy(spektakl.id)}>
                Kup bilet
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spektakle;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Spektakle.css"; 

// const Spektakle = () => {
//   const navigate = useNavigate();
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
//     const isLoggedIn = !!localStorage.getItem("token");
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else {
//       navigate(`/seats?spektaklId=${spektaklId}`);
//     }
//   };
  

//   if (loading) return <p>Ładowanie repertuaru...</p>;

//   return (
//     <div className="spektakle-container">
//       <h2>Repertuar</h2>
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

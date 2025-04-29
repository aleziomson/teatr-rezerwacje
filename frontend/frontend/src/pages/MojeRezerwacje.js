import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import "./MojeRezerwacje.css";

const MojeRezerwacje = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:8080/api/reservations/user/${user.id}/details`)
      .then(res => res.json())
      .then(data => {
        setReservations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd podczas pobierania rezerwacji:", err);
        setLoading(false);
      });
  }, [user]);

  const formatDate = (dateString) => {
    // You can add date formatting logic here if needed
    return dateString;
  };

  if (loading) {
    return (
      <div className="rezerwacje-loading">
        <div className="loading-spinner"></div>
        <p>Ładowanie rezerwacji...</p>
      </div>
    );
  }

  return (
    <div className="rezerwacje-container">
      {/* <div className="rezerwacje-header">
        <h1>Moje rezerwacje</h1>
        <div className="rezerwacje-subtitle">Historia twoich rezerwacji biletów</div>
      </div> */}

      {reservations.length === 0 ? (
        <div className="no-rezerwacje">
          <div className="no-rezerwacje-icon"></div>
          <p>Nie masz jeszcze żadnych rezerwacji.</p>
          <a href="/spektakle" className="browse-button">Przeglądaj repertuar</a>
        </div>
      ) : (
        <div className="rezerwacje-list">
          {reservations.map((res, index) => (
            <div key={index} className="rezerwacja-card">
              <div className="rezerwacja-header">
                <div className="rezerwacja-title">{res.title}</div>
                <div className="rezerwacja-date">{formatDate(res.date)}</div>
              </div>

              <div className="rezerwacja-details">
                <div className="seats-count">
                  <span className="seats-icon"></span>
                  <span>{res.seats.length} {res.seats.length === 1 ? 'miejsce' :
                    (res.seats.length >= 2 && res.seats.length <= 4) ? 'miejsca' : 'miejsc'}</span>
                </div>

                <div className="seats-list">
                  {Object.entries(
                    res.seats.reduce((acc, seat) => {
                      const [rzad, miejsce] = seat.split(", ").map(s => s.trim());
                      if (!acc[rzad]) acc[rzad] = [];
                      acc[rzad].push(miejsce);
                      acc[rzad].sort((a, b) => {
                        const numA = parseInt(a.match(/\d+/));
                        const numB = parseInt(b.match(/\d+/));
                        return numA - numB;
                      });
                      return acc;
                    }, {})
                  ).sort((a, b) => {
                    const numA = parseInt(a[0].match(/\d+/));
                    const numB = parseInt(b[0].match(/\d+/));
                    return numA - numB;
                  }).map(([rzad, miejsca]) => (
                    <div key={rzad} className="seat-row-entry">
                      <span className="row-label">{rzad}:</span>
                      <span className="seat-numbers">{miejsca.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="rezerwacja-actions">
                <button className="action-button download-button">
                  <span className="download-icon"></span>
                  Pobierz bilet
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MojeRezerwacje;

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../components/AuthContext";

// const MojeRezerwacje = () => {
//   const { user } = useAuth();
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     if (!user?.id) return;

//     fetch(`http://localhost:8080/api/reservations/user/${user.id}/details`)
//       .then(res => res.json())
//       .then(data => setReservations(data))
//       .catch(err => console.error("Błąd podczas pobierania rezerwacji:", err));
//   }, [user]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "20px" }}>
//       <h2>Moje rezerwacje</h2>
//       {reservations.length === 0 ? (
//         <p>Brak rezerwacji.</p>
//       ) : (
//         reservations.map((res, index) => (
//           <div key={index} style={{ marginBottom: "30px", border: "1px solid gray", padding: "15px" }}>
//             <h4>{res.date} | {res.title}</h4>
//             <p>Ilość miejsc: {res.seats.length}</p>
//             {Object.entries(
//               res.seats.reduce((acc, seat) => {
//                 const [rzad, miejsce] = seat.split(", ").map(s => s.trim());
//                 if (!acc[rzad]) acc[rzad] = [];
//                 acc[rzad].push(miejsce);
//                 acc[rzad].sort((a, b) => {
//                   const numA = parseInt(a.match(/\d+/));
//                   const numB = parseInt(b.match(/\d+/));
//                   return numA - numB;
//                 });
//                 return acc;
//               }, {})
//             ).sort((a, b) => {
//               const numA = parseInt(a[0].match(/\d+/));
//               const numB = parseInt(b[0].match(/\d+/));
//               return numA - numB;
//             }).map(([rzad, miejsca]) => (
//               <p key={rzad}>
//                 <strong>{rzad}:</strong> {miejsca.join(", ")}
//               </p>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MojeRezerwacje;

// pages/MojeRezerwacje.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";

const MojeRezerwacje = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:8080/api/reservations/user/${user.id}/details`)
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error("Błąd podczas pobierania rezerwacji:", err));
  }, [user]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Moje rezerwacje</h2>
      {reservations.length === 0 ? (
        <p>Brak rezerwacji.</p>
      ) : (
        reservations.map((res, index) => (
          <div key={index} style={{ marginBottom: "30px", border: "1px solid gray", padding: "15px" }}>
            <h4>{res.date} | {res.title}</h4>
            <p>Ilość miejsc: {res.seats.length}</p>
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
              <p key={rzad}>
                <strong>{rzad}:</strong> {miejsca.join(", ")}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MojeRezerwacje;


// import React, { useEffect, useState } from "react";

// const MojeRezerwacje = () => {
//   const [reservations, setReservations] = useState([]);

//   const getUserIdFromToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return null;
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.sub || payload.id;
//     } catch (e) {
//       console.error("Nieprawidłowy token lub nieistniejący.");
//       return null;
//     }
//   };

//   useEffect(() => {
//     const userId = getUserIdFromToken();
//     if (!userId) return;

//     fetch(`http://localhost:8080/api/reservations/user/${userId}/details`)
//       .then(res => res.json())
//       .then(data => setReservations(data))
//       .catch(err => console.error("Błąd podczas pobierania rezerwacji:", err));
//   }, []);

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
//             res.seats.reduce((acc, seat) => {
//                 const [rzad, miejsce] = seat.split(", ").map(s => s.trim());
//                 if (!acc[rzad]) acc[rzad] = [];
//                 acc[rzad].push(miejsce);
//                 acc[rzad].sort((a, b) => {
//                 const numA = parseInt(a.match(/\d+/));
//                 const numB = parseInt(b.match(/\d+/));
//                 return numA - numB;
//                 });
//                 return acc;
//             }, {})
//             ).sort((a, b) => {
//                 const numA = parseInt(a[0].match(/\d+/));
//                 const numB = parseInt(b[0].match(/\d+/));
//                 return numA - numB;
//             }).map(([rzad, miejsca]) => (
//             <p key={rzad}>
//                 <strong>{rzad}:</strong> {miejsca.join(", ")}
//             </p>
//             ))}

//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MojeRezerwacje;

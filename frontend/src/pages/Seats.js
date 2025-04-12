import React, { useEffect, useState } from "react";
import "./Seats.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Seats = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const spektaklId = queryParams.get("spektaklId");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const rows = 10;
  const seatsPerRow = 15;

  useEffect(() => {
    if (spektaklId) {
      fetch(`http://localhost:8080/api/seats?spektaklId=${spektaklId}`)
        .then((res) => res.json())
        .then((data) => setSeats(data))
        .catch((err) => console.error("Błąd podczas pobierania miejsc:", err));
    }
  }, [spektaklId]);

  const handleSeatClick = (row, seat) => {
    const clicked = seats.find((s) => s.row === row && s.seat === seat);
    if (clicked?.taken) return;

    const key = `${row}-${seat}`;
    setSelectedSeats((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleReservation = async () => {
    const seatIds = selectedSeats.map((key) => {
      const [row, seat] = key.split("-").map(Number);
      const match = seats.find((s) => s.row === row && s.seat === seat);
      return match?.id;
    });

    await fetch(
      `http://localhost:8080/api/redis/request-confirmation?userId=${user.id}&spektaklId=${spektaklId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seatIds),
      }
    );

    setShowPopup(true);
  };

  const handleCodeConfirm = async () => {
    const response = await fetch(
      `http://localhost:8080/api/redis/check?key=user:${user.id}&code=${confirmationCode}`
    );
    const isValid = await response.json();

    if (isValid) {
      const reservationsToSend = selectedSeats.map((key) => {
        const [row, seat] = key.split("-").map(Number);
        const match = seats.find((s) => s.row === row && s.seat === seat);
        return {
          spektaklId: parseInt(spektaklId),
          seatId: match?.id,
          userId: parseInt(user.id),
        };
      });

      for (const res of reservationsToSend) {
        await fetch("http://localhost:8080/api/reservations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(res),
        });
      }

      setMessage("Rezerwacja potwierdzona!");
      setSelectedSeats([]);
      setShowPopup(false);
      navigate("/spektakle");
    } else {
      setMessage("Niepoprawny kod. Spróbuj ponownie.");
    }
  };

  const renderSeats = () => {
    const seatElements = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const found = seats.find((s) => s.row === row && s.seat === seatNum);
        const isTaken = found?.taken;
        const isSelected = selectedSeats.includes(`${row}-${seatNum}`);

        rowSeats.push(
          <div
            key={seatNum}
            className={`seat ${
              isTaken ? "taken" : isSelected ? "selected" : "available"
            }`}
            title={`Rząd ${row}, Miejsce ${seatNum}`}
            onClick={() => handleSeatClick(row, seatNum)}
          >
            {seatNum}
          </div>
        );
      }
      seatElements.push(
        <div key={row} className="seat-row">
          {rowSeats}
        </div>
      );
    }
    return seatElements;
  };

  return (
    <div className="seats-wrapper">
      <h2>Wybierz miejsca</h2>
      <div className="screen">SCENA</div>
      <div className="seats-container">{renderSeats()}</div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button onClick={() => navigate("/spektakle")} style={{ marginRight: "20px" }}>
          Powrót
        </button>

        <button
          onClick={handleReservation}
          disabled={selectedSeats.length === 0}
          style={{
            backgroundColor: selectedSeats.length === 0 ? "#ccc" : "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Rezerwuj
        </button>
      </div>

      <div style={{ marginTop: "40px", textAlign: "left", maxWidth: "400px", margin: "40px auto" }}>
        <h4>Legenda miejsc</h4>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ width: 30, height: 30, backgroundColor: "gray", marginRight: 10 }}></div>
          <span>Miejsce wolne</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ width: 30, height: 30, backgroundColor: "red", marginRight: 10 }}></div>
          <span>Miejsce zajęte</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ width: 30, height: 30, backgroundColor: "darkblue", marginRight: 10 }}></div>
          <span>Miejsce wybrane</span>
        </div>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
            zIndex: 1000,
          }}
        >
          <h3>Wprowadź kod wysłany na maila:</h3>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
          <br />
          <button onClick={handleCodeConfirm}>Potwierdź</button>
          <button onClick={() => setShowPopup(false)}>Anuluj</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Seats;


// import React, { useEffect, useState } from "react";
// import "./Seats.css";
// import { useLocation } from "react-router-dom";

// const Seats = () => {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [confirmationCode, setConfirmationCode] = useState("");
//   const [message, setMessage] = useState("");

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const spektaklId = queryParams.get("spektaklId");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/login";
//     }
//   }, []);

//   function getUserIdFromToken() {
//     const token = localStorage.getItem("token");
//     if (!token || token.split('.').length !== 3) {
//       console.error("Nieprawidłowy token lub nieistniejący.");
//       return null;
//     }
  
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       return payload.sub;
//     } catch (e) {
//       console.error("Błąd dekodowania tokena:", e);
//       return null;
//     }
//   }
  

//   const rows = 10;
//   const seatsPerRow = 15;

//   useEffect(() => {
//     if (spektaklId) {
//       fetch(`http://localhost:8080/api/seats?spektaklId=${spektaklId}`)
//         .then((res) => res.json())
//         .then((data) => setSeats(data))
//         .catch((err) => console.error("Błąd podczas pobierania miejsc:", err));
//     }
//   }, [spektaklId]);

//   const handleSeatClick = (row, seat) => {
//     const clicked = seats.find((s) => s.row === row && s.seat === seat);
//     if (clicked?.taken) return;

//     const key = `${row}-${seat}`;
//     setSelectedSeats((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
//     );
//   };

//   const handleReservation = async () => {
//     const userId = getUserIdFromToken();
//     if (!userId) {
//       alert("Nie można pobrać danych użytkownika.");
//       return;
//     }

//     const seatIds = selectedSeats.map((key) => {
//       const [row, seat] = key.split("-").map(Number);
//       const match = seats.find((s) => s.row === row && s.seat === seat);
//       return match?.id;
//     });

//     await fetch(`http://localhost:8080/api/redis/request-confirmation?userId=${userId}&spektaklId=${spektaklId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(seatIds)
//     });

//     setShowPopup(true);
//   };
  
//   const handleCodeConfirm = async () => {
//     const userId = getUserIdFromToken();
//     if (!userId) {
//       setMessage("Brak użytkownika.");
//       return;
//     }

//     const response = await fetch(`http://localhost:8080/api/redis/check?key=user:${userId}&code=${confirmationCode}`);
//     const isValid = await response.json();

//     if (isValid) {
//       const reservationsToSend = selectedSeats.map((key) => {
//         const [row, seat] = key.split("-").map(Number);
//         const match = seats.find((s) => s.row === row && s.seat === seat);
//         return {
//           spektaklId: parseInt(spektaklId),
//           seatId: match?.id,
//           userId: parseInt(userId),
//         };
//       });

//       for (const res of reservationsToSend) {
//         await fetch("http://localhost:8080/api/reservations", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(res),
//         });
//       }

//       setMessage("Rezerwacja potwierdzona!");
//       setSelectedSeats([]);
//       setShowPopup(false);
//       window.location.href = "/spektakle"; // Można dodać przekierowanie po sukcesie
//     } else {
//       setMessage("Niepoprawny kod. Spróbuj ponownie.");
//     }
//   };

//   const renderSeats = () => {
//     const seatElements = [];
//     for (let row = 1; row <= rows; row++) {
//       const rowSeats = [];
//       for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
//         const found = seats.find((s) => s.row === row && s.seat === seatNum);
//         const isTaken = found?.taken;
//         const isSelected = selectedSeats.includes(`${row}-${seatNum}`);

//         rowSeats.push(
//           <div
//             key={seatNum}
//             className={`seat ${
//               isTaken ? "taken" : isSelected ? "selected" : "available"
//             }`}
//             title={`Rząd ${row}, Miejsce ${seatNum}`}
//             onClick={() => handleSeatClick(row, seatNum)}
//           >
//             {seatNum}
//           </div>
//         );
//       }
//       seatElements.push(
//         <div key={row} className="seat-row">
//           {rowSeats}
//         </div>
//       );
//     }
//     return seatElements;
//   };

//   return (
//     <div className="seats-wrapper">
//       <h2>Wybierz miejsca</h2>
//       <div className="screen">SCENA</div>
//       <div className="seats-container">{renderSeats()}</div>

//       <div style={{ marginTop: "30px", textAlign: "center" }}>
//         <button onClick={() => window.location.href = "/spektakle"} style={{ marginRight: "20px" }}>
//           Powrót
//         </button>

//         <button
//           onClick={handleReservation}
//           disabled={selectedSeats.length === 0}
//           style={{
//             backgroundColor: selectedSeats.length === 0 ? "#ccc" : "green",
//             color: "white",
//             padding: "10px 20px",
//             border: "none",
//             cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer"
//           }}
//         >
//           Rezerwuj
//         </button>
//       </div>

//       {/* LEGENDA */}
//       <div style={{ marginTop: "40px", textAlign: "left", maxWidth: "400px", margin: "40px auto" }}>
//         <h4>Legenda miejsc</h4>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//           <div style={{ width: 30, height: 30, backgroundColor: "gray", marginRight: 10 }}></div>
//           <span>Miejsce wolne</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//           <div style={{ width: 30, height: 30, backgroundColor: "red", marginRight: 10 }}></div>
//           <span>Miejsce zajęte</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
//           <div style={{ width: 30, height: 30, backgroundColor: "darkblue", marginRight: 10 }}></div>
//           <span>Miejsce wybrane</span>
//         </div>
//       </div>

//       {/* POPUP do kodu */}
//       {showPopup && (
//         <div style={{
//           position: "fixed", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
//           backgroundColor: "white", padding: "20px", border: "1px solid black", zIndex: 1000
//         }}>
//           <h3>Wprowadź kod wysłany na maila:</h3>
//           <input
//             type="text"
//             value={confirmationCode}
//             onChange={(e) => setConfirmationCode(e.target.value)}
//           />
//           <br />
//           <button onClick={handleCodeConfirm}>Potwierdź</button>
//           <button onClick={() => setShowPopup(false)}>Anuluj</button>
//           {message && <p>{message}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Seats;

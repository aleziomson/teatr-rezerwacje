// import React, { useState } from "react";

// function LoginRegister() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isRegistering
//       ? "http://localhost:8080/api/register"
//       : "http://localhost:8080/api/login";

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({ email, password }),
//       });

//       const data = await response.text();

//       // ✅ Rejestracja - po prostu wyświetlamy wiadomość z backendu
//       if (isRegistering) {
//         setMessage(data);
//         return;
//       }

//       // ✅ Logowanie
//       if (response.ok) {
//         // Zwrócony token
//         localStorage.setItem("token", data);
//         setMessage("Zalogowano pomyślnie!");
//         window.location.href = "/";
//       } else {
//         setMessage(data); // "Błędny login lub hasło"
//       }
//     } catch (error) {
//       console.error("Błąd:", error);
//       setMessage("Wystąpił błąd. Spróbuj ponownie.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>{isRegistering ? "Rejestracja" : "Logowanie"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Hasło"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">
//           {isRegistering ? "Zarejestruj się" : "Zaloguj się"}
//         </button>
//       </form>

//       {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}

//       <button onClick={() => setIsRegistering(!isRegistering)} style={{ marginTop: "20px" }}>
//         {isRegistering
//           ? "Masz już konto? Zaloguj się"
//           : "Nie masz konta? Zarejestruj się"}
//       </button>
//     </div>
//   );
// }

// export default LoginRegister;

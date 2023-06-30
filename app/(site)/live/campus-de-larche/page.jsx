"use client";

import { useEffect, useState } from "react";

function CampusDeLarche() {
  const [imageUrl, setImageUrl] = useState("");

  const fetchCurrentReservations = () => {
    fetch("/api/currentReservation")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      })
      .catch((error) => {
        console.error("PROBLEME API", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(fetchCurrentReservations, 60000); // Lancer toutes les minutes
    fetchCurrentReservations(); // Appel initial à la récupération des réservations

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black">
      <div className="flex items-center h-full">
        <img className="w-1920" src={imageUrl} alt="Panel image" />
      </div>
    </div>
  );
}

export default CampusDeLarche;

// "use client";

// import { useEffect, useState } from "react";

// const socket = new WebSocket("ws://greenity.vercel.app"); // "ws://localhost:8080"

// function CampusDeLarche() {
//   const [imageUrl, setImageUrl] = useState("");

//   const fetchCurrentReservations = () => {
//     fetch("/api/currentReservation")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.imageUrl) {
//           setImageUrl(data.imageUrl);

//           // Envoi du message WebSocket avec la nouvelle URL d'image
//           socket.send(imageUrl);
//         }
//       })
//       .catch((error) => {
//         console.error("PROBLEME API", error);
//       });
//   };

//   useEffect(() => {
//     const interval = setInterval(fetchCurrentReservations, 60000); // Lancer toutes les minutes

//     socket.onmessage = function (event) {
//       const newImageUrl = event.data;
//       // Mettre à jour l'image avec la nouvelle URL
//       if (newImageUrl) {
//         setImageUrl(newImageUrl);
//       }
//     };

//     fetchCurrentReservations(); // Appel initial à la récupération des réservations

//     return () => {
//       // Fermez la connexion WebSocket lorsque le composant est démonté
//       socket.disconnect();
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="w-screen h-screen bg-black">
//       <div className="flex items-center h-full">
//         <img className="w-1920" src={imageUrl} alt="Panel image" />
//       </div>
//     </div>
//   );
// }

// export default CampusDeLarche;

// ------------------------------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// function CampusDeLarche() {
//   const [imageUrl, setImageUrl] = useState("");

//   const fetchCurrentReservations = () => {
//     fetch("/api/currentReservation")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.imageUrl) {
//           setImageUrl(data.imageUrl);
//         }
//       })
//       .catch((error) => {
//         console.error("PROBLEME API", error);
//       });
//   };

//   useEffect(() => {
//     const updateImage = () => {
//       const now = new Date();
//       const minutes = now.getMinutes();
//       const seconds = now.getSeconds();

//       // Mettez à jour l'image si l'heure est 00:00 ou 30:00
//       if ((minutes === 0 || minutes === 30) && seconds === 0) {
//         fetchCurrentReservations();
//       }
//     };

//     const interval = setInterval(updateImage, 1000); // Vérifiez toutes les secondes

//     // Établissez une connexion WebSocket côté client
//     const socket = io();

//     // Écoutez l'événement de mise à jour des réservations
//     socket.on("reservationUpdated", (reservation) => {
//       // Mettez à jour l'image affichée en fonction de la réservation mise à jour
//       if (reservation.imageUrl) {
//         setImageUrl(reservation.imageUrl);
//       } else {
//         setImageUrl(
//           "https://res.cloudinary.com/ddbzkz1of/image/upload/v1687923888/Greenity_ggoiqh.png"
//         );
//       }
//     });

//     fetchCurrentReservations(); // Appel initial à la récupération des réservations

//     return () => {
//       // Fermez la connexion WebSocket lorsque le composant est démonté
//       socket.disconnect();
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="w-screen h-screen bg-black">
//       <div className="flex items-center h-full">
//         <img className="w-1920" src={imageUrl} alt="Panel image" />
//       </div>
//     </div>
//   );
// }

// export default CampusDeLarche;

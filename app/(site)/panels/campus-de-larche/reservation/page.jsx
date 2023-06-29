"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

import ReactCalendar from "react-calendar";
import NavPanels from "../../../../components/nav/navPanels";
import NavNeutre from "../../../../components/nav/navNeutre";
import Restricted from "../../../../components/restricted";
import TimePicker from "../../../../components/timepicker";
import ImagePicker from "../../../../components/imagepicker";

const Reservation = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div className="min-h-full">
          <NavPanels />
          <Restricted />
        </div>
      </>
    );
  }

  const handleStep1Select = (date) => {
    setSelectedDate(date);
  };

  const handleStep2Select = (startTime, endTime) => {
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
  };

  const handleStep3Select = (image) => {
    setSelectedImage(image);
    setShowImagePreview(true);
  };

  const handleConfirmImage = () => {
    setShowImagePreview(false);
  };

  const handleSubmit = () => {
    // Vérifiez si toutes les étapes sont complétées
    if (selectedDate && selectedStartTime && selectedEndTime && selectedImage) {
      // Effectuez votre requête API ici pour enregistrer les informations de réservation

      const data = {
        panelName: "PULV - Campus de l'Arche",
        startDate: selectedStartTime,
        endDate: selectedEndTime,
        imageUrl: selectedImage,
      };

      // Vérifier le nombre de réservations de l'utilisateur connecté
      if (session && session.user) {
        const userId = session.user.id;

        // Effectuer une requête API pour récupérer les réservations de l'utilisateur
        axios
          .get("/api/allReservations")
          .then((response) => {
            const reservations = response.data;

            const userReservations = reservations.filter((reservation) => {
              // Vérifier si les réservations ont la propriété "userId"
              if (reservation.hasOwnProperty("userId")) {
                // Vérifier si l'ID de l'utilisateur correspond
                if (userId && String(userId) === String(reservation.userId)) {
                  return true;
                }
              }
              return false;
            });

            // Vérifier si l'utilisateur a déjà fait 2 réservations ou plus
            if (userReservations.length >= 2) {
              toast.error("You cannot make more than 2 reservations !");
            } else {
              // Effectuer la requête API pour enregistrer la nouvelle réservation
              axios
                .post("/api/reservation", data)
                .then(() => {
                  toast.success("Réservation confirmée !");
                  setTimeout(() => {
                    console.log("Delayed for 3 seconds.");
                  }, 3000);
                  router.push("/dashboard");
                })
                .catch(() => {
                  toast.error("Une erreur s'est produite !");
                  setTimeout(() => {
                    console.log("Delayed for 3 seconds.");
                  }, 3000);
                  router.push("/panels/campus-de-larche");
                });
            }
          })
          .catch((error) => {
            console.error(
              "Une erreur s'est produite lors de la récupération des réservations",
              error
            );
          });
      }
    } else {
      // Affichez un message d'erreur si des informations sont manquantes
      console.error("Veuillez compléter toutes les étapes de réservation.");
    }
  };

  return (
    <div className="min-h-full">
      <NavNeutre />

      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        {status === "authenticated" && (
          <>
            {!selectedDate && <Step1 onSelect={handleStep1Select} />}
            {selectedDate && !selectedStartTime && (
              <Step2 selectedDate={selectedDate} onSelect={handleStep2Select} />
            )}
            {selectedStartTime && !selectedImage && (
              <Step3 onSelect={handleStep3Select} />
            )}
            {selectedImage && !showImagePreview && (
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Reservation summary
                </h2>
                <p className="mt-4 text-gray-500">
                  Here is a summary of the information you provided for your
                  reservation
                </p>
                <dl class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Date</dt>
                    <dd class="mt-2 text-sm text-gray-500">
                      {selectedDate.toISOString()}
                    </dd>
                  </div>
                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">Start time</dt>
                    <dd class="mt-2 text-sm text-gray-500">
                      {selectedStartTime.toISOString()}
                    </dd>
                  </div>
                  <div class="border-t border-gray-200 pt-4">
                    <dt class="font-medium text-gray-900">End time</dt>
                    <dd class="mt-2 text-sm text-gray-500">
                      {selectedEndTime.toISOString()}
                    </dd>
                  </div>
                  <img
                    src={selectedImage}
                    alt="User image"
                    className="rounded-lg bg-gray-100"
                  />
                </dl>
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6"
                  onClick={handleSubmit}
                >
                  Submit reservation
                </button>
              </div>
            )}

            {selectedImage && showImagePreview && (
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Image preview
                </h2>
                <p className="mt-4 text-gray-500">
                  Here's the image you've chosen for your ad.
                </p>
                <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                  <div class="border-gray-200 pt-4">
                    <img
                      className="rounded-lg bg-gray-100"
                      src={selectedImage}
                      alt="Image preview"
                    />
                    <button
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                      onClick={handleConfirmImage}
                    >
                      Confirm image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Step1 = ({ onSelect }) => {
  const handleDateSelect = (date) => {
    onSelect(date);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Day of reservation
      </h2>
      <p className="mt-4 text-gray-500">
        Please click on the day you have chosen to display your advertisement.
      </p>
      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
        <div class="border-gray-200 pt-4">
          <ReactCalendar
            minDate={new Date()}
            className="REACT-CALENDAT"
            view="month"
            onClickDay={handleDateSelect}
            value={null}
          />
        </div>
      </div>
    </div>
  );
};

const Step2 = ({ selectedDate, onSelect }) => {
  const createAvailableSlots = (selectedDate, allReservations) => {
    // Heures de la journée disponibles
    const hours = [
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "07:00",
      "07:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30",
    ];

    // Convertir la date sélectionnée en objet Date pour la comparaison
    const selectedDateTime = new Date(selectedDate);

    // Filtrer les réservations pour la journée sélectionnée
    const reservationsForSelectedDate = allReservations.filter(
      (reservation) => {
        const reservationDateTime = new Date(reservation.startDate);
        return (
          reservationDateTime.getFullYear() ===
            selectedDateTime.getFullYear() &&
          reservationDateTime.getMonth() === selectedDateTime.getMonth() &&
          reservationDateTime.getDate() === selectedDateTime.getDate()
        );
      }
    );

    // Créer un tableau des créneaux horaires disponibles
    const availableSlotsForSelectedDate = hours.filter((hour) => {
      // Vérifier si le créneau horaire est déjà réservé
      const isReserved = reservationsForSelectedDate.some((reservation) => {
        const reservationDateTime = new Date(reservation.startDate);
        const reservationHour = reservationDateTime.getHours();
        const reservationMinute = reservationDateTime.getMinutes();
        const [slotHour, slotMinute] = hour.split(":");
        return (
          reservationHour === Number(slotHour) &&
          reservationMinute === Number(slotMinute)
        );
      });
      return !isReserved;
    });

    return availableSlotsForSelectedDate;
  };

  const fetchAllReservations = async () => {
    try {
      const response = await fetch("/api/allReservations");
      return await response.json();
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des réservations",
        error
      );
    }
  };

  const handleStartTimeSelect = (startTime) => {
    const endTime = new Date(startTime.getTime() + 30 * 60000);
    onSelect(startTime, endTime);
  };

  useEffect(() => {
    const loadAllReservations = async () => {
      const allReservations = await fetchAllReservations();
      const availableSlotsForSelectedDate = createAvailableSlots(
        selectedDate,
        allReservations
      );

      setAvailableSlots(availableSlotsForSelectedDate);
    };

    loadAllReservations();
  }, [selectedDate]);

  const [availableSlots, setAvailableSlots] = useState([]);

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Reservation time slot
      </h2>
      <p className="mt-4 text-gray-500">
        Please click on the time slot you have chosen to display your
        advertisement. Please note that each booking lasts exactly 30 minutes.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
        <div className="border-gray-200 pt-4">
          <TimePicker
            selectedDate={selectedDate}
            onSelect={handleStartTimeSelect}
            availableSlots={availableSlots}
          />
        </div>
      </div>
    </div>
  );
};

const Step3 = ({ onSelect }) => {
  const handleImageSelect = (image) => {
    onSelect(image);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Upload your advertisement
      </h2>
      <p className="mt-4 text-gray-500">
        Please click on the insert below to import the image of your
        advertisement. Please note that your image must be in a format of 1920
        pixels width and 1080 pixels height.
      </p>
      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
        <div class="border-gray-200 pt-4">
          <ImagePicker onChange={handleImageSelect} />
        </div>
      </div>
    </div>
  );
};

export default Reservation;

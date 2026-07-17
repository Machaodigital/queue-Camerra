import { useState, useRef, useEffect } from "react";

import Header from "./components/Header";
import CameraList from "./components/CameraList";
import Calendar from "./components/Calendar";

import camerasData from "./data/cameraData";
import { getBookings } from "./data/sheetBookings";

import Hero from "./components/Hero";

function App() {
  const [cameras, setCameras] = useState(camerasData);
  const [selected, setSelected] = useState(null);

  const calendarRef = useRef(null);

  useEffect(() => {
    async function loadBookings() {
      const rows = await getBookings();

      const updatedCameras = camerasData.map((camera) => {
        let bookedDates = [];

        rows.forEach((row) => {
          if (row.Camera === camera.name) {
            const start = new Date(row.StartDate);
            const end = new Date(row.EndDate);

            const current = new Date(start);

            while (current <= end) {
              bookedDates.push(
                current.toISOString().split("T")[0]
              );

              current.setDate(current.getDate() + 1);
            }
          }
        });

        return {
          ...camera,
          booked: bookedDates,
        };
      });

      setCameras(updatedCameras);
    }

    loadBookings();
  }, []);

  function selectCamera(camera) {
    setSelected(camera);

    setTimeout(() => {
      calendarRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }

  return (
    <div className="page">
      <div className="card">
        <Header />

        <Hero />

        <CameraList
          cameras={cameras}
          onSelect={selectCamera}
        />

        {selected && (
          <div ref={calendarRef}>
            <h2>เจอแล้ว</h2>

            <Calendar camera={selected} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
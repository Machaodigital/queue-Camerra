import { useState, useRef, useEffect } from "react";

import Header from "./components/Header";
import CameraList from "./components/CameraList";
import Calendar from "./components/Calendar";
import "./App.css";

import camerasData from "./data/cameraData";
import { getBookings } from "./data/sheetBookings";

import Hero from "./components/Hero";

// แปลงค่าวันที่จากชีตเป็น "YYYY-MM-DD" (ถ้าอ่านไม่ได้ จะคืนค่า null)
function toYMD(value) {
  const d = new Date(value);
  if (isNaN(d)) return null;
  return d.toISOString().split("T")[0];
}

function App() {
  const [cameras, setCameras] = useState(camerasData);
  const [selected, setSelected] = useState(null);

  const calendarRef = useRef(null);

  useEffect(() => {
    async function loadBookings() {
      const rows = await getBookings();

      const updatedCameras = camerasData.map((camera) => {
        let bookedDates = [];
        let notes = {};

        rows.forEach((row) => {
          // หมายเหตุ (แถวเดียวกันอาจเป็นคิวจองด้วย จึงไม่ return)
          if (row.NoteDate && row.Note) {
            const key = toYMD(row.NoteDate);
            if (key) {
              if (row.Camera === camera.name) {
                notes[key] = row.Note;
              } else if (!row.Camera && !notes[key]) {
                notes[key] = row.Note;
              }
            }
          }

          // คิวจอง
          if (row.Camera === camera.name && row.StartDate && row.EndDate) {
            const start = new Date(row.StartDate);
            const end = new Date(row.EndDate);
            if (isNaN(start) || isNaN(end)) return;

            const current = new Date(start);
            while (current <= end) {
              bookedDates.push(current.toISOString().split("T")[0]);
              current.setDate(current.getDate() + 1);
            }
          }
        });

        return {
          ...camera,
          booked: bookedDates,
          notes,
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
        block: "start",
      });
    }, 100);
  }

  // ใช้ข้อมูลกล้องล่าสุดเสมอ (กันกรณีข้อมูลจากชีตโหลดเสร็จหลังกดเลือก)
  const selectedCamera = selected
    ? cameras.find((c) => c.id === selected.id) ?? selected
    : null;

  return (
    <div className="page">
      <div className="card">
        <Header />

        <Hero />

        <CameraList
          cameras={cameras}
          onSelect={selectCamera}
        />

        {selectedCamera && (
          <section ref={calendarRef} className="calendar-section">
            <h2 className="calendar-title">
              ตารางคิว {selectedCamera.name}
            </h2>

            <Calendar camera={selectedCamera} />
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
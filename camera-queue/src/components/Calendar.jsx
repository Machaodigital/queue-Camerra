import { useState } from "react"

function Calendar({ camera }) {

  const [month, setMonth] = useState(6) // 0-indexed: 6 = กรกฎาคม
  const [year, setYear] = useState(2026)

  const monthName = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ]

  // จำนวนวันในเดือน
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // วันแรกของเดือน
  const startDay = new Date(year, month, 1).getDay()

  const days = []
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // เปลี่ยนเดือน
  function nextMonth() {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  // แปลงวันในปฏิทิน (day) ให้เป็น "YYYY-MM-DD" ตาม month/year ที่กำลังดูอยู่
  // ต้องมีฟังก์ชันนี้ ไม่งั้นจะเทียบเลขวันกับ string เต็มไม่ได้เลย
  function toDateString(day) {
    const mm = String(month + 1).padStart(2, "0")
    const dd = String(day).padStart(2, "0")
    return `${year}-${mm}-${dd}`
  }

  // เช็คว่าวันนี้ถูกจองหรือยัง โดยเทียบวันที่เต็ม ไม่ใช่แค่เลขวัน
  function isBooked(day) {
    return camera.booked.includes(toDateString(day))
  }

  return (
    <div className="calendar-box">

      <h2>{camera.name}</h2>

      <div className="calendar-header">
        <button onClick={prevMonth}>◀</button>
        <h2>{monthName[month]} {year}</h2>
        <button onClick={nextMonth}>▶</button>
      </div>

      <div className="legend">
        <div>🟢 ว่าง</div>
        <div>🔴 ไม่ว่าง</div>
      </div>

      <h3>{"ทักแชทเพื่อสอบถามเพิ่มเติม"}</h3>

      <div className="week">
        <div>อา</div>
        <div>จ</div>
        <div>อ</div>
        <div>พ</div>
        <div>พฤ</div>
        <div>ศ</div>
        <div>ส</div>
      </div>

      <div className="calendar">
        {
          Array(startDay).fill("").map((_, i) => (
            <div key={i}></div>
          ))
        }

        {
          days.map(day => (
            <div
              key={day}
              className={isBooked(day) ? "day booked" : "day free"}
            >
              <b>{day}</b>
              <span>{isBooked(day) ? "🔴" : "🟢"}</span>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Calendar
import { useState } from "react"


function CalendarView({camera}){


const days = [
1,2,3,4,5,6,7,
8,9,10,11,12,13,14,
15,16,17,18,19,20,21,
22,23,24,25,26,27,28,
29,30,31
]


return(

<div>


<h2>
คิว {camera.name}
</h2>


<div className="calendar">


{
days.map((day)=>{


let status = camera.dates?.[`2026-07-${String(day).padStart(2,"0")}`]


return(

<div 
className={
status==="ไม่ว่าง"
?
"day booked"
:
"day available"
}

key={day}
>


<h3>
{day}
</h3>


{

status==="ไม่ว่าง"

?

<span>
🔴
</span>

:

<span>
🟢
</span>

}


</div>


)


})

}


</div>


</div>

)


}


export default CalendarView
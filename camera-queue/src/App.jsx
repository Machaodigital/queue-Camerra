import { useState, useRef } from "react"

import Header from "./components/Header"
import CameraList from "./components/CameraList"
import Calendar from "./components/Calendar"

import cameras from "./data/cameraData"

import Hero from "./components/Hero"


function App(){

  const [selected,setSelected] = useState(null)

  const calendarRef = useRef(null)






function selectCamera(camera){

setSelected(camera)

console.log("App ได้รับ:",camera)

setTimeout(()=>{

calendarRef.current?.scrollIntoView({

behavior:"smooth"

})

},100)

}


  return(

    <div className="page">

    <div className="card">

      <Header/>

<Hero/>

      <CameraList

        cameras={cameras}

        onSelect={selectCamera}

      />


      {
        selected &&

        <div ref={calendarRef}>

        <h2>เจอแล้ว</h2>

        <Calendar camera={selected}/>

        </div>
      }


    </div>

    </div>


  )

}


export default App
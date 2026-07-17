function CameraList({cameras,onSelect}){


return(

<div>

<h2 className="title">
「✦เลือกกล้องที่ต้องการเช็คคิว📸✦」
</h2>


<div className="camera-list">


{
cameras.map(camera=>(

<div 
className="camera-card"
key={camera.id}
>


<img 
src={camera.image}
className={camera.className}
/>


<h3>
{camera.name}
</h3>


<button
onClick={()=>{

console.log(camera)

onSelect(camera)

}}
>
⤷เช็คคิว
</button>


</div>

))

}


</div>


</div>

)

}


export default CameraList
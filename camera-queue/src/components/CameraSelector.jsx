function CameraSelector({cameras, onSelect}){


return(

<div>

<h2>
เลือกกล้อง
</h2>


{
cameras.map((camera)=>(

<div className="camera-card" key={camera.id}>


<img 
src={camera.image}
/>


<h3>
{camera.name}
</h3>


<button
onClick={()=>onSelect(camera)}
>
เลือกกล้อง
</button>


</div>

))

}


</div>

)

}


export default CameraSelector
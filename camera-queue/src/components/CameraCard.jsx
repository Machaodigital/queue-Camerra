function CameraCard({image, name, onSelect}){

  return(
    <div className="camera-card">

      <img src={image}/>

      <h2>
        {name}
      </h2>

      <button onClick={onSelect}>
        เลือกกล้อง
      </button>

    </div>
  )
}



export default CameraCard


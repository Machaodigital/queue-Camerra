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

.camera-card{

background:white;

width:250px;

padding:20px;

border-radius:25px;

box-shadow:
0 10px 25px rgba(255,120,180,.15);

transition:.3s;

}



.camera-card:hover{

transform:translateY(-8px);

box-shadow:
0 15px 35px rgba(255,120,180,.25);

}

export default CameraCard


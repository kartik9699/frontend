import React from 'react'

function Slider() {
  return (
    <div>
        <div className="slider">
      <div
  className="carousel slide carousel-fade "
  id="carouselExampleFade"

>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        alt="..."
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8fA%3D%3D"
        style={{
            height: '50vh',
            objectFit: 'cover',
            
        }}
      />
    </div>
    <div className="carousel-item">
      <img
        alt="..."
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D"
        style={{
            height: '50vh',
            objectFit: 'cover',

        }}
      />
    </div>
    <div className="carousel-item">
      <img
        alt="..."
        className="d-block w-100 "
        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{
            height: '50vh',
            objectFit: 'cover',
            
        }}
         />
        

    </div>
    <form className="d-flex" style={
      {
        position: 'absolute',
        top: '80%',
width:'90%',
left: '5%',
      }
    }>
    <input
      aria-label="Search"
      className="form-control me-2 text-light"
      placeholder="Search"
      type="search"
      style={{
        zIndex:200000,
        width:'80%',
        background:'grey'
      }}
    />
    <button
    style={{
      zIndex:200000
    }}
      className="btn btn-success"
      type="submit"
    >
      Search
    </button>
  </form>
  
  </div>
  
  <button
    className="carousel-control-prev"
    data-bs-slide="prev"
    data-bs-target="#carouselExampleFade"
    type="button"
  >
    <span
      aria-hidden="true"
      className="carousel-control-prev-icon"
    />
    <span className="visually-hidden">
      Previous
    </span>
  </button>
  <button
    className="carousel-control-next"
    data-bs-slide="next"
    data-bs-target="#carouselExampleFade"
    type="button"
  >
    <span
      aria-hidden="true"
      className="carousel-control-next-icon"
    />
    <span className="visually-hidden">
      Next
    </span>
  </button>
  
</div>

    </div>
    </div>
  )
}

export default Slider

import Navbar from '../Components/Navbar'
//import Slider from '../Components/Slider'
import Card from '../Components/Card'
import Footer from '../Components/Footer'
import { useEffect, useState, useMemo } from 'react'

function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/DisplayData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "All" })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setFoodCat(data[1]);
      setItems(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);
console.log(foodCat);
  // Memoize filtered items
  const filteredItems = useMemo(() => {
    return items.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div>
        <div
          className="carousel slide carousel-fade"
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
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{
                  height: '50vh',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="d-flex" style={{
              position: 'absolute',
              top: '80%',
              width: '90%',
              left: '5%',
            }}>
              <input
                aria-label="Search"
                className="form-control me-2 text-light"
                placeholder="Search"
                type="search"
                value={search}
                onChange={handleSearch}
                style={{
                  zIndex: 200000,
                  width: '100%',
                  background: 'grey'
                }}
              />
              {/* <button
                style={{
                  zIndex: 200000
                }}
                className="btn btn-success"
                type="submit"
              >
                Search
              </button> */}
            </div>
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
      <div className="container">
        {
          foodCat.length > 0 ? foodCat.map((item) => (
            <div key={item._id} className='row mb-3'>
              <div className='fs-3 m-3'>{item.CategoryName}</div>
              <hr />
              {
                filteredItems.filter((food) => food.CategoryName === item.CategoryName).length > 0 ? filteredItems.filter((food) => food.CategoryName === item.CategoryName).map(filterItems => (
                  <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                    <Card FoodItem={filterItems} options={filterItems.options[0]} />
                  </div>
                )) : <div>No items found</div>
              }
            </div>
          )) : <div>No data found</div>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Home;

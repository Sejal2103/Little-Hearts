import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards'
import { useState, useEffect } from 'react';
export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [search,setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    response = await response.json();
    setFoodData(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <div>
      <Navbar />
      <div className='mt-8'>
        <h1 className='text-center title font-medium text-2xl'>WHAT ARE YOU LOOKING FOR?</h1>
       
          <div className="container mx-auto w-200">
            <div className="flex justify-center items-center mt-4 space-x-4">
              <input
                className=" border border-gray-300 rounded px-4 py-2 outline-none focus:border-blue-500 focus:border-blue-300 focus:ring focus:ring-blue-300"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange = {(e)=>{setSearch(e.target.value)}}
              />
              {/* <button
                className="search px-4 py-2 rounded"
                type="submit"
              >
                Search
              </button> */}
            </div>
          </div>

      </div>
      <div>
        {
          foodCat !== [] ? foodCat.map((data) => {
            return (
              <div className='row mb-3 m-10'>
                <div key={data._id} className="title text-2xl text-center font-bol mb-2">{data.CategoryName}</div>
                <hr />
                {
                  foodData !== [] ? foodData.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filteredItems => {
                    return (
                      <div className="mt-3 col-12 col-md-6 col-lg-3 justify-content-center" key={filteredItems._id}>
                        <Cards 
                          foodItem={filteredItems}
                          //img={filteredItems.img}
                          //name={filteredItems.name}
                          desc={filteredItems.description}
                          //price={filteredItems.price}
                          options={filteredItems.options[0]}
                        />
                      </div>
                    )
                  })
                    : <div> " "</div>
                }
              </div>
            )
          }) :
            <div>No data found to display</div>

        }
      </div>

      <Footer />
    </div>
  )
}

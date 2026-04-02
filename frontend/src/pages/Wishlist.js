import { useEffect, useState } from "react";
import API from "../api";

function Wishlist() {
  const [listings, setListings] = useState([]);
  const [likes, setLikes] = useState({});

  const user = localStorage.getItem("userEmail");

useEffect(() => {
  const savedLikes =
    JSON.parse(localStorage.getItem(`wishlist_${user}`)) || {};

  setLikes(savedLikes);

  API.get("/listings").then(res => {
    const likedListings = res.data.filter(l => savedLikes[l._id]);
    setListings(likedListings);
  });
}, [user]);

  // ❤️ REMOVE FROM WISHLIST

const handleRemove = (id) => {
  const updated = { ...likes };
  delete updated[id];

  setLikes(updated);

  localStorage.setItem(
    `wishlist_${user}`,
    JSON.stringify(updated)
  );

  setListings(listings.filter(l => l._id !== id));
};

  return (
    <div className="p-10">

      <h2 className="text-2xl font-bold mb-6">
        My Wishlist 💖
      </h2>

      {listings.length === 0 ? (
        <p>No liked properties yet 😔</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {listings.map(l => (
            <div
              key={l._id}
              className="bg-white shadow-md rounded-xl p-4 relative"
            >

              {/* ❤️ REMOVE BUTTON */}
              <button
                onClick={() => handleRemove(l._id)}
                className="absolute top-3 right-3 text-2xl"
              >
                ❤️
              </button>

              <img
                src={l.image}
                alt=""
                className="h-40 w-full object-cover rounded"
              />

              <h3 className="mt-2 font-semibold">{l.title}</h3>
              <p className="text-gray-500">{l.location}</p>
              <p className="text-red-500 font-bold">₹{l.price}</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;
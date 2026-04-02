import { useEffect, useState } from "react";
import API from "../api";

function Home() {
  const currentUser = localStorage.getItem("userEmail");

  const [likes, setLikes] = useState({});
  const [listings, setListings] = useState([]);
  const [dates, setDates] = useState({});
  const [search, setSearch] = useState("");

  // 🔥 Load listings
  useEffect(() => {
    API.get("/listings").then(res => setListings(res.data));
  }, []);

  // ❤️ Load wishlist (user-specific)
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`wishlist_${currentUser}`)) || {};
    setLikes(saved);
  }, [currentUser]);

  // 📅 BOOKING FUNCTION WITH AVAILABILITY CHECK
  const handleBooking = async (listingId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const selectedDates = dates[listingId];

    if (!selectedDates || !selectedDates.from || !selectedDates.to) {
      alert("Please select both dates");
      return;
    }

    try {
      const user = localStorage.getItem("userEmail");

      await API.post("/bookings", {
        user,
        listing: listingId,
        fromDate: selectedDates.from,
        toDate: selectedDates.to
      });

      alert("Booking successful!");
    } catch (err) {
      console.log(err);

      // 🔥 Availability check message
      if (err.response?.data?.msg) {
        alert(err.response.data.msg);
      } else {
        alert("Booking failed");
      }
    }
  };

  // ❤️ TOGGLE WISHLIST
  const handleLike = (id) => {
    const updated = { ...likes, [id]: !likes[id] };

    setLikes(updated);

    localStorage.setItem(
      `wishlist_${currentUser}`,
      JSON.stringify(updated)
    );
  };

  return (
    <div className="p-10">

      {/* 🔍 SEARCH */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by location or title..."
          className="w-full max-w-md border p-3 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* 🏡 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {listings
          .filter(l =>
            l.title.toLowerCase().includes(search.toLowerCase()) ||
            l.location.toLowerCase().includes(search.toLowerCase())
          )
          .map(l => (
            <div
              key={l._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 p-4"
            >

              {/* IMAGE */}
              <img
                src={l.image}
                alt="property"
                className="h-52 w-full object-cover rounded-xl"
              />

              {/* CONTENT */}
              <div className="mt-3">

                <h2 className="text-lg font-semibold">{l.title}</h2>
                <p className="text-gray-500 text-sm">{l.location}</p>

                <p className="text-red-500 font-bold mt-1">₹{l.price}</p>

                <p className="text-gray-400 text-sm mt-1">
                  {l.description}
                </p>

                {/* 📅 DATE INPUTS */}
                <div className="flex flex-col gap-2 mt-3">
                  <input
                    type="date"
                    className="border rounded p-2 text-sm w-full"
                    onChange={e =>
                      setDates({
                        ...dates,
                        [l._id]: {
                          ...dates[l._id],
                          from: e.target.value
                        }
                      })
                    }
                  />

                  <input
                    type="date"
                    className="border rounded p-2 text-sm w-full"
                    onChange={e =>
                      setDates({
                        ...dates,
                        [l._id]: {
                          ...dates[l._id],
                          to: e.target.value
                        }
                      })
                    }
                  />
                </div>

                {/* 🔘 BUTTONS */}
                <div className="flex justify-between items-center mt-4">

                  {/* ❤️ WISHLIST */}
                  <button
                    onClick={() => handleLike(l._id)}
                    className="text-2xl"
                  >
                    {likes[l._id] ? "❤️" : "🤍"}
                  </button>

                  {/* 🛒 BOOK */}
                  <button
                    onClick={() => handleBooking(l._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                  >
                    Book Now
                  </button>

                </div>

              </div>

            </div>
          ))}

      </div>

    </div>
  );
}

export default Home;
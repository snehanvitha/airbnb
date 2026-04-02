import { useEffect, useState } from "react";
import API from "../api";

function MyListings() {
  const [listings, setListings] = useState([]);
  const currentUser = localStorage.getItem("userEmail");

  useEffect(() => {
    API.get("/listings").then(res => {
      const myData = res.data.filter(
        l => l.user?.toLowerCase() === currentUser?.toLowerCase()
      );
      setListings(myData);
    });
  }, [currentUser]);

  // 🗑️ DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/listings/${id}`);

      // 🔥 remove from UI instantly
      setListings(listings.filter(l => l._id !== id));

      alert("Deleted successfully!");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-10">

      <h2 className="text-2xl font-bold mb-6">
        My Properties
      </h2>

      {listings.length === 0 && (
        <p className="text-gray-500">No properties found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {listings.map(l => (
          <div
            key={l._id}
            className="bg-white rounded-xl shadow-md p-4 relative"
          >

            {/* 🗑️ DELETE ICON */}
            <button
              onClick={() => handleDelete(l._id)}
              className="absolute top-3 right-3 text-red-500 text-xl"
            >
              🗑️
            </button>

            <img
              src={l.image}
              alt=""
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-2 font-semibold">{l.title}</h3>
            <p className="text-gray-500 text-sm">{l.location}</p>
            <p className="text-red-500 font-bold">₹{l.price}</p>

            {/* ✏️ EDIT */}
            <button
              onClick={() => window.location.href = `/edit/${l._id}`}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyListings;
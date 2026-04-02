import { useState, useEffect } from "react";
import API from "../api";

function AddListing() {
  const [data, setData] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: ""
  });

  // 🔐 Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  // 🚀 Submit function
  const handleSubmit = async () => {
    if (!data.title || !data.location || !data.price) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // 👤 Get logged-in user
      const user = localStorage.getItem("userEmail");

      // 🖼️ Final data
      const finalData = {
        ...data,
        image:
          data.image && data.image.trim() !== ""
            ? data.image
            : "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        user
      };

      console.log("Sending data:", finalData); // 🔥 debug

      await API.post("/listings", finalData);

      alert("Property Added Successfully!");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Error adding property");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Add Property
        </h2>

        <input
          placeholder="Title"
          className="w-full border p-3 rounded-lg mb-4"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
        />

        <input
          placeholder="Location"
          className="w-full border p-3 rounded-lg mb-4"
          value={data.location}
          onChange={e => setData({ ...data, location: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-lg mb-4"
          value={data.price}
          onChange={e => setData({ ...data, price: e.target.value })}
        />

        <input
          placeholder="Image URL"
          className="w-full border p-3 rounded-lg mb-4"
          value={data.image}
          onChange={e => setData({ ...data, image: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded-lg mb-4"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Add Property
        </button>

      </div>
    </div>
  );
}

export default AddListing;
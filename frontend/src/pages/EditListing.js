import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function EditListing() {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    console.log("Edit ID:", id);
    API.get("/listings").then(res => {
      const item = res.data.find(l => l._id.toString() === id);
      setData(item);
    });
  }, [id]);

  const handleUpdate = async () => {
  try {
    console.log("Updating ID:", id);
    console.log("Data:", data);

    await API.put(`/listings/${id}`, data);

    alert("Updated Successfully!");
    window.location.href = "/";
  } catch (err) {
    console.log(err);   // 🔥 SEE ERROR
    alert("Update failed");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4">Edit Property</h2>

        <input
          value={data.title || ""}
          onChange={e => setData({ ...data, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <input
          value={data.location || ""}
          onChange={e => setData({ ...data, location: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <input
          value={data.price || ""}
          onChange={e => setData({ ...data, price: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <input
          value={data.image || ""}
          onChange={e => setData({ ...data, image: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <textarea
          value={data.description || ""}
          onChange={e => setData({ ...data, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={handleUpdate}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Update Property
        </button>

      </div>

    </div>
  );
}

export default EditListing;
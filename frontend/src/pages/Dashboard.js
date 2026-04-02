import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const currentUser = localStorage.getItem("userEmail");

  useEffect(() => {
    API.get("/bookings")
      .then(res => {
        console.log("Current User:", currentUser);
        console.log("All Bookings:", res.data);

        // ✅ FILTER ONLY CURRENT USER BOOKINGS
        const myBookings = res.data.filter(b =>
          b.user?.toLowerCase() === currentUser?.toLowerCase()
        );

        setBookings(myBookings);
      })
      .catch(err => console.log(err));
  }, [currentUser]);

  return (
    <div className="p-8 min-h-screen bg-gray-100">

      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet 😔</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {bookings.map(b => (
            <div
              key={b._id}
              className="bg-white shadow-md rounded-xl p-5"
            >
              <p className="text-gray-500 text-sm">Listing ID</p>
              <p className="font-semibold">{b.listing}</p>

              <p className="mt-2 text-gray-500 text-sm">From</p>
              <p>{b.fromDate}</p>

              <p className="mt-2 text-gray-500 text-sm">To</p>
              <p>{b.toDate}</p>

              <p className="mt-2 text-green-500 text-sm">
                Booked by you
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Dashboard;
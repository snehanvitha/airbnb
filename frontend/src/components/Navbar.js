import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      
      <h1 className="text-2xl font-extrabold text-red-500 tracking-wide">
        Airbnb
      </h1>
<a href="/my-listings">My Listings</a>
<a href="/wishlist">Wishlist</a>
      <div className="flex gap-6 items-center font-medium">

        <Link to="/" className="hover:text-red-500 transition">Home</Link>

        {!token && (
          <>
            <Link to="/login" className="hover:text-red-500 transition">Login</Link>
            <Link to="/register" className="hover:text-red-500 transition">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/add" className="hover:text-red-500">Add</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>

            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
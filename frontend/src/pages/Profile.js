function Profile() {
  const email = localStorage.getItem("userEmail");

  const name = email ? email.split("@")[0] : "User";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">

        {/* Avatar */}
        <div className="w-20 h-20 mx-auto bg-red-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {name[0]?.toUpperCase()}
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold mt-4">
          {name}
        </h2>

        {/* Email */}
        <p className="text-gray-500">
          {email}
        </p>

        {/* Status */}
        <div className="mt-6">
          <p className="text-sm text-gray-400">User Status</p>
          <p className="text-green-500 font-semibold">Active</p>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            window.location.href = "/login";
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;
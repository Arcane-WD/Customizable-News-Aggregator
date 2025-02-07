import React from "react";

export default function UserProfile() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Web Developer | Tech Enthusiast | Blogger",
    profilePicture: "https://via.placeholder.com/150",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
        <p className="mt-2 text-gray-700">{user.bio}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

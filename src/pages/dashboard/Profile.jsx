import React from "react";
import { MdEdit } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const Profile = () => {

        const {user} = useAuth();
        console.log(user)
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-full mx-auto lg:max-w-4/5 bg-white rounded-lg shadow-sm">
        {/* Profile Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-900">
               {user.displayName}
              </h2>
              <p className="text-sm text-gray-600">Admin</p>
              <p className="text-sm text-gray-500">Leeds, United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary  text-white rounded-md text-sm font-medium transition-colors w-full sm:w-auto justify-center sm:px-3 sm:py-1.5 sm:text-xs">
              Edit
              <MdEdit className="w-4 h-4 sm:w-3 sm:h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                First Name
              </label>
              <p className="text-sm text-gray-900">{user.displayName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Last Name
              </label>
              <p className="text-sm text-gray-900">{user.displayName}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Created At
              </label>
              <p className="text-sm text-gray-900">{user.metadata.creationTime}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Email Address
              </label>
              <p className="text-sm text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Phone Number
              </label>
              <p className="text-sm text-gray-900">(+62) 87-2554-5846</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                User Role
              </label>
              <p className="text-sm text-gray-900">Admin</p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors text-sm sm:text-xs">
              Edit
              <MdEdit className="w-4 h-4 sm:w-3 sm:h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Country
              </label>
              <p className="text-sm text-gray-900">United Kingdom</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                City
              </label>
              <p className="text-sm text-gray-900">Leeds, East London</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Postal Code
              </label>
              <p className="text-sm text-gray-900">ERT 1254</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

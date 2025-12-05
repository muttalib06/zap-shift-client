import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import { FaCamera, FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Handler } from "leaflet";
import axios from "axios";
const Profile = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const modalRef = useRef(null);

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  // update userinfo;

  const handleUpdate = (data) => {
    setLoading(true);
    const file = data.imageUrl[0];

    // send image to the imageBB;
    const formData = new FormData();
    formData.append("image", file);
    const uploadImgURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_API_KEY
    }`;

    axios.post(uploadImgURL, formData).then((res) => {
      const photoUrl = res.data.data.url;
      const name = data.name;
      updateUserProfile(name)
        .then(() => {
          setUser({ ...user, displayName: name, photoURL: photoUrl });
          modalRef.current.close();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const { register, handleSubmit } = useForm();

  const handleModal = () => {
    modalRef.current.showModal();
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <Error></Error>;
  }
  if (loading) {
    return <Spinner></Spinner>;
  }

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
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-900">
                {user.displayName}
              </h2>
              <p className="text-sm text-gray-600">{userInfo.userRole}</p>
              <p className="text-sm text-gray-500">{userInfo.country}</p>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h3>
            <button
              onClick={() => handleModal()}
              className="flex items-center gap-2 px-4 py-2 bg-primary  text-white rounded-md text-sm font-medium transition-colors w-full sm:w-auto justify-center sm:px-3 sm:py-1.5 sm:text-xs"
            >
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
                Last SignIn Time
              </label>
              <p className="text-sm text-gray-900">
                {new Date(user.metadata.lastSignInTime).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Created At
              </label>
              <p className="text-sm text-gray-900">
                {new Date(user.metadata.creationTime).toLocaleString()}
              </p>
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
              <p className="text-sm text-gray-900">{userInfo.phone}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                User Role
              </label>
              <p className="text-sm text-gray-900">{userInfo.userRole}</p>
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
              <p className="text-sm text-gray-900">{userInfo.country}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                City
              </label>
              <p className="text-sm text-gray-900">{userInfo.city}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Postal Code
              </label>
              <p className="text-sm text-gray-900">{userInfo.postalCode}</p>
            </div>
          </div>
        </div>

        {/* modal */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex justify-center items-center flex-col">
              <div>
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={user.photoURL}
                  alt=""
                />
                <p>{user.displayName}</p>
              </div>
              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-2">
                <label>Name</label>
                <input
                  defaultValue={user.displayName}
                  type="text"
                  {...register("name")}
                  placeholder="Type here"
                  className="input"
                />{" "}
                <br />
                <label>Image</label>
                <input
                  {...register("imageUrl")}
                  type="file"
                  className="file-input"
                />
                <div>
                  <button type="submit" className="btn bg-primary">
                    Change
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Profile;

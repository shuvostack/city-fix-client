import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  UserPlus,
  Mail,
  Phone,
  Lock,
  Camera,
  Edit,
  Trash2,
  X,
  Save,
  Search,
  MoreVertical,
} from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/shared/Loader/Loader";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null); 


  const {
    data: staffMembers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/staff");
      return res.data;
    },
  });

  // filter
  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.email.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleDelete = (staff) => {
    Swal.fire({
      title: "Remove Staff Member?",
      text: `Are you sure you want to remove ${staff.name}? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove staff!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
         await axiosSecure.delete(`/users/admin/${staff._id}`); 

          const deleteRes = await axiosSecure.delete(`/users/${staff._id}`); 

          if (deleteRes.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Staff has been removed.", "success");
          }
        } catch (error) {
          console.error(error);
          toast.error("Ensure DELETE /users/:id API exists in backend");
        }
      }
    });
  };


  const openModal = (staff = null) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );

  return (
    <div className="font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-fade-in-down">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Briefcase className="text-primary" /> Manage Staff
          </h1>
          <p className="text-gray-500 mt-1">
            Add, update, or remove staff members.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary text-sm shadow-sm"
            />
          </div>

          <button
            onClick={() => openModal(null)}
            className="px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2"
          >
            <UserPlus size={18} /> Add Staff
          </button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Staff Member</th>
                <th className="p-5">Contact Info</th>
                <th className="p-5">Role Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStaff.map((staff) => (
                <tr
                  key={staff._id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  {/* Profile */}
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          staff.photo || "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt=""
                        className="w-12 h-12 rounded-xl border border-gray-200 object-cover shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">
                          {staff.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          UID: {staff._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="p-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Mail size={12} className="text-primary" />{" "}
                        {staff.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone size={12} className="text-primary" />{" "}
                        {staff.phone || "N/A"}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                      <Briefcase size={12} /> Official Staff
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openModal(staff)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors tooltip tooltip-left"
                        data-tip="Update Info"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(staff)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors tooltip tooltip-left"
                        data-tip="Remove Staff"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStaff.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No staff members found. Add one to get started.
          </div>
        )}
      </div>

     
      {isModalOpen && (
        <StaffModal
          staff={editingStaff}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
          axiosSecure={axiosSecure}
        />
      )}
    </div>
  );
};



// Staff Modal
const StaffModal = ({ staff, closeModal, refetch, axiosSecure }) => {
  const isEditMode = !!staff;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: staff?.name || "",
      email: staff?.email || "",
      phone: staff?.phone || "",
      photo: staff?.photo || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEditMode) {
        const updateData = {
          name: data.name,
          phone: data.phone,
          photo: data.photo,
        };

        const res = await axiosSecure.patch(`/users/admin/${staff._id}`, {
          ...updateData,
        }); 

        if (res.data.modifiedCount > 0) {
          toast.success("Staff updated successfully!");
          refetch();
          closeModal();
        }
      } else {
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        const secondaryAuth = getAuth(secondaryApp);

        const userCredential = await createUserWithEmailAndPassword(
          secondaryAuth,
          data.email,
          data.password
        );
        const newUser = userCredential.user;

        await updateProfile(newUser, {
          displayName: data.name,
          photoURL: data.photo,
        });

        // Save to Database
        const staffData = {
          name: data.name,
          email: data.email,
          photo: data.photo,
          phone: data.phone,
          role: "staff",
          isBlocked: false,
          isVerified: true, 
          uid: newUser.uid,
        };

        const dbRes = await axiosSecure.post("/users", staffData);

        if (dbRes.data.insertedId) {
          toast.success("Staff account created successfully!");
          refetch();
          closeModal();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-zoom-in overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            {isEditMode ? (
              <Edit size={18} className="text-blue-600" />
            ) : (
              <UserPlus size={18} className="text-green-600" />
            )}
            {isEditMode ? "Update Staff Info" : "Add New Staff"}
          </h3>
          <button onClick={closeModal}>
            <X size={20} className="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Briefcase size={12} /> Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. John Doe"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Mail size={12} /> Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              readOnly={isEditMode}
              placeholder="e.g. staff@cityfix.com"
              className={`w-full p-3 border rounded-xl outline-none transition-all 
                              ${
                                isEditMode
                                  ? "bg-gray-100 text-gray-500 border-transparent cursor-not-allowed"
                                  : "bg-white border-gray-200 focus:border-primary"
                              }`}
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Phone size={12} /> Phone Number
            </label>
            <input
              {...register("phone")}
              placeholder="e.g. +880 17..."
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Photo URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
              <Camera size={12} /> Photo URL
            </label>
            <input
              {...register("photo")}
              placeholder="Your PhotoURL"
              className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Password */}
          {!isEditMode && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Lock size={12} /> Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 chars" },
                })}
                placeholder="••••••••"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none transition-all"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Save size={18} />
            )}
            {isEditMode ? "Save Changes" : "Create Staff Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageStaff;

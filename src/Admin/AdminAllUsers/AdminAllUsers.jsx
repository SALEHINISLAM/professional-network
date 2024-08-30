import React, { useState } from "react";
import useLoadAllUserForAdmin from "../../hooks/useLoadAllUserForAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllUsers = () => {
  const { allUsers, isLoading, error, refetch } = useLoadAllUserForAdmin();
  const [selectedValue,setSelectedValue]=useState('')
  const axiosSecure = useAxiosSecure();
  if (isLoading) {
    return <span className="loading"></span>;
  }
  if (error) {
    return <span>Error Handling Jobs</span>;
  }
  const handleMakeAdmin = async (id) => {
    if (selectedValue && selectedValue !== "default") {
        console.log(id)
      await axiosSecure.patch(`/users/admin/${id}`, { role: selectedValue })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire(`Role changed`);
            refetch();
          }
        })
        .catch(error => {
          console.error("Error updating role:", error);
          Swal.fire("Failed to update role. Please try again.");
        });
    } else {
      Swal.fire("Please select a valid role before saving.");
    }
  };

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value)
  };
  return (
    <>
      <h2 className="container mx-auto text-4xl font-bold py-8">
        All Users in Professional Network
      </h2>

      <div className="overflow-x-auto container mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers
              ? allUsers.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        src={user?.userProfilePhotoURL}
                        alt=""
                        className="h-12 w-12 rounded-full"
                      />
                    </td>
                    <td>{user?.name}</td>
                    <td className="flex gap-4 items-center">
                      Role: {user?.role}
                    </td>
                    <td >
                        <div className="flex flex-col gap-2">
                        <select className="select select-bordered  max-w-xs" onChange={handleSelect}>
                        <option value={"default"}>Change Role</option>
                        <option value={'admin'}>Admin</option>
                        <option value={"jobSeeker"}>Job Seeker</option>
                        <option value={"employer"}>
                          Employer (Job Provider)
                        </option>
                        <option value={"entrepreneur"}>Entrepreneur</option>
                      </select>
                      <button className="btn max-w-xs" onClick={()=>handleMakeAdmin(user._id)}>
                        Save Change
                      </button>
                        </div>
                     
                    </td>
                  </tr>
                ))
              : "No jobs found"}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminAllUsers;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";


const UpdateEmployeePage = () => {
  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  // Fetch the employee details based on the ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/getallUsers`
        );
        const data = await response.json();
        const employeeData = data.data.find((emp) => emp._id === id);
        setEmployee(employeeData);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/updateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        navigate("/"); // Redirect to home page after successful update
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover object-top"
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                Update Employee Details
              </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
              Update Employee
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
              <Link
                to={"/"}
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
              >
                <FaBackward />
                Back to all Employee List
              </Link>
            </p>

            <EmployeeForm
              initialData={employee} // Pass the employee data to the form
              onSubmit={handleUpdate} // Handle form submission
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateEmployeePage;
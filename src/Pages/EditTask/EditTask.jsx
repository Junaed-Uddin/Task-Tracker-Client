import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillFileAdd } from "react-icons/ai";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DarkModeProvider } from "../../contexts/DarkModeContext";
import { ImSpinner9 } from "react-icons/im";

const EditTask = () => {
  const { theme } = useContext(DarkModeProvider);
  const navigate = useNavigate();
  const editTask = useLoaderData();
  const [storedTask, setStoredTask] = useState(editTask.data);
  const { _id, taskName, desc } = editTask.data;
  const [spinner, setSpinner] = useState(false);

  const handleEdit = (event) => {
    setSpinner(true);
    event.preventDefault();
    fetch(`https://my-app-server-ruddy.vercel.app/editTask/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storedTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSpinner(false);
          toast.success(data.message);
          navigate("/MyTask");
        } else {
          setSpinner(false);
          toast.error(data.message);
        }
      });
  };

  const handleInput = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newTask = { ...storedTask };
    newTask[field] = value;
    setStoredTask(newTask);
  };

  return (
    <div className="w-full max-w-md mx-auto p-3 sm:p-8 space-y-3 rounded-xl">
      <div className="mt-10 mb-5">
        <h2
          className={`text-2xl sm:text-3xl ${
            theme === "light" ? "text-violet-500" : "text-white"
          } font-bold text-center`}
        >
          Update Your Task
        </h2>
      </div>
      <div
        className={`flex flex-col max-w-md p-6 rounded-md sm:py-7 sm:px-7  text-gray-900 ${
          theme === "light" ? "bg-gray-50" : "bg-darkBlack"
        }`}
      >
        <form onSubmit={handleEdit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <input
                onChange={handleInput}
                type="text"
                defaultValue={taskName}
                name="taskName"
                placeholder="Add Task Name"
                className={`w-full ${
                  theme === "light" ? "" : "bg-lightDark text-white border-none"
                } px-3 py-2 border rounded-md border-gray-300`}
                required
              />
            </div>

            <div>
              <input
                onChange={handleInput}
                type="text"
                defaultValue={desc}
                name="desc"
                placeholder="Add Task Description"
                className={`w-full ${
                  theme === "light" ? "" : "bg-lightDark text-white border-none"
                } px-3 py-2 border rounded-md border-gray-300`}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="bg-violet-500 w-full flex justify-center items-center rounded-md py-2.5 px-3 text-white text-md shadow-md hover:bg-violet-700 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-500 active:shadow-lg transition duration-150 ease-in-out"
              >
                <ImSpinner9
                  className={`${spinner ? "animate-spin" : "hidden"}`}
                />
                <AiFillFileAdd
                  className={`${spinner ? "hidden" : ""}`}
                ></AiFillFileAdd>
                <span className={`px-1 ${spinner ? "hidden" : ""}`}>
                  Update Task
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;

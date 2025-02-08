import { useContext, useState } from "react";
import { AiFillEye, AiOutlineFileDone } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import Loader from "../../Components/Loader/Loader";
import { DarkModeProvider } from "../../contexts/DarkModeContext";
import { ImSpinner9 } from "react-icons/im";

const MyTask = () => {
  const [spinner, setSpinner] = useState({});
  const { theme } = useContext(DarkModeProvider);
  const {
    data: AllTasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const res = await fetch(
        "https://my-app-server-ruddy.vercel.app/allTasks"
      );
      const data = await res.json();
      return data.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleDelete = (task) => {
    Swal.fire({
      title: `Are you sure to delete ${task.taskName}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://my-app-server-ruddy.vercel.app/task/${task._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              refetch();
            } else {
              toast.error(data.message);
            }
          });

        Swal.fire("Deleted!", `${task.taskName} has been deleted`, "success");
      }
    });
  };

  const handleCompleteTask = (task) => {
    setSpinner((prevState) => ({ ...prevState, [task._id]: true }));
    if (task.status === "complete") {
      setSpinner((prevState) => ({ ...prevState, [task._id]: false }));
      return toast.error("Already Completed");
    }

    fetch(`https://my-app-server-ruddy.vercel.app/taskStatus/${task._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(data.message);
          setSpinner((prevState) => ({ ...prevState, [task._id]: false }));
          refetch();
        } else {
          setSpinner((prevState) => ({ ...prevState, [task._id]: false }));
          toast.error(data.message);
        }
      });
  };

  return (
    <section>
      <h2
        className={`text-3xl ${
          theme === "light" ? "text-violet-500" : "text-white"
        } font-bold mt-8 ml-14`}
      >
        My Tasks
      </h2>
      <div className="p-2 mx-auto sm:max-w-xl md:max-w-full lg:mx-5 rounded mt-4 md:px-10">
        <div className="overflow-x-auto">
          <table className="w-full p-6 whitespace-nowrap text-center">
            <thead>
              <tr
                className={`${
                  theme === "light" ? "bg-white text-black" : "bg-gray-700"
                } border text-center`}
              >
                <th className="p-3">#</th>
                <th className="p-3">Task Name</th>
                <th className="p-3">Task Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody
              className={`border ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {AllTasks.map((task, i) => (
                <tr className="border" key={task?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <p>{task?.taskName}</p>
                  </td>
                  <td className="px-3 py-2">
                    <p>{task?.desc}</p>
                  </td>
                  <td className="px-3 py-2 items-center">
                    {task.status === "incomplete" ? (
                      <span className="px-2 text-sm py-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-500 text-white rounded">
                        {task?.status}
                      </span>
                    ) : (
                      <span className="px-2 text-sm py-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded">
                        {task?.status}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-2 flex justify-center items-center">
                    <Link to={`/viewMedia/${task._id}`}>
                      <button
                        className="text-violet-500 flex justify-center items-center border gap-1 shadow-lg mx-2 py-1.5 px-3 rounded outline-none transform active:scale-75 transition-transform"
                        type="button"
                      >
                        <AiFillEye size={20}></AiFillEye>
                        <span className="text-sm">View</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleCompleteTask(task)}
                      className="text-green-500 flex justify-center items-center border gap-1 shadow-lg py-1.5 px-3 rounded outline-none transform active:scale-75 transition-transform"
                      type="button"
                    >
                      <ImSpinner9
                        className={`mx-5 ${
                          spinner[task._id] ? "animate-spin" : "hidden"
                        }`}
                      ></ImSpinner9>
                      <AiOutlineFileDone
                        className={`${spinner[task._id] ? "hidden" : ""}`}
                        size={20}
                      ></AiOutlineFileDone>
                      <span
                        className={`text-sm ${
                          spinner[task._id] ? "hidden" : ""
                        }`}
                      >
                        Complete
                      </span>
                    </button>

                    <Link to={`/editTask/${task._id}`}>
                      <button
                        className="text-blue-500 flex justify-center items-center border gap-1 shadow-lg py-1.5 px-3 rounded mx-2 outline-none transform active:scale-75 transition-transform"
                        type="button"
                      >
                        <BiEdit size={20}></BiEdit>
                        <span className="text-sm">Edit</span>
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(task)}
                      className="text-red-500 flex justify-center items-center border gap-1 shadow-lg py-1.5 px-3 rounded outline-none transform active:scale-75 transition-transform"
                      type="button"
                    >
                      <MdDelete size={20}></MdDelete>
                      <span className="text-sm">Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyTask;

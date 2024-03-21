import { useEffect, useState,useRef } from "react";
import { createPortal } from "react-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import { FaGithub } from "react-icons/fa";
const Task = () => {
  const [inputValue, setInputValue] = useState("");
  const [showPortal, setShowPortal] = useState(false);
  const [updateTask, setUpdateTask] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState("");
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, mutate } = useSWR("/api/get", fetcher);
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/delete/${id}`);
      if (response.status === 201) {
        toast.success("Todo deleted successfully!", {
          position: "top-right",
        });
        mutate();
      } else {
        toast.warn("Something went wrong!", {
          position: "top-right",
        });
        mutate();
      }
    } catch (error) {
      toast.error("Failed to delete todo!", {
        position: "top-right",
      });
      mutate();
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`/api/update/${id}`, {
        toDo: updateTask,
      });
      if (response.status === 200) {
        setShowPortal(false);
        toast.success("Todo updated successfully!", {
          position: "top-right",
        });
        mutate();
      } else {
        toast.warn("Something went wrong!", {
          position: "top-right",
        });
        mutate();
      }
    } catch (error) {
      toast.error("Failed to update todo!", {
        position: "top-right",
      });
      mutate();
    }
  };

  const handleAdd = async () => {
    if (inputValue === "") {
      toast.warn("Write a todo!", {
        position: "top-right",
      });
    } else {
      try {
        const response = await axios.post("/api/save", {
          toDo: inputValue,
        });
        if (response.status === 201) {
          setInputValue("");
          toast.success("Todo added successfully!", {
            position: "top-right",
          });
          mutate();
        } else {
          toast.warn("Something went wrong!", {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("Failed to add todo!", {
          position: "top-right",
        });
      }
    }
  };

  function truncateText(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    } else {
      return text;
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };
  return (
    <>
      <div className="flex justify-center min-h-screen py-10  bg-slate-950 text-gray-200">
        <div className="w-4/5 flex flex-col items-center space-y-20 md:w-3/5">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">TodoExpress</h1>
            <h2 className="text-base text-end pt-2">by <a href="https://s-soumyakanta.com" target="_blank" className="text-xs font-mono hover:text-blue-600">s-soumyakanta.com</a></h2>
          </div>

          <div className="w-full h-full rounded-xl flex flex-col p-4 space-y-10 items-center">
            <div className="flex w-full h-12 rounded-lg md:h-16">
              <input
                type="text"
                className="w-4/5 rounded-l-lg pl-4 bg-slate-900 h-full text-gray-300"
                placeholder="Write a todo..."
                onKeyDown={handleKeyPress}
                ref={inputRef}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                value={inputValue}
              />
              <button
                onClick={handleAdd}
                className="w-1/5 bg-gray-300 rounded-r-lg text-black font-semibold text-lg h-full hover:bg-green-600 hover:text-white hover:shadow-md hover:shadow-gray-800"
              >
                ADD
              </button>
            </div>
            <div className="grid w-full gap-4  grid-cols-1 md:grid-cols-2">
              {data?.toReversed().map((todo) => {
                return (
                  <div
                    key={todo._id}
                    className="h-24 p-2 bg-gray-900 rounded-lg flex justify-between items-center"
                  >
                    <div className="w-10/12 h-full md:w-10/12 overflow-hidden">
                      <p className="whitespace-pre-wrap w-full h-full text-left truncate">
                        {truncateText(todo.toDo, 10)}
                      </p>
                    </div>

                    <div className="w-2/12 h-full flex flex-col justify-evenly bg-gray-700 rounded-lg items-center md:w-2/12 hover:shadow-sm ">
                      <button
                        onClick={() => (
                          setUpdateTask(todo.toDo),
                          setUpdateTaskId(todo._id),
                          setShowPortal(true)
                        )}
                        className="p-2 hover:bg-blue-600 rounded-full"
                      >
                        <MdEdit />
                      </button>
                      <button className="p-2 hover:bg-red-600 rounded-full" onClick={() => handleDelete(todo._id)}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      {showPortal &&
        createPortal(
          <div
            onClick={() => setShowPortal(false)}
            className="absolute top-0   bg-gray-950 bg-opacity-90 h-screen w-full flex justify-center items-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-4/5 bg-black bg-opacity-85 text-gray-300 rounded-xl flex space-y-12 justify-center items-center flex-col  h-2/5 md:w-2/5"
            >
              <div className="w-full flex justify-center items-center">
                <input
                  type="text"
                  className="w-4/5  h-16 pl-4 rounded-lg text-center bg-slate-900  text-gray-300"
                  onChange={(e) => {
                    setUpdateTask(e.target.value);
                  }}
                  value={updateTask}
                />
              </div>
              <div>
                <button
                  onClick={() => handleEdit(updateTaskId)}
                  className="p-2 px-5 bg-gray-300 rounded-lg text-black font-semibold text-lg h-full"
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

        <div className="absolute top-0 right-0 m-3 text-blue-600">
            <a href="#">
            <div className="flex text-xs justify-center items-center space-x-1">
            <FaGithub />
                <p>Source Code</p>
            </div>
                </a>
        </div>
    </>
  );
};

export default Task;

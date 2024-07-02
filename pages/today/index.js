import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TodayPage = () => {
  const dataTofetched = useSelector((state) => state.NametodoSlice.data);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    console.log(todo);
  }, [todo]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/apipost", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        console.log(data);
        setTodo(data.todos);
        dispatch(todoSliceAction.tododataFetched(data.todos));
      } catch (error) {}
    }
    fetchTodos();
  }, []);
  const completeTodoHandler = async (id, todoTask) => {
    try {
      // First, add the todoTask to the completed tasks collection
      const responsePost = await fetch("/api/apicomplete", {
        method: "POST",
        body: JSON.stringify({ todoTask }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responsePost.ok) {
        throw new Error("Failed to add todo to completed tasks");
      }

      const dataPost = await responsePost.json();
      console.log(dataPost);

      const responseDelete = await fetch("/api/apipost", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseDelete.ok) {
        throw new Error("Failed to delete todo from current tasks");
      }

      const dataDelete = await responseDelete.json();
      console.log(dataDelete);

      setTodo(todo.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <button className="btn text-green-500 bg-slate-50 px-2 py-2">
          <Link href="/">Home</Link>
        </button>
        <button className="btn text-green-500 bg-slate-50 px-2 py-2">
          <Link href="/today/completedtask">Completed Task</Link>
        </button>
      </div>
      <h1> this is a today page</h1>
      {todo.length > 0 ? (
        todo.map((todo) => {
          return (
            <div key={todo._id}>
              <p>
                <span className="text-red-500">{todo.task}</span>
              </p>
              <p>Completed : {todo.completed}</p>
              <button
                onClick={() => completeTodoHandler(todo._id, todo)}
                className="btn ml-2 text-green-500 border border-red-500 bg-slate-50 px-2 py-2"
              >
                Complete
              </button>
            </div>
          );
        })
      ) : (
        <p>No todos found</p>
      )}
    </div>
  );
};

export default TodayPage;

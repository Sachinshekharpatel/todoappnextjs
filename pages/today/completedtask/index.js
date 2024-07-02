import React, { useState, useEffect } from "react";
import Link from "next/link";
const CompletedTask = () => {
  const [completedTodo, setCompletedTodo] = useState([]);
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("/api/apicomplete", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        console.log(data);
        setCompletedTodo(data.todos);
      } catch (error) {}
    }
    fetchTodos();
  }, []);

  const deleteTodoHandler = (id, todoTodelete) => {
    console.log("tryingtodelete");

    fetch("/api/apicomplete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompletedTodo(completedTodo.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex gap-4">
        <button className="btn text-green-500 bg-slate-50 px-2 py-2">
          <Link href="/">Home</Link>
        </button>
        <button className="btn text-green-500 bg-slate-50 px-2 py-2">
          <Link href="/today">Today page </Link>
        </button>
      </div>
      {completedTodo.length > 0 ? (
        completedTodo.map((todo) => {
          return (
            <div key={todo._id}>
              <p>
                <span className="text-red-500">{todo.task.task}</span>
              </p>
              <button
                onClick={() => deleteTodoHandler(todo._id, todo)}
                className="btn ml-2 text-green-500 border border-red-500 bg-slate-50 px-2 py-2"
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <p>No Completed task found</p>
      )}
    </div>
  );
};

export default CompletedTask;

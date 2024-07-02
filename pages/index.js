import Link from "next/link";
import React, { useRef, useEffect, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { todoSliceAction } from "../components/redux";
export default function Home() {
  const inputRef = useRef();
  const dataTofetched = useSelector((state) => state.NametodoSlice.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(dataTofetched);
  }, [dataTofetched]);

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
        dispatch(todoSliceAction.tododataFetched(data.todos));
      } catch (error) {}
    }
    fetchTodos();
  }, []);

  async function addTodoHandler() {
    const todoTask = inputRef.current.value;

    try {
      const response = await fetch("/api/apipost", {
        method: "POST",
        body: JSON.stringify({todoTask}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(todoSliceAction.addTodo(todoTask));
      inputRef.current.value = "";
    } catch (error) {}
  }

  return (
    <Fragment>
      <h1>This is TODO List</h1>
      <button className="btn text-green-500 bg-slate-50 px-2 py-2">
        <Link href="/today">Click to view today's tasks</Link>
      </button>
      <br />
      <div>
        <textarea ref={inputRef}></textarea>
        <button
          onClick={addTodoHandler}
          className="btn ml-2 text-green-500 border border-red-500 bg-slate-50 px-2 py-2"
        >
          Add todo
        </button>
      </div>
    </Fragment>
  );
}

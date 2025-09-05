import React from "react";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos";

const FetchingOnEvents = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);

  const handleFetch = async () => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch(TODOS_API_URL);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      setTodos(json);
      setStatus("success");
    } catch (error) {
      console.log("error: ", error);
      setError(error instanceof Error ? error.message : "An error occurred");
      setStatus("error");
    }
  };

  return (
    <>
      <button onClick={handleFetch} disabled={status === "loading"}>
        {status === "loading" ? "Fetching Todos..." : "Fetch Todos"}
      </button>

      {status === "error" && error && <p>Error: {error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
};

export default FetchingOnEvents;

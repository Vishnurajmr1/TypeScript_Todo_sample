interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn")!;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;
const todos: Todo[] = readTodos();
todos.forEach(createTodo);
function readTodos(): Todo[] {
  const todoJson = localStorage.getItem("todos");
  if (todoJson === null) return [];
  return JSON.parse(todoJson);
}
function saveTodos():void{
    localStorage.setItem("todos",JSON.stringify(todos));
}
function handleSumbit(e: SubmitEvent) {
  e.preventDefault();
  const newTodo: Todo = {
    text: input.value,
    completed: false,
  };
  createTodo(newTodo);
  todos.push(newTodo);
  saveTodos();
  input.value = "";
}

function createTodo(todo: Todo) {
  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked=todo.completed;
  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    saveTodos();
  });
  newLi.append(todo.text);
  newLi.append(checkbox);
  list.append(newLi);
}
form.addEventListener("submit", handleSumbit);

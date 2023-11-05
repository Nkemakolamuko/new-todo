//MY TASK CRUD FUNCTIONS

//CREATE TASK FUNCTION
const todo_input = document.querySelector("#todo_input");
const DB_NAME = "todo_db";

const _cancelEdit_btn = document.getElementById("cancelEdit");
_cancelEdit_btn.classList.add("hidden");

const _create_todo_ = () => {
  if (todo_input.value.length > 30) {
    charLong();
    return;
  }
  if (!todo_input.value) {
    showMessage("Hey yo!! Can't add empty Task, can you?");
    return;
  }

  const _new_todo_ = {
    id: broofa(),
    title: todo_input.value,
    created_at: new Date().toLocaleDateString(),
  };

  let _todo_db_ = JSON.parse(localStorage.getItem(DB_NAME)) || []; // Default values... check to get, or get empty Array

  // add new todo to db array
  _todo_db_.unshift(_new_todo_);

  // localStorage.setItem(DB_NAME, JSON.stringify(_todo_db_)); // set updated back to local storage
  setDb(DB_NAME, _todo_db_);
  fetchTodos();
  todo_input.value = "";
};

//READ TASK FUNCTION
const fetchTodos = () => {
  const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  const _todo_list_container_ = document.getElementById("todo_list_container");
  const _no_todo_ = todo_db.length === 0;
  if (_no_todo_) {
    _todo_list_container_.innerHTML = `<p class="text-center pb-2 text-slate-500">Your Task will appear here buddy!!</p>`;
    return;
  }
  const todos = todo_db
    .sort((a, b) =>
      a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
    )
    .map((todo) => {
      return `<div
    class="flex justify-between py-3 px-2.5 rounded-lg hover:bg-gray-100 hover:text-black mb-4"
  >
    <button onclick="handlePreviewTodo('${todo.id}')" class="font-medium truncate underline underline-offset-1" id="handlePreviewTodo">${todo.title}</button>
    <section class="flex gap-3">
      <button class="border rounded-full p-1" onclick="_handle_edit_mode_('${todo.id}')">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
      </button>
      <button class="border rounded-full p-1" onclick="_delete_todo_('${todo.id}')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </section>
  </div>`;
    });

  _todo_list_container_.innerHTML = todos.join("");
};

//DELETE TASK FUNCTION
const _delete_todo_ = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // get todo
      const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
      // filter out the ones that doesn't match the id that was clicked
      const _new_todo_db_ = todo_db.filter((todo) => todo.id !== id);
      // set the new todos without the todo that matches the id to the local storage
      // localStorage.setItem(DB_NAME, JSON.stringify(_new_todo_db_));
      setDb(DB_NAME, _new_todo_db_);
      fetchTodos();
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else {
      return;
    }
  });
};

//UPDATE TASK FUNCTION
const _handle_edit_mode_ = (id) => {
  // get todo
  const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  const _todo_to_update_ = todo_db.find((todo) => todo.id === id);
  if (!_todo_to_update_) {
    return;
  }
  const todo_input = document.getElementById("todo_input");
  todo_input.value = _todo_to_update_.title;

  // Add autofocus attribute to focus on the input field
  todo_input.setAttribute("autofocus", "true");

  const _update_task_btn = document.getElementById("update_task_btn");
  _update_task_btn.classList.remove("hidden");
  _update_task_btn.setAttribute("_todo_id_to_update", id);

  // Display the cancel button
  const _cancelEdit_btn = document.getElementById("cancelEdit");
  _cancelEdit_btn.classList.remove("hidden");

  const _add_task_btn = document.getElementById("add_task_btn");
  _add_task_btn.classList.add("hidden");

  // removeCancelEdit();
};

// Function to Remove Cancel Edit
function removeCancelEdit() {
  const _cancelEdit_btn = document.getElementById("cancelEdit");
  _cancelEdit_btn.classList.add("hidden");
}

// Cancel Edit -> What happens when the  button is clicked
_cancelEdit_btn.addEventListener("click", function () {
  todo_input.value = "";
  const _update_task_btn = document.getElementById("update_task_btn");
  _update_task_btn.classList.add("hidden");

  const _add_task_btn = document.getElementById("add_task_btn");
  _add_task_btn.classList.remove("hidden");

  removeCancelEdit();
});

const _update_todo_ = () => {
  if (!todo_input.value) {
    showMessage("Yo!! Can't update empty Task, can you?");
    return;
  }
  const _update_task_btn = document.getElementById("update_task_btn");
  const _todo_id_to_update_ =
    _update_task_btn.getAttribute("_todo_id_to_update");

  // Hide the close button
  removeCancelEdit();
  // // get todo
  const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  const _updated_todo_db_ = todo_db.map((todo) => {
    if (todo.id === _todo_id_to_update_) {
      return { ...todo, title: todo_input.value };
    } else {
      return todo;
    }
  });

  // localStorage.setItem(DB_NAME, JSON.stringify(_updated_todo_db_));
  setDb(DB_NAME, _updated_todo_db_);
  fetchTodos();
  todo_input.value = "";

  _update_task_btn.classList.add("hidden");
  // cancelUpdate.classList.add("hidden");
  const _add_task_btn = document.getElementById("add_task_btn");
  _add_task_btn.classList.remove("hidden");
};

fetchTodos();

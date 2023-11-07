const DB_NAME = "todo_db";

const renderCurrentPreviewTodoId = () => {
  const todo_db = getDb("todo_db");
  const currentPreviewId = getDb("current_preview_todo_id");
  const currentTodo = todo_db.find((todo) => todo.id === currentPreviewId);
  const { title, id, created_at } = currentTodo;

  const todo_preview_container = document.getElementById(
    "todo_preview_container"
  );
  todo_preview_container.innerHTML = `
    
  <section class="flex justify-between">
  <h3 class="text-xl font-semibold">${title}</h3>
  <div class="flex items-center">
    <button
      class="border rounded-full p-1 hover:border-2 hover:border-yellow-500"
      onclick="_handle_edit_mode_()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </button>
  </div>
</section>

<section class="mt-3 text-gray-600" id="editDescription"><p>Click edit button to enter description...</p></section>

<section class="hidden flex items-center justify-between mt-4" id="newTodoPreviewSection">
<section class="flex flex-col gap-2">
<input type="text" class="px-2 py-1 border border-gray-800 rounded-md inline-flex" id="newTodoPreview"/> 
<input type="textarea" class="px-2 py-2 border border-gray-800 rounded-md inline-flex" id="newTodoPreviewDes" resize-none/>
</section>


<section class="flex items-center gap-1">
<button
class="bg-yellow-500 rounded-lg px-4 sm:px-1.5 py-2 text-sm text-white w-[100px] whitespace-nowrap hover:bg-yellow-600 border border-slate-400"
onclick="_update_todo_()"
type="button"
id="update_task_btn"
>
Update Task
</button>
<button
id="cancelEdit"
class="cursor-pointer text-red-500 border-2 p-2 bg-gray-300 rounded-full"
>
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
    d="M6 18L18 6M6 6l12 12"
  />
</svg>
</button>
</section>


</section>
<section class="mt-4">
  <span class="text-sm">Created by</span>
  <span class="text-sm">${created_at}</span>
  <span class="mx-1">&map;</span>
  <span class="bg-gray-500 text-sm px-1 py-0.5 rounded-lg text-white"
    >Pending</span
  >
</section>
  
  `;
  editDescriptionSectionid.innerHTML = JSON.parse(
    localStorage.getItem("description")
  );
};

// Edit
function _handle_edit_mode_() {
  const todo_db = getDb("todo_db");
  const currentPreviewId = getDb("current_preview_todo_id");
  const currentTodo = todo_db.find((todo) => todo.id === currentPreviewId);
  let { title, id, created_at } = currentTodo;
  console.log(title);
  let newTodoPreviewSection = document.getElementById("newTodoPreviewSection");
  newTodoPreviewSection.classList.remove("hidden");

  const _update_task_btn = document.getElementById("update_task_btn");
  _update_task_btn.setAttribute("_todo_id_to_update", id);

  let newTodoPreviewInput = document.getElementById("newTodoPreview");
  newTodoPreviewInput.value = title;
}

const _update_todo_ = () => {
  let newTodoPreviewInput = document.getElementById("newTodoPreview");
  if (!newTodoPreviewInput.value) {
    showMessage("Yo!! Can't update empty Task, can you?");
    return;
  }

  const _update_task_btn = document.getElementById("update_task_btn");
  const _todo_id_to_update_ =
    _update_task_btn.getAttribute("_todo_id_to_update");

  let editDescriptionSectionid = document.getElementById("editDescription");
  let newTodoPreviewInputDes =
    document.getElementById("newTodoPreviewDes").value;
  editDescriptionSectionid.innerHTML = newTodoPreviewInputDes;
  console.log(newTodoPreviewInputDes);
  localStorage.setItem("description", JSON.stringify(newTodoPreviewInputDes));

  // // get todo
  const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
  const _updated_todo_db_ = todo_db.map((todo) => {
    if (todo.id === _todo_id_to_update_) {
      return { ...todo, title: newTodoPreviewInput.value };
    } else {
      return todo;
    }
  });

  setDb(DB_NAME, _updated_todo_db_);
  //   window.location.reload();
  renderCurrentPreviewTodoId();

  let newTodoPreviewSection = document.getElementById("newTodoPreviewSection");
  newTodoPreviewSection.classList.add("hidden");
};

renderCurrentPreviewTodoId();

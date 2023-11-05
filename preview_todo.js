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
<section class="mt-3">
  <span class="text-sm">${created_at}</span>
  <span class="mx-1">&map;</span>
  <span class="bg-yellow-500 text-sm px-1 py-0.5 rounded-lg text-white"
    >Pending</span
  >
</section>
  
  `;
};

renderCurrentPreviewTodoId();

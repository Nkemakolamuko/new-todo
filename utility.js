function broofa() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const charLong = () => {
  let timerInterval;
  Swal.fire({
    title: "Task is too long. Consider it breaking down!",
    html: "This will close in <b></b> milliseconds.",
    timer: 4000,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

const showMessage = (title) => {
  const _form_message_span_ = document.getElementById("form_message");
  _form_message_span_.innerHTML = title;
  _form_message_span_.classList.remove("hidden");
  _form_message_span_.classList.add(
    "text-center",
    "justify-center",
    "text-red-400",
    "mt-10"
  );
  setTimeout(() => {
    _form_message_span_.classList.add("hidden");
  }, 3000);
};

// Get local storage
const getDb = (DB_NAME) => {
  if (!DB_NAME) {
    throw new Error("DB_NAME is missing...");
  }
  return JSON.parse(localStorage.getItem(DB_NAME)) || [];
};

const setDb = (DB_NAME, newData) => {
  if (!DB_NAME) {
    throw new Error("DB_NAME is missing...");
  }

  if (!newData) {
    throw new Error("Data is missing...");
  }
  localStorage.setItem(DB_NAME, JSON.stringify(newData));
};

// todo preview
const handlePreviewTodo = (id) => {
  setDb("current_preview_todo_id", id);
  window.location.href = "/preview_todo.html";
};

// const handlePreviewTodo = document.getElementById("handlePreviewTodo");
// handlePreviewTodo.addEventListener("click", (title, id) => {
//   setDb("current_preview_todo_title", title);

//   setDb("current_preview_todo_id", id);
//   window.location.href = "/preview_todo.html";
// });

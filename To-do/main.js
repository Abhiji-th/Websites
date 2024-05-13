// UI Class
class UI {
  static displayList() {
    const list = Store.getList();
    list.forEach((item) => UI.addtoList(item));
  }

  static addtoList(item) {
    const todolist = document.getElementById("todo-list");
    const row = document.createElement("tr");
    row.classList.add("table-light");
    row.innerHTML = `
        <td class="item"><input class="item-text" name="item${item.taskId}" type="text" value="${item.taskName}" readonly></input></td>
        <td><input class="form-check-input" type="checkbox" value="" name="check"></td>
        <td><a href="#" class="edit btn btn-primary btn-sm">Edit</a></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    todolist.appendChild(row);
  }

  static clearFeilds() {
    document.getElementById("text").value = "";
  }

  static removeList(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      UI.showAlert("Removed from list", "success");
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `mt-5 alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("todo-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static filterList(e) {
    const searchText = e.target.value.toLowerCase();
    const items = document.querySelectorAll("td.item");
    Array.from(items).forEach(function (item) {
      var itemName = item.innerHTML;
      var row = item.parentElement;
      if (itemName.toLowerCase().indexOf(searchText) != -1) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  static editList(el) {
    if (el.classList.contains("edit")) {
      var index = Store.getIndex(
        el.parentElement.parentElement.firstElementChild.firstElementChild.value
      );
      var newText =
        el.parentElement.parentElement.firstElementChild.firstElementChild
          .value;

      if (el.innerText.toLowerCase() === "edit") {
        el.parentElement.parentElement.firstElementChild.firstElementChild.removeAttribute(
          "readonly"
        );
        el.innerText = "Save";
      } else {
        el.parentElement.parentElement.firstElementChild.firstElementChild.setAttribute(
          "readonly",
          "readonly"
        );
        el.innerText = "Edit";
        newText =
          el.parentElement.parentElement.firstElementChild.firstElementChild
            .value;
      }
      Store.editList(index, newText);
      index = Store.getIndex(
        el.parentElement.parentElement.firstElementChild.firstElementChild.value
      );
    }
  }
}

// Store class
class Store {
  static getList() {
    let list;
    if (localStorage.getItem("list") === null) {
      list = [];
    } else {
      list = JSON.parse(localStorage.getItem("list"));
    }
    return list;
  }

  static addtoList(listItem) {
    const list = Store.getList();
    list.push(listItem);
    localStorage.setItem("list", JSON.stringify(list));
  }

  static removeList(item) {
    const list = Store.getList();
    list.forEach((todo, index) => {
      if (todo === item) {
        list.splice(index, 1);
      }
    });

    localStorage.setItem("list", JSON.stringify(list));
  }

  static editList(i, newText) {
    const list = Store.getList();
    console.log(i);
    console.log(newText);
    localStorage.setItem("list", JSON.stringify(list));
  }

  static getIndex(item) {
    const list = Store.getList();
    const index = list.findIndex((todo) => todo === item);
    if (index !== -1) {
      return index;
    } else {
      return -1;
    }
  }

  static currentIndex() {
    let index;
    if (localStorage.getItem("index") === null) {
      index = [];
    } else {
      index = JSON.parse(localStorage.getItem("index"));
    }
    return index;
  }

  static updateIndex(newIndex) {
    const index = Store.getIndex();
    index[0] = newIndex;
    localStorage.setItem("index", JSON.stringify(index));
  }
}

// Event : Display
document.addEventListener("DOMContentLoaded", UI.displayList);

// Event : Add
document.getElementById("todo-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const text = document.getElementById("text").value;
  const list = Store.getList();

  var todoObj = {
    taskId: list.length + 1,
    taskName: text,
  };

  if (text === "") {
    UI.showAlert("Please type something.", "danger");
  } else {
    UI.addtoList(todoObj);
    Store.addtoList(todoObj);
    UI.showAlert("Added to list", "success");
    UI.clearFeilds();
  }
});

// Event : Edit
document.getElementById("todo-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("edit")) {
    UI.editList(e.target);

    // const index = Store.getIndex(e.target);
    // Store.editList(index);
  }
});

//Event : Remove
document.getElementById("todo-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    UI.removeList(e.target);
    console.log(
      e.target.parentElement.parentElement.firstElementChild.firstElementChild
    );
    // Store.removeList(
    //   e.target.parentElement.parentElement.firstElementChild.firstElementChild
    //     .value
    // );
  }
});

// Event : Filter
document.getElementById("search-text").addEventListener("keyup", function (e) {
  UI.filterList(e);
});

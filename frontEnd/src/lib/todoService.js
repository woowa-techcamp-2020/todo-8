import api from "../api/index";
import store from "../store/index";
import Todo from "../components/Todo";

let todoList = new Todo("#app");
todoList.addComponent({
  name: "columns",
  model: {
    columns: [],
  },
  view(model) {
    return `
        ${model.columns
          .map(
            (col) => `
            <ul class="list" id="column-${col.column_id}">
            </ul>`
          )
          .join("")}
      `;
  },
  async controller(model) {
    const columns = await api.Todo().getTodoById(store.state.currUser.id);

    model.columns = columns;
    store.dispatch("setColumns", columns);
    todoList.updateView();
  },
});

todoList.showComponent("columns");

export default todoList;

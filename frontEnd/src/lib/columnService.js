import api from "../api/index";
import store from "../store/index";
import Column from "../components/Column";
import listService from "../lib/listService";

function columnService() {
  let columns = store.state.columns;
  columns.forEach(async (col) => {
    let column = new Column(`#column-${col.column_id}`);
    column.addComponent({
      name: "cards",
      model: {
        cards: [],
      },
      view(model) {
        return `<li class="start">
              <div class="card-count">${model.cards.length}</div>
              <span class="list-title">${col.column_title}</span>
            </li>
            <div class="card-list-wrapper">
            ${model.cards
              .map(
                (card) => `<li class="card ${card.id}"><div>
                <div class="card-contents">
                    ${card.contents}
                </div>
                <div>
                    <span class="card-des">Addad by</span> <span class="card-user">${card.userId}</span>
                </div>
            </div> 
            </li>`
              )
              .join("")}
            </div>`;
      },
      async controller(model) {
        const cards = await api.Card().getCardByColumnId(col.column_id);
        if (cards) {
          model.cards = cards.reverse();
          column.updateView();
        }
        let listServiceInstance = new listService();
        listServiceInstance.addlistButtonsTo(column.columnElement);
        listServiceInstance.hideAddCardModal(column.columnElement);
      },
    });

    column.showComponent("cards");
  });
}
export default columnService;

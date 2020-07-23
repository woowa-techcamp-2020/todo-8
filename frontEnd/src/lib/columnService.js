import api from "../api/index";
import store from "../store/index";
import Column from "../components/Column";

function columnService() {
  let columns = store.state.columns;
  columns.forEach((col) => {
    let column = new Column(`#column-${col.column_id}`);
    column.addComponent({
      name: "cards",
      model: {
        cards: [],
      },
      view(model) {
        return `
            <li class="start"></li>
            ${model.cards
              .map(
                (card) => `<li class="card"><div ">
                <div>
                    ${card.contents}
                </div>
                <div>
                    Addad by <span class="card-user">${card.userId}</span>
                </div>
                <div>
                    ${card.created_at}
                </div>
            </div> 
            </li>`
              )
              .join("")}
        `;
      },
      async controller(model) {
        const cards = await api.Card().getCardByColumnId(col.column_id);

        model.cards = cards;
        column.updateView();
        console.log("dont");
      },
    });

    column.showComponent("cards");
  });
}
export default columnService;

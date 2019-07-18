import store from "./redux/store";
const itemListDOM = $("#itemList");
const itemDOM = $("#item");
const txtNuevaNotaDOM = $("#txtNuevaNota");

txtNuevaNotaDOM.keyup(e => {
  if (e.keyCode === 13) {
    const text = txtNuevaNotaDOM.val();
    txtNuevaNotaDOM.val("");
    store.dispatch({
      type: "AGREGAR",
      payload: {
        text
      }
    });
  }
});
function actualizarLista(items) {
  itemListDOM.html("");

  for (const item of items) {
    const cloneDOM = itemDOM.clone();
    const chkHabilitadoDom = cloneDOM.find("input");
    const btnBorraDOM = cloneDOM.find("button");
    const lblNombreDom = cloneDOM.find("span");
    cloneDOM.removeClass("d-none");

    lblNombreDom.html(item.text);
    if (item.completado) {
      lblNombreDom.css("text-decoration", "line-through");
    }

    btnBorraDOM.on("click", () => {
      store.dispatch({
        type: "BORRAR",
        payload: {
          id: item.id
        }
      });
    });

    chkHabilitadoDom.prop("checked", item.completado);
    chkHabilitadoDom.on("click", () => {
      store.dispatch({
        type: "ALTERNAR",
        payload: {
          id: item.id
        }
      });
    });

    itemListDOM.append(cloneDOM);
  }
}

store.subscribe(() => {
  const state = store.getState();

  actualizarLista(state);
});

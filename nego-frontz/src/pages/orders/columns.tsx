import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";

export const columns = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    defaultWidth: 80,
    type: "number",
  },
  {
    name: "orderName",
    header: "Nom de la commande",
    defaultFlex: 1,
    type: "number",
  },
  {
    name: "referenceName",
    header: "Référence de la commande",
    defaultFlex: 1,
  },
  {
    name: "quantity",
    header: "Quantité de l'article",
    defaultFlex: 1,
    filterEditor: NumberFilter,
  },
];

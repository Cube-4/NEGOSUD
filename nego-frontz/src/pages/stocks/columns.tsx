import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";

export const columns = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    defaultWidth: 80,
    type: "number",
  },
  { name: "name", header: "Nom", defaultFlex: 1 },
  {
    name: "reference",
    header: "Référence",
    defaultFlex: 1,
    type: "number",
    filterEditor: NumberFilter,
  },
  {
    name: "date",
    header: "Date d'ajout",
    defaultFlex: 1,
    type: "date",
  },
  {
    name: "origin",
    header: "Origine du stock",
    defaultFlex: 1,
  },
  {
    name: "quantity",
    header: "Quantité",
    defaultFlex: 1,
  },
  {
    name: "price",
    header: "Prix (€)",
    defaultFlex: 1,
  },
];

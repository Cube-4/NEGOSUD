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
    name: "orderDate",
    header: "Date de commande",
    defaultFlex: 1,
    filterEditor: NumberFilter,
  },
  {
    name: "orderStatus",
    header: "Statut de la commande",
    defaultFlex: 1,
  },
];

export const adminColumns = [
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
    name: "orderDate",
    header: "Date de commande",
    defaultFlex: 1,
    filterEditor: NumberFilter,
  },
  {
    name: "orderStatus",
    header: "Statut de la commande",
    defaultFlex: 1,
  },
  {
    name: "orderType",
    header: "Type de la commande",
    defaultFlex: 1,
  }
];

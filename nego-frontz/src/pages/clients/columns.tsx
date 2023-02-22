import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";

export const columns = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    defaultWidth: 80,
    type: "number",
  },
  { name: "email", header: "Email", defaultFlex: 1 },
  {
    name: "firstName",
    header: "Prénom",
    defaultFlex: 1,
  },
  {
    name: "lastName",
    header: "Nom",
    defaultFlex: 1,
  },
];

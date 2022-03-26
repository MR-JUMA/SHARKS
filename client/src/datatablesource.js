export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User Name",
    width: 100,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "full_name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "user_status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.user_status}`}>
          {params.row.user_status}
        </div>
      );
    },
  },
];

//tigo columns and basically any other company
export const companyColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "phonenumber",
    headerName: "Customer",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "transactionType",
    headerName: "Type",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    email: "2snow@gmail.com",
    status: "inactive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

import { DataGrid, GridColDef } from '@mui/x-data-grid';


export const DataTable = ({
  rows = [],
  columns = [],
  // initialState = {},
  // filterModel = {},
}:{
  rows: any[],
  columns: GridColDef[]
  // initialState?: any,
  // filterModel?: any,
}) => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          // ...initialState,
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        // filterModel={filterModel}
      />
    </div>
  );
}
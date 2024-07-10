import { DataGrid, GridColDef } from '@mui/x-data-grid';


export const DataTable = ({
  rows = [],
  columns = [],
}:{
  rows: any[],
  columns: GridColDef[]
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
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        
      />
    </div>
  );
}
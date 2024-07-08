import { DataGrid, GridColDef } from '@mui/x-data-grid';


export const DataTable = ({
  rows = [],
  columns = [],
  onRowClick = () => {},
}:{
  rows: any[],
  columns: GridColDef[]
  onRowClick: (params: any) => void
}) => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        
      />
    </div>
  );
}
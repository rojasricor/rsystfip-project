import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { People, setPeople } from '../features/people/peopleSlice';
import { notify } from '../libs/notify';
import * as peopleService from '../services/people.service';
import { createColumn } from '../libs/utils';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  createColumn('id', 'ID', 70),
  {
    ...createColumn('full_name', 'Full name', 250),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.first_name || ''} ${params.row.last_name || ''}`,
  },
  {
    ...createColumn('identification', 'Identification', 170),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.document_name || ''} ${params.row.document_number || ''}`,
  },
  createColumn('category_name', 'Category Name', 160),
  createColumn('faculty_name', 'Faculty Name', 350),
  createColumn('visit_subject', 'Visit Subject', 450),
];

function TableHistoryPeople(): React.ReactNode {
  const peopleState: Array<People> = useAppSelector(
    ({ people }) => people.people,
  );

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useQuery<[], any>(
    'people',
    peopleService.getPeople,
  );

  useEffect(() => {
    if (data) dispatch(setPeople(data));
    if (error) notify(error.response.data.error, { type: 'error' });
  }, [data, error]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Paper>
        <DataGrid
          rows={peopleState}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          loading={isLoading}
          sx={{ border: 'none' }}
        />
      </Paper>
    </div>
  );
}

export default TableHistoryPeople;
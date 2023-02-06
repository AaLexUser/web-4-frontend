import React, {useEffect, useState} from 'react'
import Table from 'react-toolbox/lib/table'
import UpdateRowDialog from './UpdateRowDialog'
import dateFormat from 'dateformat'
import { useGetPointsQuery, useDeletePointMutation } from '../../../../store/slices/PointApi'
import { useAppSelector } from '../../../../utils/hook'
import {instance as _axios} from '../../../axios/axios'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Point from '../../../../types/Point'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import PointString from '../../../../types/PointString'
import Button from 'react-toolbox/lib/button'
import Pagination from '@mui/material/Pagination'
import { GridRowId , GridCellParams} from '@mui/x-data-grid'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'



const columns: GridColDef[] = [
  {field: 'x', headerName: 'X'},
  {field: 'y', headerName: 'Y'},
  {field: 'r', headerName: 'R'},
  {field: 'hitResult', headerName: 'Result'},
  {field: 'time', headerName: 'Time', width: 300},
  {field: 'executionTime', headerName: 'ex. Time'},
  {field: 'username', headerName: 'User'},
  {field: 'update', headerName: 'Update'}
]
const DeleteButton = ({onDeleteHandle}) => {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)
  return (
    <GridToolbarContainer>
      <Button label='Delete' onClick={onDeleteHandle} raised accent />
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </GridToolbarContainer>
  )
}

const PointsTable = () => {
  const token = useAppSelector(state => state.user).user.token
  const {data = [], isLoading, isSuccess } = useGetPointsQuery(token)
  const [table, setTable ] = useState<PointString[]>([])
  const [deleteRow, {}] = useDeletePointMutation()
  const [selected, setSelected] = useState<GridRowId[]>([])
  const [updateDialog, setUpdateDialog] = useState<{active: boolean, event?: PointString}>({active: false})
  const onDeleteHandle = () => {
    selected.map(async (id)=>{
      await deleteRow({token: token, id: id})
    })
  }
  useEffect(()=> {
    if (isSuccess) setTable([...data].map((point: Point) => {
      return {
        ...point,
        hitResult : point.hitResult ? 'hit': 'miss',
        time: dateFormat(point.time, 'd mmm yyyy H:MM:ss')
      }
    }))
  }, [data])
  useEffect(()=> console.log(table), [table])
  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading && <ProgressBar type="linear" mode="indeterminate" />}
      <DataGrid
        components={{
          Footer: DeleteButton,
        }}
        componentsProps={{
          footer: {onDeleteHandle : onDeleteHandle },
        }}
        rows={table}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        checkboxSelection
        onSelectionModelChange={(e) => setSelected(e)}
        // onCellDoubleClick={(e)=> console.log(e)}
        onCellDoubleClick={(e)=> setUpdateDialog({active: true, event: e.row})}
      />
      <UpdateRowDialog 
        updateState = {updateDialog}
        setUpdateState = {setUpdateDialog}
      />
    </div>
  )
}

export default PointsTable
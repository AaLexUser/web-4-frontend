import React, {useEffect, useState} from 'react'
import Table from 'react-toolbox/lib/table'
import dateFormat from 'dateformat'
import { useGetPointsQuery } from '../../../store/slices/PointApi'
import { useAppSelector } from '../../../utils/hook'
import {instance as _axios} from '../../axios/axios'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Point from '../../../types/Point'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {field: 'x', headerName: 'X'},
  {field: 'y', headerName: 'Y'},
  {field: 'r', headerName: 'R'},
  {field: 'hitResult', headerName: 'Result'},
  {field: 'time', headerName: 'Time', width: 300},
  {field: 'executionTime', headerName: 'ex. Time'},
  {field: 'username', headerName: 'User'}
]

const PointsTable = () => {
  const token = useAppSelector(state => state.user).user.token
  const {data = [], isLoading } = useGetPointsQuery(token)
  const [table, setTable ] = useState({data: []})
  const formatData = () =>{
    data.map(item => { 
      return{ ...item,
        hitResult : item.hitResult? 'hit': 'miss',
        time: dateFormat(item.time, 'd mmm yyyy H:MM:ss')}
    })
  } 
  
  useEffect(()=> {

  }, [data])
  useEffect (() => console.log(table.data), [table])
  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading && <ProgressBar type="linear" mode="indeterminate" />}
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default PointsTable
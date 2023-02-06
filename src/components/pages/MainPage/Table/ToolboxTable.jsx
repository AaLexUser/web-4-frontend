import React, {useEffect, useState} from 'react'
import Table from 'react-toolbox/lib/table'
import dateFormat from 'dateformat'
import { useGetPointsQuery } from '../../../../store/slices/PointApi'
import { useAppSelector } from '../../../../utils/hook'
import {instance as _axios} from '../../../axios/axios'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Point from '../../../../types/Point'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import PointString from '../../../../types/PointString'
import Button from 'react-toolbox/lib/button'

const PointModel = {
  x: {type: String},
  y: {type: String},
  r: {type: Date},
  hitResult: {type: Number},
  time: {type: Number},
  executionTime: {type: Boolean},
  username: {type: String},
}



const ToolboxTable = () => {
  const token = useAppSelector(state => state.user).user.token
  const {data = [], isLoading, isSuccess } = useGetPointsQuery(token)
  const [table, setTable ] = useState([])
  useEffect(()=> {
    if (isSuccess) setTable([...data].map((point) => {
      return {
        ...point,
        hitResult : point.hitResult ? 'hit': 'miss',
        time: dateFormat(point.time, 'd mmm yyyy H:MM:ss'),
        update: <Button  label = 'Update' onClick={() =>console.log('click')} ></Button>
      }
    }))
  }, [data])
  useEffect(()=> console.log(table), [table])
  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading && <ProgressBar type="linear" mode="indeterminate" />}
      <Table
        model={PointModel}
        source={table}
      />
    </div>
  )
}

export default ToolboxTable
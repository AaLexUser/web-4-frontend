import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../store/slices/UserSlice'
import PointForm from './PointForm'
import { useNavigate } from 'react-router-dom'
import { Card, CardTitle, CardText, CardMedia } from 'react-toolbox/lib/card'
import PointsTable from './Table/PointsTable'
import TestTable from './Table/TestTable'
import ToolboxTable from './Table/ToolboxTable'

const MainPage = () => {
  const user = useSelector(selectUser)
  const nav = useNavigate()
  const authStatus = user.user.username !== '' ? true : false
  useEffect(
    ()=> {if(!authStatus) nav('/sign-in')}
    , [authStatus])
  return (
    <Card style={{width: '100%', height: '100%'}}>
      <CardTitle title='MainPage'/>
      <CardText>
        <PointForm/>
        <PointsTable/>
      </CardText>
    </Card>
  
  )
}

export default MainPage
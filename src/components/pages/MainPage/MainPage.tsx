import React from 'react'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../store/slices/UserSlice'
import PointForm from './PointForm'

const MainPage = () => {
  return (
    <div>MainPage
      <PointForm/>
    </div>
  )
}

export default MainPage
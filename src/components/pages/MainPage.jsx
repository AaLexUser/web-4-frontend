import React from 'react'
import {useSelector} from 'react-redux'
import {selectUser} from '../../store/slices/UserSlice'

const MainPage = () => {
  console.log(useSelector(selectUser))
  return (
    <div>MainPage
    </div>
  )
}

export default MainPage
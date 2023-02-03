import React from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hook'
import { resetUser } from '../../store/slices/UserSlice'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const user = useAppSelector(state => state.user).user
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const handleOnLogout = () =>{
    dispatch(resetUser())
    nav('/', { replace: true })
  }
  return (
    <section style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height:'600px'}}>
      <Card style={{width: '350px'}}>
        <CardTitle title='Profile'/>
        <CardText>
          <h3>Username: {user.username}</h3>
        </CardText>
        <Button label='Logout' onClick={handleOnLogout} raised accent />
      </Card>
    </section>
  )
}
export default ProfilePage
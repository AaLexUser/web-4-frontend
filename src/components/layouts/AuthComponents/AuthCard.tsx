import React from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import AuthFrom from './AuthForm'
import ErrorDialog from '../ErrorDialog'
import { validate } from '../../../utils/validators/UserValidate'
import { AuthState } from '../../../store/slices/AuthSlice'
import { useAppSelector, useAppDispatch } from '../../../utils/hook'
import { setAuth } from '../../../store/slices/AuthSlice'

interface AuthCardProps{
  title: string,
  handleOnSubmit: () => void
}

const AuthCard: React.FC<AuthCardProps> = ({title, handleOnSubmit}) => {
  const _state: AuthState = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const handleChange = (name: string, value: string) => {
    console.log(value)
    const error_field = `error_${[name]}`
    if (validate(name, value)) {
      dispatch(setAuth
      (({
        ..._state,
        [name]: value,
        [error_field]: '',
      })
      )
      )
    } else {
      dispatch(setAuth({
        ..._state,
        [name]: value,
        [error_field]: 'Invalid ' + [name],
      }))
    }
  }
  return (
    <section style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height:'600px'}}>
      <Card style={{width: '350px'}}>
        <CardTitle title={title}/>
        <CardText>
          <AuthFrom 
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
          />
        </CardText>
      </Card>
      <ErrorDialog/>
    </section>
  )
}

export default AuthCard
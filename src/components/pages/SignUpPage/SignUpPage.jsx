import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import {useAppDispatch} from '../../../utils/hook'
import {instance as _axios} from '../../axios/axios'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import { validate } from '../../../utils/validators/UserValidate'
import { setUser } from '../../../store/slices/UserSlice'
import SignUpForm from './SignUpForm'
import ErrorDialog from './ErrorDialog'

const SignUpPage = () => {
  const [state, setState] = useState({username: '', password: '', error_username: '', error_password: ''})
  const [dialog, setDialog] = useState({active: false, msg: ''})
  const handleDialog = (name, value) => {
    setDialog(() => ((prevState) => ({
      ...prevState,
      [name] : value
    })))
    console.log(dialog)
  }

  const actions = [
    { label: 'Close', onClick: () => setDialog({active: false, msg: ''})},
  ]

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const username_hit = 'at least eight characters\n no special character\n no whitespace allowed'

  const handleChange = (name, value) => {
    const error_field = `error_${[name]}`
    if(validate(name, value))
    {
      setState(prevState => ({
        ...prevState,
        [name] : value,
        [error_field] : ''
      }))
    }
    else {
      setState(prevState => ({
        ...prevState,
        [name] : value,
        [error_field] : 'Invalid ' + [name]
      }))
    }
  }

  const handleOnSubmit = () => {
    console.log(state)
    _axios({
      method: 'post',
      url: 'auth/register',
      data: {
        username: state.username,
        password: state.password
      },
      headers: {
        'Content-Type': 'application/json',
      }
    }).then( (response) => {
      console.log(response)
      dispatch(setUser({
        username: state.username,
        password: state.password,
        token: response.data.token
      }))
      navigate('/main', {replace: true})
    }).catch( (error) => {
      console.log(error)
      setDialog(() => ({active: true, msg: error.message}))
    })
  }


  return (
    <section style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height:'600px'}}>
      <Card style={{width: '350px'}}>
        <CardTitle title='Sign Up'/>
        <CardText>
          <SignUpForm 
            state={state}
            handleChange={handleChange}
            handleOnSubmit={handleOnSubmit}
          />
        </CardText>
      </Card>
      <ErrorDialog
        dialog={dialog}
        setDialog={setDialog}
      />
    </section>
  )
}
export default SignUpPage

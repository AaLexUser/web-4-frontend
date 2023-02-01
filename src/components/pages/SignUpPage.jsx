import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { axiosInstance } from '../axios/axios.js'
import { setToken } from '../../store/slices/TokenSlice.js'
import Input from 'react-toolbox/lib/input'
import TextField from '@mui/material/TextField'
import {Button} from 'react-toolbox/lib/button'
import {instance as _axios} from '../axios/axios'
import User from '../../entities/User'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { validate } from '../../utils/validators/UserValidate.ts'
import Dialog from 'react-toolbox/lib/dialog'
import { setUser } from '../../store/slices/UserSlice.js'


const SignUpPage = () => {
  const [state, setState] = useState({username: '', password: '', error_username: '', error_password: ''})
  const [dialog, setDialog] = useState({active: false, msg: ''})
  const [active, setActive] = useState(false)
  const handleDialog = (name, value) => {
    setDialog(() => (prevState => ({
      ...prevState,
      [name] : value
    })))
    console.log(dialog)
  }
  useEffect(() => {
    console.log(active)
  }, [active])

  const actions = [
    { label: 'Close', onClick: () => setDialog({active: false, msg: ''})},
  ]

  const dispatch = useDispatch()
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
      dispatch(setUser(new User(state.username, state.password, response.data.token)))
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
          <Input type='text' 
            label='Name'
            icon='person'
            name='name'
            value={state.username}
            required
            onChange={handleChange.bind(this,'username')}
            maxLength={16 } error={state.error_username}
            hit='some hit' />
          <Input type='password' label='Password' icon='password' name='name' value={state.password} required onChange={handleChange.bind(this,'password')} maxLength={32 } error={state.error_password}/>
          <Button icon='login' label='Submit' onClick={handleOnSubmit} raised primary disabled={false} />
        </CardText>
      </Card>
      <Dialog
        actions={actions}
        active={dialog.active}
        onEscKeyDown={() => setDialog({active: false, msg: ''})}
        onOverlayClick={() => setDialog({active: false, msg: ''})}
        title={dialog.msg}
      >
      </Dialog>
    </section>
  )
}
export default SignUpPage

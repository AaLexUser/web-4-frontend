import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../utils/hook'
import { instance as _axios } from '../../axios/axios'
import { setUser } from '../../../store/slices/UserSlice'
import ErrorDialog from '../../layouts/ErrorDialog'
import { setError } from '../../../store/slices/ErrorSlice'
import AuthCard from '../../layouts/AuthComponents/AuthCard'
import { AuthState } from '../../../store/slices/AuthSlice'

const SignInPage = () => {
  const _state: AuthState = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOnSubmit = () => {
    _axios({
      method: 'post',
      url: 'auth/authenticate',
      data: {
        username: _state.username,
        password: _state.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        dispatch(
          setUser({
            username: _state.username,
            password: _state.password,
            token: response.data.token,
          })
        )
        navigate('/main', { replace: true })
      })
      .catch((error) => {
        console.log(error)
        dispatch(setError({ active: true, msg: error.message }))
      })
  }

  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '600px',
      }}
    >
      <AuthCard
        title='Sign In'
        handleOnSubmit={handleOnSubmit}
        rightButtonTitle="Didn't register yet?"
        onRightButtonClick={() => navigate('/sign-up', { replace: false })}
      />
      <ErrorDialog />
    </section>
  )
}
export default SignInPage

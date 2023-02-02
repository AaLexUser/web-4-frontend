import React from 'react'
import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'

interface SignUpFormProps{
  state: {
    username: string,
    password: string,
    error_username: string,
    error_password: string,
  },
  handleChange: (name: string, value: string) => void,
  handleOnSubmit: () => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({state, handleChange, handleOnSubmit}) => {
  return (
    <section>
      <Input type='text' 
        label='Name'
        icon='person'
        name='name'
        value={state.username}
        required
        onChange={handleChange.bind(this,'username')}
        maxLength={16 } error={state.error_username}/>
      <Input type='password' label='Password' icon='password' name='name' value={state.password} required onChange={handleChange.bind(this,'password')} maxLength={32 } error={state.error_password}/>
      <Button icon='login' label='Submit' onClick={handleOnSubmit} raised primary disabled={false} />
    </section>
  )
}

export default SignUpForm
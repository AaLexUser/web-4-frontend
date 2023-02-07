import React, {useState} from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import ErrorDialog from '../../layouts/ErrorDialog'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import PointInput from './PointInput'
import { useAppSelector } from '../../../utils/hook'
import { useAddPointMutation } from '../../../store/slices/PointApi'
const PointForm = () => {
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [r, setR] = useState('')
  const [addPoint, {isLoading}] = useAddPointMutation()
  const token = useAppSelector(state => state.user).user.token
  const handleOnSubmit = async () =>  {
    await addPoint({token: token, body: ({x: +x, y: +y, r: +r}) }).unwrap()
  }
  return (
    <section>
      <Card style={{
        width: '25rem',
        height: 'auto',
        margin: '0.1rem'
      }}>
        <CardTitle title='Coordinates'/>
        <CardText>
          <PointInput
            coord= 'x'
            value={x}
            onChange={(e: string) => setX(e)}
          />
          <PointInput
            coord= 'y'
            value={y}
            onChange={(e) => setY(e)}
          />
          <PointInput
            coord= 'r'
            value={r}
            onChange={(e) => setR(e)}
          />
          <Button icon='login' label='Submit' onClick={handleOnSubmit} raised primary disabled={false} />
        </CardText>
      </Card>
      <ErrorDialog
        
      />
    </section>
  )
}

export default PointForm
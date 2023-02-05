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
      <Card style={{width: '350px'}}>
        <CardTitle title='Coordinates'/>
        <CardText>
          <PointInput
            label= 'x'
            coord={x}
            setCoord={setX}
          />
          <PointInput
            label= 'y'
            coord={y}
            setCoord={setY}
          />
          <PointInput
            label= 'r'
            coord={r}
            setCoord={setR}
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
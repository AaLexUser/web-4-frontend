import React, {useState} from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import PointInput from '../PointInput'
import ErrorDialog from '../../../layouts/ErrorDialog'

const UpdateForm = ({inputState, setInputState, onUpdateHandle}) => {
  const [x, setX] = useState('')//TODO : сделать более универсальный интерфейс для PointInput
  const [y, setY] = useState('')// для PointInput и PointForm
  const [r, setR] = useState('')
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
          <Button icon='login' label='Submit' onClick={onUpdateHandle} raised primary disabled={false} />
        </CardText>
      </Card>
      <ErrorDialog
        
      />
    </section>
  )
}

export default UpdateForm
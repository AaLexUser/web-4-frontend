import React, {useState} from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import PointInput from '../PointInput'
import ErrorDialog from '../../../layouts/ErrorDialog'


const UpdateForm = ({inputState, onUpdateHandle}) => {
  const [coords, setCoords] = useState<{
    x: string;
    y: string;
    r: string;}>({x: inputState.x, y: inputState.y,  r: inputState.r})
  return (
    <section>
      <Card style={{width: '10 rem'}}>
        <CardTitle title='Coordinates'/>
        <CardText>
          <PointInput
            coord= 'x'
            value={coords.x}
            onChange={(e)=> setCoords({...coords, x: e})}
          />
          <PointInput
            coord= 'y'
            value={coords.y}
            onChange={(e)=> setCoords({...coords, y: e})}
          />
          <PointInput
            coord= 'r'
            value={coords.r}
            onChange={(e)=> setCoords({...coords, r: e})}
          />
          <Button icon='login' label='Update' onClick={() => onUpdateHandle(coords)} raised primary disabled={false} />
        </CardText>
      </Card>
    </section>
  )
}

export default UpdateForm
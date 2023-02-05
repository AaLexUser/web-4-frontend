import React from 'react'
import Input from 'react-toolbox/lib/input'
interface PointInputProps{
  label: string,
  coord: string,
  setCoord: (coord: string) => void,
}

const PointInput: React.FC<PointInputProps> = ({label ,coord, setCoord}) => {
  return (
    <section>
      <Input type='text' 
        label={label.toUpperCase() + (label !== 'r' ? ' Coordinate' : ' Radius')}
        icon='location_searching'
        name='coord'
        value={coord}
        required
        onChange={(newCoord: string) => setCoord(newCoord)}
        maxLength={16 } error={''}
      />
    </section>
  )
}

export default PointInput
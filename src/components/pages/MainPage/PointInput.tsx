import React from 'react'
import Input from 'react-toolbox/lib/input'
interface PointInputProps{
  value: string,
  coord: string,
  onChange: (coord: string) => void,
}

const PointInput: React.FC<PointInputProps> = ({coord ,value, onChange}) => {
  return (
    <section>
      <Input type='text' 
        label={coord.toUpperCase() + (coord !== 'r' ? ' Coordinate' : ' Radius')}
        icon='location_searching'
        name='coord'
        value={value}
        required
        onChange={onChange}
        maxLength={16 } error={''}
      />
    </section>
  )
}

export default PointInput
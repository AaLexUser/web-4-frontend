import React from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import ErrorDialog from '../../layouts/ErrorDialog'
const PointForm = () => {
  return (
    <section>
      <Card style={{width: '350px'}}>
        <CardTitle title='Coordinates'/>
        <CardText>
        </CardText>
      </Card>
      <ErrorDialog
        
      />
    </section>
  )
}

export default PointForm
import React, {useRef, useEffect} from 'react'
import Graph from './Graph'
import { useGetPointsQuery, useAddPointMutation } from '../../../../store/slices/PointApi'
import { useAppSelector } from '../../../../utils/hook'
import { validateValue } from '../../../../utils/validators/PointValidation'

const CanvasGraph = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const token = useAppSelector(state => state.user).user.token
  const {data = [] } = useGetPointsQuery(token)
  const [addPoint, {}] = useAddPointMutation()
  const pointInput = useAppSelector(state => state.pointInput)
  let graph: Graph = new Graph(canvas.current)
  useEffect(()=>{
    console.log(pointInput)
  }, [pointInput])

  const handleClick = async (event: MouseEvent) => {
    console.log(pointInput)
    const r = pointInput.r
    if(r === '' || !canvas.current){
      return
    }
    if(!validateValue(r, 'r')){
      alert('Error: R value: ' + r + ' - is incorrect')
      return
    }
    let x = graph.getMousePosition(event).x
    let y = graph.getMousePosition(event).y
    let w = canvas.current.width
    let h = canvas.current.height
    let scaleX = (x - w / 2) * +r / (1 / 3 * w)
    let scaleY = -(y - h / 2) * +r / (1 / 3 * h)
    console.log(scaleX)
    if (!validateValue(`${scaleX}`, 'x')) {
      alert('Error: X value:' + scaleX + ' – is incorrect!')
      return
    }
    if (!validateValue(`${scaleY}`, 'x')) {
      alert('Error: Y value:' + scaleY + ' – is incorrect!')
      return
    }
    await addPoint({
      token: token,
      body: {
        x: scaleX,
        y: scaleY,
        r: +r
      }
    })
  }
  useEffect(()=>{
    if (canvas.current) {
      graph = new Graph(canvas.current)
      graph.draw()
      canvas.current.addEventListener('click', (e: MouseEvent)=>handleClick(e))
    }
  }, [])
  useEffect(() => {
    if (canvas.current && graph) {
      graph.draw()
      data.map(point => {
        graph.drawPoint(point)
      })
    }
  }, [data, canvas.current, graph])
  return (
    <div>
      <canvas ref={canvas} width="300" height="300">Interactive area of the graph</canvas>
    </div>
  )
}

export default CanvasGraph
import React, {useRef, useEffect} from 'react'
import Graph from './Graph'
import { useGetPointsQuery } from '../../../../store/slices/PointApi'
import { useAppSelector } from '../../../../utils/hook'

const CanvasGraph = () => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasCtx = useRef<CanvasRenderingContext2D | null>(null)
  const token = useAppSelector(state => state.user).user.token
  const {data = [], isLoading, isSuccess } = useGetPointsQuery(token)

  let graph: Graph = new Graph(canvas.current)
  useEffect(()=>{
    if (canvas.current) {
      graph = new Graph(canvas.current)
      graph.draw()
      canvas.current.addEventListener('click', (e)=> console.log(e))
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
    <div><canvas ref={canvas} width="300" height="300">Interactive area of the graph</canvas>
    </div>
  )
}

export default CanvasGraph
import React, {useState} from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import { useAppSelector } from '../../../../utils/hook'
import { useUpdatePointMutation } from '../../../../store/slices/PointApi'
import PointString from '../../../../types/PointString'
import { Dispatch } from 'react'
import { SetStateAction } from 'react'
interface UpdateRowDialogProps {
  updateState: {
    active: boolean,
    event?: PointString
  },
  setUpdateState: Dispatch<SetStateAction<{ active: boolean; event?: PointString | undefined; }>>
}

const UpdateRowDialog: React.FC<UpdateRowDialogProps> = ({updateState, setUpdateState}) => {
  const row = updateState.event
  if (row === undefined) return <h1>Error</h1>
  const token = useAppSelector(state => state.user).user.token
  const [inputState, setInputState] = useState({x: row.x, y: row.y, r: row.r})
  const [updateRow, {}] = useUpdatePointMutation()
  const onUpdateHandle = async () =>{
    if (row && row.id) {await updateRow({token: token, id: row.id , body: {x: +row.x, y: +row.y, r: +row.r}})}
    setUpdateState({...updateState, active: false})
  }
  const actions = [
    { label: 'Update', onClick: onUpdateHandle},
    { label: 'Close', onClick: () => setUpdateState({...updateState, active: false})}
  ]

  return (
    <section>
      <Dialog
        actions={actions}
        active={updateState.active}
        onEscKeyDown={() => setUpdateState({...updateState, active: false})}
        onOverlayClick={() => setUpdateState({...updateState, active: false})}
        title={'Update Point'}
      >

      </Dialog>
    </section>
  )
}

export default UpdateRowDialog
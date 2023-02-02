import React from 'react'
import Dialog from 'react-toolbox/lib/dialog'

type dialog = {
    active: boolean,
    msg: string
}
interface ErrorDialogProps{
    dialog: dialog,
    setDialog: (dialog:dialog) => void
}
const ErrorDialog: React.FC<ErrorDialogProps> = ({dialog, setDialog}) => {
  const actions = [
    { label: 'Close', onClick: () => setDialog({active: false, msg: ''})},
  ]
  return (
    <section>
      <Dialog
        actions={actions}
        active={dialog.active}
        onEscKeyDown={() => setDialog({active: false, msg: ''})}
        onOverlayClick={() => setDialog({active: false, msg: ''})}
        title={dialog.msg}
      >
      </Dialog>
    </section>
  )
}

export default ErrorDialog
import React from "react"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"

interface FormDialogProps {
  open: boolean
  onClose: () => void
  title: string
  onSubmit: () => void
  buttonSubmitText: string
  buttonCancelText: string
  children?: React.ReactNode
  loading?:boolean
}
const FormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  buttonSubmitText,
  buttonCancelText,
  loading
}) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          {buttonCancelText}
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : buttonSubmitText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog

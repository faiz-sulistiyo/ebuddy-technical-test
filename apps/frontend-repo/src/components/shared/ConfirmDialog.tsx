import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import React from "react"

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  title: string
  onConfirm: () => void
  message: string
  loading?: boolean
}
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onClose,
  onConfirm,
  open,
  title,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="error">
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} color="primary">
          {loading ? <CircularProgress size={20} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog

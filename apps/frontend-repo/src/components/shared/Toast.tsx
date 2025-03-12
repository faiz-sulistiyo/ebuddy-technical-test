"use client"
import React from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import {useSelector} from "react-redux"
import {hideToast} from "@/store/toastSlice"
import {useAppDispatch} from "@/store/hooks"
import {RootState} from "@/store/store"
const Toast = () => {
  const dispatch = useAppDispatch()
  const {open, message, severity, duration} = useSelector(
    (state: RootState) => state.toast,
  )

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{vertical: "top", horizontal: "right"}}
    >
      <Alert
        onClose={() => dispatch(hideToast())}
        severity={severity}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast

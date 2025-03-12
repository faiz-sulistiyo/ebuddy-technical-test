"use client";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import React, {ReactNode} from "react"

const DateLocaleProvider = ({children}: {children: ReactNode}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  )
}

export default DateLocaleProvider

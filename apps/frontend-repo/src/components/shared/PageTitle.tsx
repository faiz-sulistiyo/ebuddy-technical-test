import { Typography } from '@mui/material'
import React from 'react'

interface PageTitleProps {
    title: string
}
const PageTitle: React.FC<PageTitleProps> = ({title}) => {
  return (
    <Typography variant='h2' mb={2}>{title}</Typography>
  )
}

export default PageTitle
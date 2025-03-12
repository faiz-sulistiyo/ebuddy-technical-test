import {Box, Button, Card} from "@mui/material"
import React from "react"
import PageTitle from "./PageTitle"

interface PageContainerProps {
  title: string
  children?: React.ReactNode
  addButtonText?: string
  onClickAdd?: () => void
}
const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
  addButtonText,
  onClickAdd,
}) => {
  return (
    <Card elevation={1} sx={{p: "20px 16px"}}>
      <Box display="flex" justifyContent={"space-between"}>
        <PageTitle title={title} />
        {addButtonText && (
          <Button
            variant="contained"
            sx={{height: "fit-content"}}
            color="primary"
            onClick={onClickAdd}
          >
            {addButtonText}
          </Button>
        )}
      </Box>
      {children}
    </Card>
  )
}

export default PageContainer

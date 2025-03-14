"use client"
import React from "react"
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
} from "@mui/material"
import PropTypes from "prop-types"

import Profile from "./Profile"


const Header = () => {
  const AppBarStyled = styled(AppBar)(({theme}) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    borderBottom: "1px solid #f1f1f1",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }))
  const ToolbarStyled = styled(Toolbar)(({theme}) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }))

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile/>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  )
}

Header.propTypes = {
  sx: PropTypes.object,
}

export default Header

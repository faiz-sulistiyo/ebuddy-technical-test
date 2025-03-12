"use client"
import React, {useState} from "react"
import {Box, Menu, Button, IconButton} from "@mui/material"
import {useLogoutMutation} from "@/store/api/auth"
import {useRouter} from "next/navigation"
import {Person} from "@mui/icons-material"

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [logout] = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace("/login")
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof open === "object" && {
            color: "primary.main",
          }),
        }}
        type="button"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Person />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        keepMounted
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <Box mt={1} py={1} px={2}>
          <Button
            variant="outlined"
            color="primary"
            component="button"
            fullWidth
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile

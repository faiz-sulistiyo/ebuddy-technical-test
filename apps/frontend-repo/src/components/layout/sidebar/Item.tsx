"use client"
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import Link from "next/link"

import React, {FC, ReactNode} from "react"

interface ItemProps {
  path: string
  label: string
  icon: ReactNode
  pathname?: string
}
const Item: FC<ItemProps> = ({icon, label, path, pathname = ""}) => {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        href={path}
        key={path}
        selected={pathname === path}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: "3px 0",
            color: "inherit",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}

export default Item

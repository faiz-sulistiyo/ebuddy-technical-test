"use client"
import {
  Box,
  Drawer,
  List,
} from "@mui/material"
import SubItemTitle from "./SubItemTitle"
import Image from "next/image"
import Item from "./Item"
import {routes} from "./routes"
import { usePathname } from "next/navigation"

const SideBar = () => {
  const drawerWidth = 240
  const pathname = usePathname();

  return (
    <Box
      sx={{
        flexShrink: 0,
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar for desktop */}
      {/* ------------------------------------------- */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{margin: "0px auto", height: "128px"}}>
          <Image
            src="/static/next.svg"
            alt="Next Logo"
            width="128"
            height="128"
          />
        </Box>

        <List>
          {routes.map((route) => {
            if (route.items) {
              return (
                <Box key={route.label}>
                  <SubItemTitle>{route.label}</SubItemTitle>
                  {route.items.map((item) => (
                    <Item key={item.label} icon={item.icon} label={item.label} path={item.path ?? ""} pathname={pathname}/>
                  ))}
                </Box>
              )
            }
            return (
              <Item key={route.label} icon={route.icon} label={route.label} path={route.path ?? ""} pathname={pathname}/>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}

export default SideBar

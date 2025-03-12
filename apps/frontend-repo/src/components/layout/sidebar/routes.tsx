import { Dashboard, Person } from "@mui/icons-material"
import { ReactNode } from "react"

export interface Route {
    path?: string
    label: string
    items?: Route[]
    icon?: ReactNode
}

export const routes: Route[] = [
    {
        label: 'Home', items: [
            { path: '/admin', label: 'Dashboard', icon: <Dashboard/>}
        ]
    },
    {
        label: 'User Management', items: [
            { path: '/admin/users', label: 'Users', icon: <Person/> }
        ]
    },
]
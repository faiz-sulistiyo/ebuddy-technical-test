import Header from "@/components/layout/header/Header";
import SideBar from "@/components/layout/sidebar/Sidebar";
import { Box } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin dashboard with sidebar and header",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SideBar/>
      
      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" p={2}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

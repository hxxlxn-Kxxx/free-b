"use client";

import React from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Dashboard,
  People,
  Event,
  Receipt,
  Settings,
  Notifications,
  Search,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";

const drawerWidth = 240;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname(); // 현재 우리가 어떤 주소에 있는지 확인하는 Next.js 훅

  // 사이드바 메뉴 리스트
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Instructors", icon: <People />, path: "/instructors" },
    { text: "Schedules", icon: <Event />, path: "/schedules" },
    { text: "Settlement", icon: <Receipt />, path: "/settlement" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* 1. 상단 헤더 영역 */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "white",
          color: "black",
          boxShadow: "none",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Settly Admin
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
              M
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 2. 왼쪽 사이드바 영역 */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #eee",
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            sx={{ letterSpacing: 1 }}
          >
            SETTLY
          </Typography>
        </Toolbar>
        <Box sx={{ overflow: "auto", px: 2, mt: 2 }}>
          <List>
            {menuItems.map((item) => {
              // 현재 접속한 주소와 메뉴 경로가 같으면 활성화(파란색) 처리!
              const isActive = pathname === item.path;

              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => router.push(item.path)}
                    sx={{
                      borderRadius: 2,
                      bgcolor: isActive ? "primary.main" : "transparent",
                      color: isActive ? "white" : "inherit",
                      "&:hover": {
                        bgcolor: isActive ? "primary.main" : "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? "white" : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: isActive ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* 3. 메인 콘텐츠 영역 (이 자리에 대시보드나 강사 목록이 들어옵니다!) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

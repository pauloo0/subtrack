import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, LogOut, Users2 } from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    title: 'Home',
    ref: '/',
    icon: Home
  },
  {
    title: 'Clientes',
    ref: '/clients',
    icon: Users2
  },
]

const FOOTER_ITEMS = [
  {
    title: 'Logout',
    ref: '/',
    icon: LogOut
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="p-2">
        <SidebarMenu>
          {SIDEBAR_ITEMS.map((item, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton render={<a href={item.ref} />} tooltip={item.title}>
                <item.icon />
                {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {FOOTER_ITEMS.map((item, idx) => (
            <SidebarMenuItem key={idx}>
              <SidebarMenuButton render={<a href={item.ref} />} tooltip={item.title}>
                <item.icon /> {item.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { LayoutDashboard, Package, Tag, Layers, ShoppingCart } from "lucide-react"

const navMain = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    items: [
      { title: "Dashboard", url: "/" },
    ],
  },
  {
    title: "Product",
    icon: Package,
    items: [
      { title: "Create Product", url: "/create-product" },
      { title: "All Products", url: "/all-product" },
    ],
  },
  {
    title: "Category",
    icon: Tag,
    items: [
      { title: "Create Category", url: "/create-category" },
      { title: "All Categories", url: "/all-categories" },
    ],
  },
  {
    title: "Sub Category",
    icon: Layers,
    items: [
      { title: "Create Sub Category", url: "/create-subcategory" },
      { title: "All Sub Categories", url: "/all-subcategories" },
    ],
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", url: "/all-orders" },
    ],
  },
]

export function AppSidebar({ ...props }) {
  const location = useLocation()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <p className="font-bold text-sm text-gray-800">Exclusive Admin</p>
            <p className="text-xs text-gray-500">Management Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="flex items-center gap-2">
              <section.icon className="w-4 h-4" />
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

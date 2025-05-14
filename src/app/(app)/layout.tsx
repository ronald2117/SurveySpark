import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import { Button } from '@/components/ui/button';
import { Bell, ClipboardList, LayoutDashboard, Award, Settings, Sparkles, PlusCircle, Home } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              SurveySpark
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Surveys">
                <Link href="/surveys">
                  <ClipboardList />
                  <span>Surveys</span>
                </Link>
              </SidebarMenuButton>
               <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/surveys/create">Create New</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/surveys">My Surveys</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Rewards">
                <Link href="/rewards">
                  <Award />
                  <span>Rewards</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
           <SidebarMenuButton asChild tooltip="Back to Landing Page">
            <Link href="/">
              <Home />
              <span>Landing Page</span>
            </Link>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Placeholder for breadcrumbs or page title if needed */}
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <UserNav />
            </div>
        </header>
        <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

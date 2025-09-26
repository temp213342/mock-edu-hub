import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  Bell, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Teacher } from '../../data/mockData';

const TeacherLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const teacher = user as Teacher;

  const menuItems = [
    { path: '/teacher', icon: Home, label: 'Dashboard', exact: true },
    { path: '/teacher/batches', icon: BookOpen, label: 'Batch Management' },
    { path: '/teacher/students', icon: Users, label: 'Student Management' },
    { path: '/teacher/materials', icon: FileText, label: 'Study Materials' },
    { path: '/teacher/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/teacher/payments', icon: DollarSign, label: 'Payment Status' },
    { path: '/teacher/notifications', icon: Bell, label: 'Notifications' },
  ];

  const isActivePath = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <SheetTitle className="text-left">EduManage</SheetTitle>
            <p className="text-sm text-muted-foreground">Teacher Portal</p>
          </div>
        </div>
      </SheetHeader>

      {/* Teacher Profile */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={teacher.photo} alt={teacher.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">{teacher.name}</p>
            <p className="text-sm text-muted-foreground truncate">{teacher.email}</p>
            <Badge variant="secondary" className="mt-1 text-xs">
              {teacher.subjects[0] || 'Teacher'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActivePath(item.path, item.exact) ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">EduManage</span>
            <Badge variant="outline" className="ml-2 text-xs">Teacher</Badge>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={teacher.photo} alt={teacher.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {teacher.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{teacher.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherLayout;
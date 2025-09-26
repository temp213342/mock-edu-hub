import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Calendar, 
  CreditCard, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Student } from '../../data/mockData';

const StudentLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const student = user as Student;

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/student') return 'dashboard';
    if (path.startsWith('/student/batches')) return 'batches';
    if (path.startsWith('/student/materials')) return 'materials';
    if (path.startsWith('/student/payments')) return 'payments';
    return 'dashboard';
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case 'dashboard':
        navigate('/student');
        break;
      case 'batches':
        navigate('/student/batches');
        break;
      case 'materials':
        navigate('/student/materials');
        break;
      case 'payments':
        navigate('/student/payments');
        break;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">EduManage</span>
            <Badge variant="outline" className="ml-2 text-xs">Student</Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={student.photo} alt={student.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground">{student.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container">
        <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mt-4 mb-6">
            <TabsTrigger value="dashboard" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="batches" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Batches</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Materials</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <main className="container pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
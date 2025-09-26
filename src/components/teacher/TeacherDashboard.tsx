import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Calendar, DollarSign, Bell, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockBatches, mockStudents, mockPayments, mockNotifications, Teacher } from '../../data/mockData';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const teacher = user as Teacher;

  // Get teacher's batches
  const teacherBatches = mockBatches.filter(batch => batch.teacherId === teacher.id);
  
  // Get all students in teacher's batches
  const allStudentIds = teacherBatches.flatMap(batch => batch.students);
  const teacherStudents = mockStudents.filter(student => 
    allStudentIds.includes(student.id)
  );

  // Get payment statistics
  const teacherPayments = mockPayments.filter(payment => 
    teacherBatches.some(batch => batch.id === payment.batchId)
  );
  const totalRevenue = teacherPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  // Get recent notifications
  const teacherNotifications = mockNotifications.filter(notif => 
    !notif.batchId || teacherBatches.some(batch => batch.id === notif.batchId)
  ).slice(0, 3);

  const stats = [
    {
      title: 'Active Batches',
      value: teacherBatches.length,
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Total Students',
      value: teacherStudents.length,
      icon: Users,
      color: 'text-secondary'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      title: 'Pending Payments',
      value: teacherPayments.filter(p => p.status === 'pending').length,
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {teacher.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your classes today.
          </p>
        </div>
        <Avatar className="h-16 w-16">
          <AvatarImage src={teacher.photo} alt={teacher.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {teacher.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-[var(--shadow-soft)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Batches */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              My Batches
            </CardTitle>
            <CardDescription>
              Your active teaching batches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{batch.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {batch.schedule}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{batch.subject}</Badge>
                      <Badge variant="secondary">{batch.students.length} students</Badge>
                    </div>
                  </div>
                </div>
              ))}
              {teacherBatches.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No active batches found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Recent Notifications
            </CardTitle>
            <CardDescription>
              Latest updates and announcements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={notification.type === 'warning' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {notification.type}
                  </Badge>
                </div>
              ))}
              {teacherNotifications.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No recent notifications.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Profile Summary */}
      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <CardTitle>Profile Summary</CardTitle>
          <CardDescription>Your teaching profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Email:</span> {teacher.email}</p>
                <p><span className="text-muted-foreground">Phone:</span> {teacher.phone}</p>
                <p><span className="text-muted-foreground">WhatsApp:</span> {teacher.whatsapp}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Teaching Specialization</h4>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline">{subject}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Board:</span> {teacher.board}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">University:</span> {teacher.university}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Location</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{teacher.address}</p>
                <p>{teacher.district}, {teacher.state} - {teacher.pincode}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
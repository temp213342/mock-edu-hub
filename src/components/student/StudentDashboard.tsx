import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, FileText, CreditCard, Bell, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockBatches, mockStudyMaterials, mockAttendance, mockPayments, mockNotifications, Student } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const student = user as Student;

  // Get student's enrolled batches
  const enrolledBatches = mockBatches.filter(batch => 
    batch.students.includes(student.id)
  );

  // Get student's study materials
  const studentMaterials = mockStudyMaterials.filter(material => 
    enrolledBatches.some(batch => batch.id === material.batchId)
  );

  // Get student's attendance
  const studentAttendance = mockAttendance.filter(attendance => 
    attendance.studentId === student.id
  );

  // Get student's payments
  const studentPayments = mockPayments.filter(payment => 
    payment.studentId === student.id
  );

  // Get student notifications
  const studentNotifications = mockNotifications.filter(notif => 
    !notif.batchId || enrolledBatches.some(batch => batch.id === notif.batchId)
  ).slice(0, 3);

  // Calculate attendance percentage
  const attendancePercentage = studentAttendance.length > 0 
    ? Math.round((studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length) * 100)
    : 0;

  const stats = [
    {
      title: 'Enrolled Batches',
      value: enrolledBatches.length,
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Study Materials',
      value: studentMaterials.length,
      icon: FileText,
      color: 'text-secondary'
    },
    {
      title: 'Attendance Rate',
      value: `${attendancePercentage}%`,
      icon: CheckCircle,
      color: 'text-accent'
    },
    {
      title: 'Pending Payments',
      value: studentPayments.filter(p => p.status === 'pending').length,
      icon: CreditCard,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {student.name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey with your enrolled batches.
          </p>
        </div>
        <Avatar className="h-16 w-16">
          <AvatarImage src={student.photo} alt={student.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {student.name.split(' ').map(n => n[0]).join('')}
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
        {/* Enrolled Batches */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              My Batches
            </CardTitle>
            <CardDescription>
              Your enrolled classes and subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{batch.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {batch.schedule}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{batch.subject}</Badge>
                      <Badge variant="secondary">{batch.class}</Badge>
                    </div>
                  </div>
                </div>
              ))}
              {enrolledBatches.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No enrolled batches found.
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
              Notifications
            </CardTitle>
            <CardDescription>
              Latest updates from your classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentNotifications.map((notification) => (
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
              {studentNotifications.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No recent notifications.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Study Materials */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Materials
            </CardTitle>
            <CardDescription>
              Latest study materials uploaded to your batches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentMaterials.slice(0, 4).map((material) => {
                const batch = enrolledBatches.find(b => b.id === material.batchId);
                return (
                  <div key={material.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                    <div className="p-2 rounded bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">
                        {material.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {batch?.name} • {new Date(material.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {material.type.toUpperCase()}
                    </Badge>
                  </div>
                );
              })}
              {studentMaterials.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No study materials available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Student Profile Summary */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
            <CardDescription>Your academic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Academic Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Class:</span> {student.class}</p>
                  <p><span className="text-muted-foreground">Year:</span> {student.year}</p>
                  <p><span className="text-muted-foreground">Institution:</span> {student.institution}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Email:</span> {student.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {student.phone}</p>
                  <p><span className="text-muted-foreground">Parent:</span> {student.parentsName}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Address</h4>
                <div className="text-sm text-muted-foreground">
                  <p>{student.address}</p>
                  <p>PIN: {student.pincode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
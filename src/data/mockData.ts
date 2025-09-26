// Mock data for the Teacher-Student Management System

export interface User {
  id: string;
  role: 'teacher' | 'student';
  name: string;
  email: string;
  photo?: string;
  phone: string;
  whatsapp: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  district?: string;
  state?: string;
  pincode: string;
}

export interface Teacher extends User {
  role: 'teacher';
  socialLinks?: string[];
  subjects: string[];
  classes: string[];
  board: string;
  university: string;
}

export interface Student extends User {
  role: 'student';
  class: string;
  year: string;
  institution: string;
  parentsName: string;
  parentsPhone: string;
}

export interface Batch {
  id: string;
  name: string;
  teacherId: string;
  subject: string;
  class: string;
  board: string;
  students: string[];
  schedule: string;
  description: string;
}

export interface StudyMaterial {
  id: string;
  batchId: string;
  title: string;
  type: 'pdf' | 'video' | 'document';
  url: string;
  uploadDate: string;
  description: string;
}

export interface Attendance {
  id: string;
  batchId: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

export interface Payment {
  id: string;
  studentId: string;
  batchId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success';
  batchId?: string;
}

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: 'teacher1',
    role: 'teacher',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@edu.com',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616c4d1e0fe?w=150&h=150&fit=crop&crop=face',
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    dateOfBirth: '1985-05-15',
    gender: 'female',
    address: '123 Education Street',
    district: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    socialLinks: ['linkedin.com/in/priyasharma'],
    subjects: ['Mathematics', 'Physics'],
    classes: ['Class 10', 'Class 11', 'Class 12'],
    board: 'CBSE',
    university: 'University of Mumbai'
  }
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 'student1',
    role: 'student',
    name: 'Rahul Verma',
    email: 'rahul.verma@student.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+91 9876543211',
    whatsapp: '+91 9876543211',
    dateOfBirth: '2006-08-20',
    gender: 'male',
    address: '456 Student Lane',
    pincode: '400002',
    class: 'Class 12',
    year: '2024',
    institution: 'St. Xavier\'s High School',
    parentsName: 'Mr. Suresh Verma',
    parentsPhone: '+91 9876543212'
  },
  {
    id: 'student2',
    role: 'student',
    name: 'Ananya Patel',
    email: 'ananya.patel@student.com',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '+91 9876543213',
    whatsapp: '+91 9876543213',
    dateOfBirth: '2007-03-10',
    gender: 'female',
    address: '789 Learning Avenue',
    pincode: '400003',
    class: 'Class 11',
    year: '2024',
    institution: 'Delhi Public School',
    parentsName: 'Mrs. Kavita Patel',
    parentsPhone: '+91 9876543214'
  }
];

// Mock Batches
export const mockBatches: Batch[] = [
  {
    id: 'batch1',
    name: 'Advanced Mathematics - Class 12',
    teacherId: 'teacher1',
    subject: 'Mathematics',
    class: 'Class 12',
    board: 'CBSE',
    students: ['student1'],
    schedule: 'Mon, Wed, Fri - 4:00 PM to 6:00 PM',
    description: 'Comprehensive mathematics course covering calculus, algebra, and geometry for Class 12 CBSE students.'
  },
  {
    id: 'batch2',
    name: 'Physics Fundamentals - Class 11',
    teacherId: 'teacher1',
    subject: 'Physics',
    class: 'Class 11',
    board: 'CBSE',
    students: ['student2'],
    schedule: 'Tue, Thu, Sat - 2:00 PM to 4:00 PM',
    description: 'Foundation physics course covering mechanics, thermodynamics, and waves for Class 11 students.'
  }
];

// Mock Study Materials
export const mockStudyMaterials: StudyMaterial[] = [
  {
    id: 'material1',
    batchId: 'batch1',
    title: 'Calculus - Integration Techniques',
    type: 'pdf',
    url: '#',
    uploadDate: '2024-01-15',
    description: 'Comprehensive guide on integration techniques with solved examples.'
  },
  {
    id: 'material2',
    batchId: 'batch1',
    title: 'Coordinate Geometry - Video Lecture',
    type: 'video',
    url: '#',
    uploadDate: '2024-01-10',
    description: 'Video lecture explaining coordinate geometry concepts with visual aids.'
  },
  {
    id: 'material3',
    batchId: 'batch2',
    title: 'Laws of Motion - Notes',
    type: 'document',
    url: '#',
    uploadDate: '2024-01-12',
    description: 'Detailed notes on Newton\'s laws of motion with practical examples.'
  }
];

// Mock Attendance
export const mockAttendance: Attendance[] = [
  {
    id: 'att1',
    batchId: 'batch1',
    studentId: 'student1',
    date: '2024-01-15',
    status: 'present'
  },
  {
    id: 'att2',
    batchId: 'batch1',
    studentId: 'student1',
    date: '2024-01-17',
    status: 'present'
  },
  {
    id: 'att3',
    batchId: 'batch2',
    studentId: 'student2',
    date: '2024-01-16',
    status: 'present'
  }
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    studentId: 'student1',
    batchId: 'batch1',
    amount: 5000,
    status: 'paid',
    dueDate: '2024-01-01',
    paidDate: '2023-12-28'
  },
  {
    id: 'pay2',
    studentId: 'student2',
    batchId: 'batch2',
    amount: 4500,
    status: 'pending',
    dueDate: '2024-02-01'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    title: 'New Assignment Uploaded',
    message: 'A new assignment has been uploaded for Advanced Mathematics batch.',
    date: '2024-01-15',
    type: 'info',
    batchId: 'batch1'
  },
  {
    id: 'notif2',
    title: 'Payment Reminder',
    message: 'Your monthly fee payment is due on February 1st, 2024.',
    date: '2024-01-20',
    type: 'warning'
  },
  {
    id: 'notif3',
    title: 'Test Scheduled',
    message: 'Unit test for Physics Fundamentals is scheduled for next week.',
    date: '2024-01-18',
    type: 'info',
    batchId: 'batch2'
  }
];

// Authentication helpers
export const authenticateUser = (id: string, password: string, role: 'teacher' | 'student') => {
  // Simple mock authentication - in real app, this would be secure
  const users = role === 'teacher' ? mockTeachers : mockStudents;
  const user = users.find(u => u.id === id);
  
  // For demo purposes, password is always "password123"
  if (user && password === 'password123') {
    return user;
  }
  return null;
};
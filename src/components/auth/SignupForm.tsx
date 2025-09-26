import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Users, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [role, setRole] = useState<'teacher' | 'student'>('student');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [teacherForm, setTeacherForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    socialLinks: '',
    subjects: '',
    classes: '',
    board: '',
    university: ''
  });

  const [studentForm, setStudentForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    dateOfBirth: '',
    email: '',
    gender: '',
    address: '',
    pincode: '',
    class: '',
    year: '',
    institution: '',
    parentsName: '',
    parentsPhone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate signup process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration Successful!",
        description: `Your ${role} account has been created. Please contact admin for account activation.`,
      });
      
      onSwitchToLogin();
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const TeacherSignupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacher-fullName">Full Name *</Label>
          <Input
            id="teacher-fullName"
            value={teacherForm.fullName}
            onChange={(e) => setTeacherForm({...teacherForm, fullName: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-email">Email *</Label>
          <Input
            id="teacher-email"
            type="email"
            value={teacherForm.email}
            onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-phone">Phone Number *</Label>
          <Input
            id="teacher-phone"
            value={teacherForm.phone}
            onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-whatsapp">WhatsApp Number *</Label>
          <Input
            id="teacher-whatsapp"
            value={teacherForm.whatsapp}
            onChange={(e) => setTeacherForm({...teacherForm, whatsapp: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-dob">Date of Birth *</Label>
          <Input
            id="teacher-dob"
            type="date"
            value={teacherForm.dateOfBirth}
            onChange={(e) => setTeacherForm({...teacherForm, dateOfBirth: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-gender">Gender *</Label>
          <Select onValueChange={(value) => setTeacherForm({...teacherForm, gender: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="teacher-address">Full Address *</Label>
        <Textarea
          id="teacher-address"
          value={teacherForm.address}
          onChange={(e) => setTeacherForm({...teacherForm, address: e.target.value})}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacher-district">District *</Label>
          <Input
            id="teacher-district"
            value={teacherForm.district}
            onChange={(e) => setTeacherForm({...teacherForm, district: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-state">State *</Label>
          <Input
            id="teacher-state"
            value={teacherForm.state}
            onChange={(e) => setTeacherForm({...teacherForm, state: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-pincode">Pin Code *</Label>
          <Input
            id="teacher-pincode"
            value={teacherForm.pincode}
            onChange={(e) => setTeacherForm({...teacherForm, pincode: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacher-subjects">Subjects *</Label>
          <Input
            id="teacher-subjects"
            placeholder="e.g., Mathematics, Physics"
            value={teacherForm.subjects}
            onChange={(e) => setTeacherForm({...teacherForm, subjects: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-classes">Classes *</Label>
          <Input
            id="teacher-classes"
            placeholder="e.g., Class 10, 11, 12"
            value={teacherForm.classes}
            onChange={(e) => setTeacherForm({...teacherForm, classes: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-board">Board *</Label>
          <Select onValueChange={(value) => setTeacherForm({...teacherForm, board: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE">CBSE</SelectItem>
              <SelectItem value="ICSE">ICSE</SelectItem>
              <SelectItem value="State Board">State Board</SelectItem>
              <SelectItem value="IB">IB</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="teacher-university">University *</Label>
          <Input
            id="teacher-university"
            value={teacherForm.university}
            onChange={(e) => setTeacherForm({...teacherForm, university: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="teacher-social">Social Links</Label>
        <Input
          id="teacher-social"
          placeholder="LinkedIn, Twitter, etc."
          value={teacherForm.socialLinks}
          onChange={(e) => setTeacherForm({...teacherForm, socialLinks: e.target.value})}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Teacher Account'}
      </Button>
    </form>
  );

  const StudentSignupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="student-fullName">Full Name *</Label>
          <Input
            id="student-fullName"
            value={studentForm.fullName}
            onChange={(e) => setStudentForm({...studentForm, fullName: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-email">Email *</Label>
          <Input
            id="student-email"
            type="email"
            value={studentForm.email}
            onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-phone">Phone Number *</Label>
          <Input
            id="student-phone"
            value={studentForm.phone}
            onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-whatsapp">WhatsApp Number *</Label>
          <Input
            id="student-whatsapp"
            value={studentForm.whatsapp}
            onChange={(e) => setStudentForm({...studentForm, whatsapp: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-dob">Date of Birth *</Label>
          <Input
            id="student-dob"
            type="date"
            value={studentForm.dateOfBirth}
            onChange={(e) => setStudentForm({...studentForm, dateOfBirth: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-gender">Gender *</Label>
          <Select onValueChange={(value) => setStudentForm({...studentForm, gender: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="student-address">Full Address *</Label>
        <Textarea
          id="student-address"
          value={studentForm.address}
          onChange={(e) => setStudentForm({...studentForm, address: e.target.value})}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="student-pincode">Pin Code *</Label>
          <Input
            id="student-pincode"
            value={studentForm.pincode}
            onChange={(e) => setStudentForm({...studentForm, pincode: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-class">Class *</Label>
          <Select onValueChange={(value) => setStudentForm({...studentForm, class: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Class 9">Class 9</SelectItem>
              <SelectItem value="Class 10">Class 10</SelectItem>
              <SelectItem value="Class 11">Class 11</SelectItem>
              <SelectItem value="Class 12">Class 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-year">Year *</Label>
          <Input
            id="student-year"
            placeholder="2024"
            value={studentForm.year}
            onChange={(e) => setStudentForm({...studentForm, year: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-institution">Institution Name *</Label>
          <Input
            id="student-institution"
            placeholder="School/College name"
            value={studentForm.institution}
            onChange={(e) => setStudentForm({...studentForm, institution: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-parentsName">Parent's Name *</Label>
          <Input
            id="student-parentsName"
            value={studentForm.parentsName}
            onChange={(e) => setStudentForm({...studentForm, parentsName: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="student-parentsPhone">Parent's Phone *</Label>
          <Input
            id="student-parentsPhone"
            value={studentForm.parentsPhone}
            onChange={(e) => setStudentForm({...studentForm, parentsPhone: e.target.value})}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Student Account'}
      </Button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4" 
         style={{ background: 'var(--gradient-hero)' }}>
      <Card className="w-full max-w-4xl shadow-[var(--shadow-strong)]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Sign up to start your learning journey
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={role} onValueChange={(value) => setRole(value as 'teacher' | 'student')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="teacher" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Teacher
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4">
              <StudentSignupForm />
            </TabsContent>

            <TabsContent value="teacher" className="space-y-4">
              <TeacherSignupForm />
            </TabsContent>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-semibold text-primary"
                  onClick={onSwitchToLogin}
                >
                  Sign in here
                </Button>
              </p>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
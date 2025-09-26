import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Users, Clock, Plus, Edit, Trash2, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockBatches, mockStudents, Teacher } from '../../data/mockData';
import { useToast } from '@/hooks/use-toast';

const TeacherBatches: React.FC = () => {
  const { user } = useAuth();
  const teacher = user as Teacher;
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get teacher's batches
  const teacherBatches = mockBatches.filter(batch => batch.teacherId === teacher.id);
  
  // Filter batches based on search
  const filteredBatches = teacherBatches.filter(batch =>
    batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBatch = () => {
    toast({
      title: "Add Batch",
      description: "This is a demo feature. In a real app, this would open a form to create a new batch.",
    });
  };

  const handleEditBatch = (batchId: string) => {
    toast({
      title: "Edit Batch",
      description: "This is a demo feature. In a real app, this would open a form to edit the batch.",
    });
  };

  const handleDeleteBatch = (batchId: string) => {
    toast({
      title: "Delete Batch",
      description: "This is a demo feature. In a real app, this would delete the batch after confirmation.",
      variant: "destructive",
    });
  };

  const getStudentNames = (studentIds: string[]) => {
    return studentIds.map(id => {
      const student = mockStudents.find(s => s.id === id);
      return student ? student.name : 'Unknown Student';
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Batch Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your teaching batches and classes
          </p>
        </div>
        <Button onClick={handleAddBatch} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Batch
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{teacherBatches.length}</p>
            <p className="text-sm text-muted-foreground">Total Batches</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {teacherBatches.reduce((total, batch) => total + batch.students.length, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => {
          const studentNames = getStudentNames(batch.students);
          
          return (
            <Card key={batch.id} className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{batch.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {batch.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBatch(batch.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBatch(batch.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">{batch.subject}</Badge>
                  <Badge variant="secondary">{batch.class}</Badge>
                  <Badge variant="outline">{batch.board}</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{batch.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {batch.students.length} student{batch.students.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                {batch.students.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Enrolled Students:</p>
                    <div className="space-y-1">
                      {studentNames.slice(0, 3).map((name, index) => (
                        <p key={index} className="text-sm text-muted-foreground">• {name}</p>
                      ))}
                      {studentNames.length > 3 && (
                        <p className="text-sm text-muted-foreground">
                          • +{studentNames.length - 3} more students
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredBatches.length === 0 && (
        <Card className="shadow-[var(--shadow-soft)]">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm ? 'No batches found' : 'No batches created yet'}
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm 
                ? 'Try adjusting your search terms to find batches.'
                : 'Create your first batch to start teaching and managing students.'
              }
            </p>
            {!searchTerm && (
              <Button onClick={handleAddBatch} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Batch
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeacherBatches;
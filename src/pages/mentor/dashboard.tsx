import { useState } from "react";
import { Search, Filter, Send, Calendar, Users, BookOpen, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students } from "@/data/students";
import { SkillTag } from "@/components/SkillTag";
import { InvitationModal } from "@/components/InvitationModal";
import { AnalyticsWidget } from "@/components/AnalyticsWidget";

export default function MentorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock mentor data
  const mentorData = {
    name: "Dr. Sarah Chen",
    title: "Senior Software Engineer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    skills: ["React", "Python", "Machine Learning", "System Design", "Leadership"],
    bio: "Passionate about mentoring the next generation of developers with 8+ years in tech.",
    studentsHelped: 45,
    totalSessions: 127,
    avgRating: 4.9
  };

  // Mock sent invitations
  const sentInvitations = [
    {
      id: "1",
      studentName: "Alex Johnson", 
      studentAvatar: students[0].avatar,
      status: "pending",
      sentAt: "2024-01-15T10:00:00Z"
    },
    {
      id: "2", 
      studentName: "Maria Garcia",
      studentAvatar: students[1].avatar,
      status: "accepted",
      sentAt: "2024-01-14T15:30:00Z"
    },
    {
      id: "3",
      studentName: "David Kim", 
      studentAvatar: students[2].avatar,
      status: "declined",
      sentAt: "2024-01-13T09:15:00Z"
    }
  ];

  // Mock calendar sessions
  const sessions = [
    { id: 1, time: "10:00 AM", student: "Alex Chen", topic: "React Advanced Patterns", date: new Date(2024, 2, 20) },
    { id: 2, time: "2:00 PM", student: "Sarah Williams", topic: "UI/UX Design Review", date: new Date(2024, 2, 20) },
    { id: 3, time: "4:00 PM", student: "Raj Patel", topic: "System Design", date: new Date(2024, 2, 22) },
    { id: 4, time: "11:00 AM", student: "Emily Johnson", topic: "Machine Learning Career Path", date: new Date(2024, 2, 25) },
  ];

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = !skillFilter || student.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    const matchesCollege = !collegeFilter || student.college === collegeFilter;
    
    return matchesSearch && matchesSkill && matchesCollege;
  });

  // Get unique colleges for filter
  const colleges = [...new Set(students.map(s => s.college))];
  
  // Get unique skills for filter
  const allSkills = [...new Set(students.flatMap(s => s.skills))];

  const handleSendInvitation = (student: any) => {
    setSelectedStudent(student);
    setIsInviteModalOpen(true);
  };

  const handleInviteAction = async (action: "send", notes?: string) => {
    console.log("Sending invitation to:", selectedStudent?.name, "with notes:", notes);
    // Handle invitation logic here
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      accepted: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400", 
      declined: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === 'next' ? 1 : -1), 1));
  };

  const getSessionsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return sessions.filter(session => 
      session.date.toDateString() === date.toDateString()
    );
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const sessionsForDay = getSessionsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div key={day} className={`h-24 p-1 border border-border/50 ${isToday ? 'bg-primary/10' : 'hover:bg-muted/50'}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary font-bold' : 'text-foreground'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {sessionsForDay.slice(0, 2).map(session => (
              <div key={session.id} className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate">
                {session.time} - {session.student}
              </div>
            ))}
            {sessionsForDay.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{sessionsForDay.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
            <p className="text-muted-foreground">Connect with talented students and guide their careers</p>
          </div>
        </div>

        {/* Mentor Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mentorData.avatar} />
                <AvatarFallback>{mentorData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">{mentorData.name}</h2>
                <p className="text-muted-foreground">{mentorData.title}</p>
                <p className="text-sm text-muted-foreground mt-2">{mentorData.bio}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {mentorData.skills.slice(0, 5).map(skill => (
                    <SkillTag key={skill} skill={skill} variant="secondary" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AnalyticsWidget
            title="Students Helped"
            value={mentorData.studentsHelped}
            change={{ value: 12, type: "increase", period: "this year" }}
            icon={<Users className="h-4 w-4" />}
            color="blue"
          />
          <AnalyticsWidget
            title="Total Sessions"
            value={mentorData.totalSessions}
            change={{ value: 8, type: "increase", period: "this month" }}
            icon={<BookOpen className="h-4 w-4" />}
            color="green"
          />
          <AnalyticsWidget
            title="Average Rating"
            value={mentorData.avgRating}
            change={{ value: 2, type: "increase", period: "vs last month" }}
            icon={<Star className="h-4 w-4" />}
            color="purple"
          />
          <AnalyticsWidget
            title="Active Mentees"
            value={12}
            change={{ value: 3, type: "increase", period: "this week" }}
            icon={<Users className="h-4 w-4" />}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Search & Discovery */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Discover Students
                <Badge variant="secondary">{filteredStudents.length} found</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or college..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Skills</SelectItem>
                    {allSkills.slice(0, 10).map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Colleges</SelectItem>
                    {colleges.map(college => (
                      <SelectItem key={college} value={college}>{college}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Student Cards */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.college} • {student.year}</p>
                      <p className="text-sm text-muted-foreground mt-1">{student.major}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {student.skills.slice(0, 4).map(skill => (
                          <SkillTag key={skill} skill={skill} variant="outline" />
                        ))}
                        {student.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        onClick={() => handleSendInvitation(student)}
                        className="bg-gradient-to-r from-primary to-primary-glow"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No students found</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sent Invitations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Sent Invitations
                <Badge variant="secondary">{sentInvitations.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentInvitations.map((invitation) => (
                  <div key={invitation.id} className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={invitation.studentAvatar} />
                      <AvatarFallback>{invitation.studentName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {invitation.studentName}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getStatusBadge(invitation.status)}>
                          {invitation.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(invitation.sentAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {sentInvitations.length === 0 && (
                  <div className="text-center py-4">
                    <Send className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No invitations sent yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mock Calendar for Session Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Session Calendar
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {formatDate(currentDate)}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarGrid()}
            </div>
            
            {/* Upcoming Sessions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Upcoming Sessions</h3>
              <div className="space-y-2">
                {sessions.slice(0, 3).map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{session.time}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-foreground">{session.student}</span>
                        <span className="text-muted-foreground"> • {session.topic}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.date.toLocaleDateString()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invitation Modal */}
        <InvitationModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
          type="send"
          student={selectedStudent}
          onAction={handleInviteAction}
        />
      </div>
    </div>
  );
}
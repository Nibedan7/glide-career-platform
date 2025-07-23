import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { SkillTag } from "@/components/SkillTag";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Github, Linkedin, Globe, Plus, Pencil, Trash2, Edit, User, Phone, MapPin, Calendar, BookOpen, Award, Briefcase, FileText, Camera } from "lucide-react";
import { students } from "@/data/students";
import { SidebarLayout } from "@/layouts/SidebarLayout";

interface Education {
  id: string;
  level: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  percentage?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

interface Internship {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export default function EditProfile() {
  const currentStudent = students[0]; // Mock current user
  const [skills, setSkills] = useState<string[]>(currentStudent.skills);
  const [skillInput, setSkillInput] = useState("");
  
  // Mock additional data
  const [profileData, setProfileData] = useState({
    registrationNo: "ST2024001",
    gender: "Male",
    dateOfBirth: "1998-05-15",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    profileScore: 85
  });

  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      level: "Bachelor",
      institution: "Stanford University",
      field: "Computer Science",
      startYear: "2020",
      endYear: "2024",
      percentage: "3.8 GPA"
    }
  ]);

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023-08-15",
      credentialId: "AWS-DEV-123456"
    }
  ]);

  const [internships, setInternships] = useState<Internship[]>([
    {
      id: "1",
      company: "Google",
      role: "Software Engineering Intern",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      description: "Developed features for Google Search using Python and Go",
      skills: ["Python", "Go", "Machine Learning"]
    }
  ]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const profileCompletion = 85; // Mock completion percentage

  return (
    <SidebarLayout userRole="student">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
          
          {/* Hero Section - Profile Card */}
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Profile Image */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 lg:w-40 lg:h-40">
                    <AvatarImage src={currentStudent.avatar} />
                    <AvatarFallback>{currentStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="p-2">
                        <Camera className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="p-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{currentStudent.name}</h2>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                          <span className="text-lg font-bold text-primary">{profileData.profileScore}%</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Profile Score</span>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Profile Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={currentStudent.name} />
                          </div>
                          <div>
                            <Label htmlFor="regNo">Registration No.</Label>
                            <Input id="regNo" defaultValue={profileData.registrationNo} />
                          </div>
                          <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select defaultValue={profileData.gender}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" defaultValue={profileData.dateOfBirth} />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" defaultValue={profileData.phone} />
                          </div>
                          <div>
                            <Label htmlFor="location">Current Location</Label>
                            <Input id="location" defaultValue={profileData.location} />
                          </div>
                          <Button className="w-full">Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{currentStudent.college}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.registrationNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Gender:</span>
                      <span>{profileData.gender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {currentStudent.bio}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Completion
                <span className="text-primary font-bold">{profileCompletion}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={profileCompletion} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Complete your profile to increase visibility to employers and mentors
              </p>
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Education
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Education</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Education Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="X">Class X (High School)</SelectItem>
                            <SelectItem value="XII">Class XII (Senior Secondary)</SelectItem>
                            <SelectItem value="Diploma">Diploma</SelectItem>
                            <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="Master">Master's Degree</SelectItem>
                            <SelectItem value="Doctorate">Doctorate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="institution">Institution</Label>
                        <Input id="institution" placeholder="University/School name" />
                      </div>
                      <div>
                        <Label htmlFor="field">Field of Study</Label>
                        <Input id="field" placeholder="e.g., Computer Science" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startYear">Start Year</Label>
                          <Input id="startYear" placeholder="2020" />
                        </div>
                        <div>
                          <Label htmlFor="endYear">End Year</Label>
                          <Input id="endYear" placeholder="2024" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="percentage">Grade/Percentage</Label>
                        <Input id="percentage" placeholder="e.g., 3.8 GPA or 85%" />
                      </div>
                      <Button className="w-full">Add Education</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {educations.map((education) => (
                  <div key={education.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{education.level} in {education.field}</h4>
                        <p className="text-sm text-muted-foreground">{education.institution}</p>
                        <p className="text-xs text-muted-foreground">
                          {education.startYear} - {education.endYear}
                          {education.percentage && ` • ${education.percentage}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certification Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Certification</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="certName">Certificate Name</Label>
                        <Input id="certName" placeholder="e.g., AWS Certified Developer" />
                      </div>
                      <div>
                        <Label htmlFor="issuer">Issuing Organization</Label>
                        <Input id="issuer" placeholder="e.g., Amazon Web Services" />
                      </div>
                      <div>
                        <Label htmlFor="certDate">Issue Date</Label>
                        <Input id="certDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="credentialId">Credential ID (Optional)</Label>
                        <Input id="credentialId" placeholder="Certificate ID or URL" />
                      </div>
                      <Button className="w-full">Add Certification</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground">
                          Issued: {new Date(cert.date).toLocaleDateString()}
                          {cert.credentialId && ` • ID: ${cert.credentialId}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Internship Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Internships
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Internship
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add Internship</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Company name" />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" placeholder="e.g., Software Engineering Intern" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input id="startDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input id="endDate" type="date" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe your work and achievements" />
                      </div>
                      <div>
                        <Label htmlFor="internSkills">Skills Used</Label>
                        <Input id="internSkills" placeholder="Comma-separated skills" />
                      </div>
                      <Button className="w-full">Add Internship</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internships.map((internship) => (
                  <div key={internship.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{internship.role}</h4>
                        <p className="text-sm text-muted-foreground">{internship.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(internship.startDate).toLocaleDateString()} - {new Date(internship.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-2">{internship.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {internship.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    removable
                    onRemove={removeSkill}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Projects
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add Project</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input id="projectName" placeholder="Project title" />
                      </div>
                      <div>
                        <Label htmlFor="projectDesc">Description</Label>
                        <Textarea id="projectDesc" placeholder="Describe your project" />
                      </div>
                      <div>
                        <Label htmlFor="technologies">Technologies Used</Label>
                        <Input id="technologies" placeholder="Comma-separated technologies" />
                      </div>
                      <div>
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input id="githubUrl" placeholder="https://github.com/..." />
                      </div>
                      <div>
                        <Label htmlFor="liveUrl">Live Demo URL</Label>
                        <Input id="liveUrl" placeholder="https://..." />
                      </div>
                      <Button className="w-full">Add Project</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{project.name}</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 text-sm">
                      {project.githubUrl && (
                        <a href={project.githubUrl} className="text-primary hover:underline">
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} className="text-primary hover:underline">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <Input 
                  placeholder="GitHub URL" 
                  defaultValue={currentStudent.githubUrl}
                />
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-5 w-5" />
                <Input 
                  placeholder="LinkedIn URL" 
                  defaultValue={currentStudent.linkedinUrl}
                />
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <Input 
                  placeholder="Portfolio URL" 
                  defaultValue={currentStudent.portfolioUrl}
                />
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  {currentStudent.resumeUrl ? 
                    "Current resume: alex-chen.pdf" : 
                    "Drag and drop your resume or click to browse"
                  }
                </p>
                <Button variant="outline">
                  {currentStudent.resumeUrl ? "Replace Resume" : "Upload Resume"}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: PDF, DOC, DOCX (Max size: 5MB)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
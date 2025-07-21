import { Rocket, Users, Star, TrendingUp, Shield, Zap } from "lucide-react";
import { LandingHero } from "../components/LandingHero";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Index = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Skill-Based Matching",
      description: "Advanced algorithms connect students with opportunities that match their skills and interests."
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals who've walked the path you want to take."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Verified Opportunities", 
      description: "All companies and mentors are verified to ensure quality and safety."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Career Growth",
      description: "Track your progress, build your portfolio, and advance your career step by step."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Fast Connections",
      description: "Quick application process and rapid response times from companies."
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Launch Ready",
      description: "Get internship-ready with our comprehensive preparation resources."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Kim",
      role: "Software Engineer at Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c9ba?w=100&h=100&fit=crop&crop=face",
      content: "CareerGlide connected me with an amazing mentor who helped me land my dream job. The platform made networking feel natural and effective."
    },
    {
      name: "Alex Rodriguez",
      role: "Product Manager at Meta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "As a mentor on CareerGlide, I love seeing students grow and succeed. It's incredibly rewarding to guide the next generation of tech professionals."
    },
    {
      name: "Emily Chen",
      role: "UX Designer at Apple",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "The skill-based matching on CareerGlide is spot-on. I found internships that perfectly aligned with my interests and career goals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CareerGlide
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/jobs" className="text-muted-foreground hover:text-foreground transition-colors">Jobs</a>
            <a href="/mentors" className="text-muted-foreground hover:text-foreground transition-colors">Mentors</a>
            <a href="/companies" className="text-muted-foreground hover:text-foreground transition-colors">Companies</a>
            <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90">
              <a href="/register">Get Started</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Platform Features</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Everything you need to 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> launch your career</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and connections you need to succeed in today's competitive job market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              Loved by students and professionals
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of students and professionals who have accelerated their careers with CareerGlide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-card-hover transition-all duration-200">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">
              Ready to launch your career?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join CareerGlide today and take the first step towards your dream career. Connect with top companies, find expert mentors, and build the skills that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90" asChild>
                <a href="/register">Start Your Journey</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

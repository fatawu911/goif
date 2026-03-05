import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Globe, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState as useStateDialog } from "react";
import hero1 from "@/assets/images/hero1.jpg";
import hero2 from "@/assets/images/hero2.jpg";
import hero3 from "@/assets/images/hero3.png";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}


interface Program {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  images?: string[];
  date: string;
  location: string;
}

const Home = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsSnapshot, programsSnapshot] = await Promise.all([
          getDocs(collection(db, "GOIF")),
          getDocs(collection(db, "programs_upcoming")),
        ]);

        const projectsData: Project[] = [];
        projectsSnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() } as Project);
        });
        setProjects(projectsData.slice(0, 3));

        const programsData: Program[] = [];
        programsSnapshot.forEach((doc) => {
          programsData.push({ id: doc.id, ...doc.data() } as Program);
        });
        setPrograms(programsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [showProgramsDialog, setShowProgramsDialog] = useState(false);

  const heroSlides = [
    {
      title: "Empowering Communities Through Education",
      description: "Join us in making a difference through sustainable development and global partnerships.",
      image: hero1,
      buttons: [
        { text: "Get Involved", href: "/contact" },
        { text: "Upcoming Programs", action: () => setShowProgramsDialog(true), variant: "secondary" as const },
      ],
    },
    {
      title: "Building a Sustainable Future",
      description: "Creating lasting impact through innovative solutions and community-driven initiatives.",
      image: hero2,
      buttons: [
        { text: "Learn More", href: "/about" },
        { text: "Upcoming Programs", action: () => setShowProgramsDialog(true), variant: "secondary" as const },
      ],
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower communities through education, sustainable development, and meaningful partnerships.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Working directly with local communities to create lasting positive change and opportunities.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting people and resources across borders to address challenges together.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero slides={heroSlides} />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Detail Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={(open) => !open && setSelectedProgram(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProgram.title}</DialogTitle>
                {(selectedProgram.date || selectedProgram.location) && (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {selectedProgram.date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{selectedProgram.date}</span>
                      </div>
                    )}
                    {selectedProgram.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{selectedProgram.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </DialogHeader>
              {(() => {
                const allImages = [
                  ...(selectedProgram.image ? [selectedProgram.image] : []),
                  ...(selectedProgram.images || []),
                ];
                return allImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allImages.map((img, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`${selectedProgram.title} - ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                ) : null;
              })()}
              {selectedProgram.subtitle && (
                <h3 className="text-lg font-semibold text-foreground">{selectedProgram.subtitle}</h3>
              )}
              <DialogDescription className="text-base leading-relaxed">
                {selectedProgram.description}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* Programs List Dialog (from Hero button) */}
      <Dialog open={showProgramsDialog} onOpenChange={setShowProgramsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Upcoming Programs</DialogTitle>
            <DialogDescription>Browse our latest programs and initiatives</DialogDescription>
          </DialogHeader>
          {programs.length > 0 ? (
            <div className="space-y-4">
              {programs.map((program) => (
                <Card
                  key={program.id}
                  className="overflow-hidden border shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => { setShowProgramsDialog(false); setSelectedProgram(program); }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {program.image && (
                      <div className="sm:w-48 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                        <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <CardContent className="p-4 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-foreground mb-2">{program.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{program.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {program.date && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 text-primary" />
                            <span>{program.date}</span>
                          </div>
                        )}
                        {program.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 text-primary" />
                            <span>{program.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No upcoming programs at this time.</p>
          )}
        </DialogContent>
      </Dialog>


      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover some of our impactful initiatives making a difference in communities worldwide
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-muted animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted animate-pulse mb-3 rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No projects available yet.</p>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary-light">
              <Link to="/projects">
                View All Projects <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join us in our mission to create positive change and empower communities around the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary-light text-secondary-foreground"
            >
              <Link to="/contact">Get Involved</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground text-secondary hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

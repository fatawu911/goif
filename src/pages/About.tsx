import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Heart } from "lucide-react";
import hero1 from "@/assets/images/hero1.jpg";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team"));
        const teamData: TeamMember[] = [];
        querySnapshot.forEach((doc) => {
          teamData.push({ id: doc.id, ...doc.data() } as TeamMember);
        });
        setTeamMembers(teamData);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const heroSlides = [
    {
      title: "About GOIF",
      description: "The Global Open Initiative is a young not-for-profit organization made up of a dedicated group of open advocates who are striving to solve social problems that confront our communities; such as challenges in public services delivery, transparency and democratic control, and availability of educational resources. We are devoted to achieving this by enhancing visibility of open access material, information and data that strengthens the basis for valorization of the knowledge needed to tackle these issues.",
      image: hero1,
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "We are committed to creating sustainable impact through innovative solutions and community engagement.",
    },
    {
      icon: Eye,
      title: "Visionary Approach",
      description: "Building a future where information and opportunity are accessible to all communities worldwide.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for the highest standards in everything we do, from project implementation to community engagement.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Approaching every challenge with empathy and understanding, putting people first in all our initiatives.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero slides={heroSlides} autoPlay={false} />

      {/* Mission & Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to help groom the skills and talents of Ghanaian youths through volunteering. 
                  By empowering them to lead and contribute to open-source projects like Wikipedia, 
                  we provide a platform and opportunities for them to apply the knowledge they acquired from schools. 
                  We also equip them with skills, knowledge, and experiences that could be of great benefit to them career-wise. 
                  We do what we do because the Ghanaian educational system, due to its impractical nature, has failed to prepare graduates for the job market. 
                  We believe that aside from internships, there are many benefits that students and graduates can gain from volunteering their service to a good cause.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every community has access to information, we are devoted to open access to materials, information and data 
                  that strengthens the basis for valorization of the knowledge needed to tackle challenges in public services delivery, 
                  transparency and democratic control, and availability of educational resources
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape our approach to community empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">Our Story</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                GOIF was founded with a simple yet powerful vision: to create meaningful change in communities that need it most.
                What started as a grassroots initiative has grown into a comprehensive organization dedicated to sustainable
                development and knowledge sharing.
              </p>
              <p>
                Over the years, we've expanded our reach while staying true to our core mission. Through partnerships with local
                communities, international organizations, and passionate individuals, we've been able to implement projects that
                make a real difference in people's lives.
              </p>
              <p>
                Today, GOIF continues to evolve and adapt to meet the changing needs of the communities we serve. Our commitment
                to education, sustainability, information sharing and empowerment remains as strong as ever, and we look forward to creating even
                more positive impact in the years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate individuals driving our mission forward
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square bg-muted animate-pulse" />
                  <CardContent className="p-6 text-center">
                    <div className="h-5 bg-muted animate-pulse mb-2 rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member) => (
                <Card
                  key={member.id}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold mb-1 text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No team members available yet. Check back later to meet our team.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Years of Impact" },
              { number: "500+", label: "Projects Completed" },
              { number: "50+", label: "Communities Served" },
              { number: "1000+", label: "Lives Changed" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-secondary">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

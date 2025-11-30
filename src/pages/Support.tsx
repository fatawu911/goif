import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Handshake, DollarSign, Briefcase, Gift } from "lucide-react";
import VolunteerForm from "@/components/VolunteerForm";

const Support = () => {
  const heroSlides = [
    {
      title: "Support Our Mission",
      description: "Join us in building an open, inclusive, and knowledge-powered future.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop",
    },
  ];

  const supportWays = [
    {
      icon: DollarSign,
      title: "Make a Donation",
      description: "Your financial contribution helps us fund critical projects and reach more communities in need.",
      action: "Donate Now",
      link: "/contact",
    },
    {
      icon: Users,
      title: "Volunteer With Us",
      description: "Share your skills and time to make a direct impact on the communities we serve.",
      action: "Join as Volunteer",
      link: "#volunteer",
    },
    {
      icon: Handshake,
      title: "Partner With GOIF",
      description: "Collaborate with us to amplify impact through strategic partnerships and joint initiatives.",
      action: "Become a Partner",
      link: "/contact",
    },
    {
      icon: Gift,
      title: "In-Kind Donations",
      description: "Contribute goods, services, or resources that directly support our programs and projects.",
      action: "Learn More",
      link: "/contact",
    },
  ];

  const impactStats = [
    { number: "$500", label: "Provides school supplies for 50 students" },
    { number: "$1,000", label: "Funds a community project" },
    { number: "$2,500", label: "Supports a community training program" },
    { number: "$5,000", label: "Empowers Ghanaian youth, preserves Ghana’s cultural heritage, and expands access to open knowledge" },
  ];

  return (
    <div className="min-h-screen">
      <Hero slides={heroSlides} autoPlay={false} />

      {/* Why Support Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Why Your Support Matters</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Support the Global Open Initiative Foundation (GOIF)
              Your support empowers Ghanaian youth, preserves Ghana’s cultural heritage, and expands access to open knowledge. 
              Every contribution strengthens our programmes—from Wikimedia training and digital rights advocacy to cultural documentation and open data initiatives.
              While financial support is most impactful, we also welcome in-kind contributions such as laptops or internet/data support that help us equip participants.

            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Transparent use of funds</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Direct</div>
                <p className="text-muted-foreground">Impact on communities</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Lasting</div>
                <p className="text-muted-foreground">Sustainable change</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ways to Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the way that works best for you to make a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportWays.map((way, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <way.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{way.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{way.description}</p>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => window.location.href = way.link}
                  >
                    {way.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact of Your Donation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Your Impact in Action</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how your contributions translate into real-world change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {impactStats.map((stat, index) => (
              <Card
                key={index}
                className="border-none shadow-lg text-center"
              >
                <CardContent className="p-8">
                  <div className="text-3xl font-bold text-primary mb-3">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section id="volunteer" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Volunteer With Us</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get in touch to discuss how you can make a difference.
              </p>
            </div>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <VolunteerForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              Join our community of supporters and help us create lasting change in communities worldwide.
              Together, we can build a brighter future for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8"
                onClick={() => window.location.href = "/contact"}
              >
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => window.location.href = "/contact"}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;

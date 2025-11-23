import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import hero1 from "@/assets/images/hero1.jpg";

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  regilink: string;
  feedblink: string;
  status: string; 
}

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "EVENTS"));
        const eventsData: Event[] = [];
        querySnapshot.forEach((doc) => {
          eventsData.push({ id: doc.id, ...doc.data() } as Event);
        });

        // Categorize based on status 
        const upcoming: Event[] = [];
        const past: Event[] = [];

        eventsData.forEach((event) => {
          const status = event.status || 'upcoming';  // Default to 'upcoming' if no status
          
          if (status === 'upcoming') {
            upcoming.push(event);
          } else if (status === 'past') {
            past.push(event);
          }
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const heroSlides = [
    {
      title: "Upcoming and Past Events",
      description: "Join our exciting events focused on education, sustainability, and community building.",
      image: hero1,
    },
  ];

  const EventCard = ({ event, isPast }: { event: Event; isPast: boolean }) => (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="h-56 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-muted-foreground mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          {event.date && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {event.date}
                {event.time && ` at ${event.time}`}
              </span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {isPast ? (
          event.feedblink && (
            <Button asChild className="w-full bg-secondary hover:bg-secondary-light">
              <a href={event.feedblink} target="_blank" rel="noopener noreferrer">
                Feedback
              </a>
            </Button>
          )
        ) : (
          event.regilink && (
            <Button asChild className="w-full bg-secondary hover:bg-secondary-light">
              <a href={event.regilink} target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
            </Button>
          )
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Hero slides={heroSlides} autoPlay={false} />

      {/* Upcoming Events Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on our exciting upcoming events and opportunities
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-56 bg-muted animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted animate-pulse mb-3 rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={false} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No upcoming events at this time. Check back later for new opportunities.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Past Events</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore highlights from our previous events and initiatives
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-56 bg-muted animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted animate-pulse mb-3 rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded mb-2" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No past events to display yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;

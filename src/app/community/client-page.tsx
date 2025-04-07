"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, Calendar, Award, MessageSquareMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const communityFeatures = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Project Showcase",
    description: "Share your projects, get feedback, and inspire others",
    link: "/community/projects",
    stats: "1.2k+ Projects"
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Discussion Forums",
    description: "Ask questions, share knowledge, and help others learn",
    link: "/community/forums",
    stats: "5k+ Topics"
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Events & Workshops",
    description: "Join live coding sessions and learning workshops",
    link: "/community/events",
    stats: "Weekly Events"
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Mentorship Program",
    description: "Connect with experienced developers for guidance",
    link: "/community/mentorship",
    stats: "200+ Mentors"
  }
];

const upcomingEvents = [
  {
    title: "React Performance Workshop",
    date: "2024-04-15T18:00:00Z",
    host: "Sarah Chen",
    attendees: 156,
    type: "workshop"
  },
  {
    title: "TypeScript Deep Dive",
    date: "2024-04-18T17:00:00Z",
    host: "Michael Brown",
    attendees: 89,
    type: "webinar"
  },
  {
    title: "Code Review Friday",
    date: "2024-04-19T15:00:00Z",
    host: "Community Team",
    attendees: 45,
    type: "meetup"
  }
];

export default function ClientCommunityPage() {
  return (
    <div className="container py-10">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight mb-4"
        >
          Join Our Developer Community
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Connect with fellow developers, share your knowledge, and grow together in our vibrant learning community.
        </motion.p>
        <div className="mt-8 flex justify-center">
          <Link href="/community/join" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Join Community
          </Link>
        </div>
      </div>

      {/* Community Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {[
          { label: "Active Members", value: "10,000+" },
          { label: "Countries", value: "120+" },
          { label: "Projects Shared", value: "5,000+" },
          { label: "Learning Hours", value: "100,000+" }
        ].map((stat) => (
          <div key={stat.label} className="text-center p-6 rounded-lg bg-card border">
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Community Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {communityFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.stats}</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">{feature.description}</p>
            <Button variant="ghost" className="group" asChild>
              <Link href={feature.link}>
                Explore
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <Button variant="outline" asChild>
            <Link href="/community/events">View All Events</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="rounded-lg border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.type === "workshop" 
                    ? "bg-blue-500/10 text-blue-500"
                    : event.type === "webinar"
                    ? "bg-purple-500/10 text-purple-500"
                    : "bg-green-500/10 text-green-500"
                }`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">Hosted by {event.host}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {event.attendees} attending
                </span>
                <Button variant="outline" size="sm">
                  Register
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold">Join Our Community</h3>
        <p className="mt-4 text-muted-foreground">
          Connect with fellow developers, share your knowledge, and grow together.
        </p>
        <div className="mt-6">
          <Link href="/community/join" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
} 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, Database, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Core Source
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A modern content management system built with Next.js, NestJS, and PostgreSQL.
            Secure, scalable, and developer-friendly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-blue-600" />
              <CardTitle>Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Email verification, JWT tokens, and secure password hashing
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-green-600" />
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Complete user registration, login, and profile management
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Database className="h-12 w-12 mx-auto text-purple-600" />
              <CardTitle>PostgreSQL Database</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Robust data storage with Prisma ORM and migrations
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 mx-auto text-orange-600" />
              <CardTitle>Fast Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with Next.js 14 and optimized for speed
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">Next.js 14</Badge>
            <Badge variant="secondary">NestJS</Badge>
            <Badge variant="secondary">PostgreSQL</Badge>
            <Badge variant="secondary">Prisma</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="secondary">JWT</Badge>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to build your next application? Start with Core Source today.
          </p>
        </div>
      </div>
    </div>
  );
}

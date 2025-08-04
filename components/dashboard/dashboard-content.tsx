"use client";

import { useAuthRedux } from "@/hooks/use-auth-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, Calendar } from "lucide-react";

export default function DashboardContent() {
  const { user, logout } = useAuthRedux();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined: {new Date(user?.createdAt || '').toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge variant={user?.isEmailVerified ? "default" : "secondary"}>
                {user?.isEmailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Email Verification:</span>
                <Badge variant={user?.isEmailVerified ? "default" : "destructive"}>
                  {user?.isEmailVerified ? "✓ Verified" : "✗ Unverified"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Account Created:</span>
                <span>{new Date(user?.createdAt || '').toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>{new Date(user?.updatedAt || '').toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full" variant="outline">
              Edit Profile
            </Button>
            <Button className="w-full" variant="outline">
              Change Password
            </Button>
            <Button className="w-full" variant="outline">
              Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
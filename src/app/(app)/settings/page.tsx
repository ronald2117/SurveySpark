import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - SurveySpark',
  description: 'Manage your account settings.',
};

export default function SettingsPage() {
  // Placeholder user data
  const user = {
    name: "Researcher Name",
    email: "researcher@example.com",
    avatarUrl: "https://placehold.co/100x100.png", 
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences."
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24" data-ai-hint="user avatar">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>
                    <UserCircle className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} className="mt-1" disabled />
                 <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Password</h3>
                <Button variant="outline">Change Password</Button>
                <p className="text-sm text-muted-foreground">
                  It's a good idea to use a strong password that you're not using elsewhere.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your email notification preferences (coming soon).
                </p>
                {/* Placeholder for notification settings */}
              </div>
               <Separator />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                 <Button variant="destructive">Delete Account</Button>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

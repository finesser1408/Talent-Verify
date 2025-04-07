
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your general application preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="theme">Dark Theme</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for the application
                      </p>
                    </div>
                    <Switch id="theme" />
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">Language & Region</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language
                      </p>
                    </div>
                    <select id="language" className="p-2 border rounded-md">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="timezone">Timezone</Label>
                      <p className="text-sm text-muted-foreground">
                        Set your local timezone
                      </p>
                    </div>
                    <select id="timezone" className="p-2 border rounded-md">
                      <option>Pacific Time (UTC-8)</option>
                      <option>Mountain Time (UTC-7)</option>
                      <option>Central Time (UTC-6)</option>
                      <option>Eastern Time (UTC-5)</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">Accessibility</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="highContrast">High Contrast</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable high contrast mode
                      </p>
                    </div>
                    <Switch id="highContrast" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reducedMotion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations
                      </p>
                    </div>
                    <Switch id="reducedMotion" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Email Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailEmployeeUpdates">Employee Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for employee record changes
                      </p>
                    </div>
                    <Switch id="emailEmployeeUpdates" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailVerificationRequests">Verification Requests</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for new verification requests
                      </p>
                    </div>
                    <Switch id="emailVerificationRequests" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailSystemUpdates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about platform updates and maintenance
                      </p>
                    </div>
                    <Switch id="emailSystemUpdates" />
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">In-App Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="appNotifications">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications within the application
                      </p>
                    </div>
                    <Switch id="appNotifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificationSound">Notification Sound</Label>
                      <p className="text-sm text-muted-foreground">
                        Play a sound when new notifications arrive
                      </p>
                    </div>
                    <Switch id="notificationSound" />
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">Notification Digest</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="digestFrequency">Email Digest Frequency</Label>
                      <p className="text-sm text-muted-foreground">
                        How often to receive notification summaries
                      </p>
                    </div>
                    <select id="digestFrequency" className="p-2 border rounded-md">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and data protection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Password Management</h3>
                  
                  <div className="space-y-2">
                    <Button variant="outline">Change Password</Button>
                    <p className="text-sm text-muted-foreground">
                      Last changed: 3 months ago
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="passwordExpiry">Password Expiry</Label>
                      <p className="text-sm text-muted-foreground">
                        Require password change every 90 days
                      </p>
                    </div>
                    <Switch id="passwordExpiry" />
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                  
                  <div className="space-y-2">
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">Session Management</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoLogout">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after inactivity
                      </p>
                    </div>
                    <select id="autoLogout" className="p-2 border rounded-md">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>Never</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Sign Out All Devices</Button>
                    <p className="text-sm text-muted-foreground">
                      End all active sessions on other devices
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-base font-medium">Data Protection</h3>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Download Personal Data</Button>
                    <p className="text-sm text-muted-foreground">
                      Export all your personal data in a portable format
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Button variant="destructive" className="w-full">Delete Account</Button>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

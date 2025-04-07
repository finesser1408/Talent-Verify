
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // This would be fetched from an API in a real application
  const stats = {
    companies: 12,
    employees: 342,
    verifications: 1253,
    uploads: 58
  };

  // Recent activity would also be fetched from an API
  const recentActivity = [
    { id: 1, action: "Employee added", name: "John Smith", company: "Acme Inc", date: "2 hours ago" },
    { id: 2, action: "Company updated", name: "Tech Solutions", company: "Tech Solutions", date: "5 hours ago" },
    { id: 3, action: "Bulk import", name: "HR Manager", company: "Global Corp", date: "Yesterday" },
    { id: 4, action: "Verification request", name: "Sarah Johnson", company: "Acme Inc", date: "Yesterday" },
    { id: 5, action: "Employee role updated", name: "Michael Brown", company: "Tech Solutions", date: "2 days ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.companies}</div>
              <p className="text-xs text-muted-foreground">
                <Link to="/companies" className="text-talentBlue hover:underline">View all companies</Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.employees}</div>
              <p className="text-xs text-muted-foreground">
                <Link to="/employees" className="text-talentBlue hover:underline">View all employees</Link>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verifications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.verifications}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Uploads</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uploads}</div>
              <p className="text-xs text-muted-foreground">
                <Link to="/import" className="text-talentBlue hover:underline">Import new data</Link>
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest activity across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{activity.name}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.company}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you can perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="h-24 flex flex-col items-center justify-center">
                  <Link to="/employees/add">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Add Employee</span>
                  </Link>
                </Button>
                
                <Button asChild className="h-24 flex flex-col items-center justify-center">
                  <Link to="/companies/add">
                    <Building className="h-6 w-6 mb-2" />
                    <span>Add Company</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Link to="/import">
                    <Upload className="h-6 w-6 mb-2" />
                    <span>Import Data</span>
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <Link to="/search">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Run Report</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

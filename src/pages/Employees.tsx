
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Check, Edit, MoreHorizontal, Plus, Search, User } from "lucide-react";

// Sample employee data (would be fetched from API in a real app)
const employees = [
  {
    id: 1,
    name: "John Smith",
    empId: "EMP001",
    department: "Engineering",
    role: "Software Developer",
    company: "Acme Inc",
    startDate: "2019-03-15",
    endDate: null,
    verified: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    empId: "EMP002",
    department: "Product",
    role: "Product Manager",
    company: "TechCorp",
    startDate: "2018-07-22",
    endDate: "2022-09-30",
    verified: true
  },
  {
    id: 3,
    name: "Michael Brown",
    empId: "EMP003",
    department: "Analytics",
    role: "Data Analyst",
    company: "DataSystems Ltd",
    startDate: "2020-01-10",
    endDate: null,
    verified: false
  },
  {
    id: 4,
    name: "Emily Davis",
    empId: "EMP004",
    department: "Human Resources",
    role: "HR Specialist",
    company: "Acme Inc",
    startDate: "2017-11-05",
    endDate: "2021-08-15",
    verified: true
  },
  {
    id: 5,
    name: "David Wilson",
    empId: "EMP005",
    department: "Marketing",
    role: "Marketing Director",
    company: "Global Industries",
    startDate: "2015-04-20",
    endDate: "2023-01-31",
    verified: true
  },
  {
    id: 6,
    name: "Jennifer Lee",
    empId: "EMP006",
    department: "Finance",
    role: "Financial Analyst",
    company: "InnovateTech",
    startDate: "2021-05-18",
    endDate: null,
    verified: false
  }
];

const Employees = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <Button asChild>
            <Link to="/employees/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-8 w-full"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              Manage and view all employee records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        <Link to={`/employees/${employee.id}`} className="hover:underline text-talentBlue">
                          {employee.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>{employee.empId}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.company}</TableCell>
                    <TableCell>
                      {new Date(employee.startDate).toLocaleDateString()} - {employee.endDate ? new Date(employee.endDate).toLocaleDateString() : 'Present'}
                    </TableCell>
                    <TableCell>
                      {employee.verified ? (
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-talentGreen mr-1" />
                          <span className="text-xs verified-badge">Verified</span>
                        </div>
                      ) : (
                        <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Pending</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link to={`/employees/${employee.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/employees/${employee.id}/edit`}>Edit Employee</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/employees/${employee.id}/history`}>View History</Link>
                          </DropdownMenuItem>
                          {!employee.verified && (
                            <DropdownMenuItem>Verify Record</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Employees;

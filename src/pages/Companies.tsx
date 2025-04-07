
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
import { Link } from "react-router-dom";
import { Building, Edit, Plus, Search } from "lucide-react";

// Sample company data (would be fetched from API in a real app)
const companies = [
  {
    id: 1,
    name: "Acme Inc",
    registrationNumber: "ACM12345",
    registrationDate: "2010-05-12",
    employees: 120,
    departments: 8,
    contactPerson: "John Johnson",
    contactEmail: "contact@acmeinc.com",
  },
  {
    id: 2,
    name: "TechCorp",
    registrationNumber: "TC98765",
    registrationDate: "2015-03-25",
    employees: 85,
    departments: 5,
    contactPerson: "Sarah Williams",
    contactEmail: "sarah@techcorp.io",
  },
  {
    id: 3,
    name: "Global Industries",
    registrationNumber: "GI55432",
    registrationDate: "2005-11-17",
    employees: 312,
    departments: 15,
    contactPerson: "Robert Black",
    contactEmail: "robert@globalind.com",
  },
  {
    id: 4,
    name: "DataSystems Ltd",
    registrationNumber: "DS77123",
    registrationDate: "2018-01-09",
    employees: 45,
    departments: 3,
    contactPerson: "Amanda Lee",
    contactEmail: "amanda@datasystems.co",
  },
  {
    id: 5,
    name: "InnovateTech",
    registrationNumber: "IT44321",
    registrationDate: "2019-07-30",
    employees: 67,
    departments: 6,
    contactPerson: "Michael Chen",
    contactEmail: "michael@innovatetech.net",
  },
];

const Companies = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <Button asChild>
            <Link to="/companies/add">
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="pl-8 w-full"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Company Directory</CardTitle>
            <CardDescription>
              Manage and view all registered companies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Registration No.</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Departments</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-muted-foreground mr-2" />
                        <Link to={`/companies/${company.id}`} className="hover:underline text-talentBlue">
                          {company.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>{company.registrationNumber}</TableCell>
                    <TableCell>{new Date(company.registrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{company.employees}</TableCell>
                    <TableCell>{company.departments}</TableCell>
                    <TableCell>{company.contactPerson}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/companies/${company.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
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

export default Companies;

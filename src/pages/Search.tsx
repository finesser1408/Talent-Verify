
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Check, SearchIcon } from "lucide-react";

// Sample search results (would be fetched from API in a real app)
const sampleResults = [
  {
    id: 1,
    name: "John Smith",
    employer: "Acme Inc",
    position: "Software Developer",
    department: "Engineering",
    yearStarted: "2019",
    yearLeft: "Present",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    employer: "TechCorp",
    position: "Product Manager",
    department: "Product",
    yearStarted: "2018",
    yearLeft: "2022",
    verified: true
  },
  {
    id: 3,
    name: "Michael Brown",
    employer: "DataSystems Ltd",
    position: "Data Analyst",
    department: "Analytics",
    yearStarted: "2020",
    yearLeft: "Present",
    verified: false
  },
  {
    id: 4,
    name: "Emily Davis",
    employer: "Acme Inc",
    position: "HR Specialist",
    department: "Human Resources",
    yearStarted: "2017",
    yearLeft: "2021",
    verified: true
  },
  {
    id: 5,
    name: "David Wilson",
    employer: "Global Corp",
    position: "Marketing Director",
    department: "Marketing",
    yearStarted: "2015",
    yearLeft: "2023",
    verified: true
  }
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [filterYear, setFilterYear] = useState("");
  const [results, setResults] = useState<typeof sampleResults>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would query an API with the search parameters
    // For demo purposes, we'll filter the sample data client-side
    if (query.trim() === "") {
      setResults(sampleResults);
    } else {
      const filtered = sampleResults.filter(item => {
        const matchesQuery = item[filterType as keyof typeof item]
          .toString()
          .toLowerCase()
          .includes(query.toLowerCase());
        
        const matchesYear = !filterYear || 
          parseInt(item.yearStarted) <= parseInt(filterYear) && 
          (item.yearLeft === "Present" || parseInt(item.yearLeft) >= parseInt(filterYear));
        
        return matchesQuery && matchesYear;
      });
      
      setResults(filtered);
    }
    
    setSearched(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Search Records</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Search Parameters</CardTitle>
            <CardDescription>
              Find employee records by name, employer, position, or department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="filterType">Search by</Label>
                  <Select
                    value={filterType}
                    onValueChange={setFilterType}
                  >
                    <SelectTrigger id="filterType">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Employee Name</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                      <SelectItem value="position">Position</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="query">Search term</Label>
                  <Input
                    id="query"
                    placeholder={`Enter ${filterType}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="filterYear">Employment year (optional)</Label>
                  <Input
                    id="filterYear"
                    type="number"
                    placeholder="e.g. 2020"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                <SearchIcon className="mr-2 h-4 w-4" />
                Search Records
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {searched && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {results.length} matching records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Employer</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.name}</TableCell>
                        <TableCell>{result.employer}</TableCell>
                        <TableCell>{result.position}</TableCell>
                        <TableCell>{result.department}</TableCell>
                        <TableCell>{result.yearStarted} - {result.yearLeft}</TableCell>
                        <TableCell>
                          {result.verified ? (
                            <div className="flex items-center">
                              <Check className="h-4 w-4 text-talentGreen mr-1" />
                              <span className="text-xs verified-badge">Verified</span>
                            </div>
                          ) : (
                            <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">Pending</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No results found for your search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Search;

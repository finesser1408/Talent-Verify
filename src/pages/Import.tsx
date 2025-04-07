
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Import = () => {
  const [importType, setImportType] = useState("employee");
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    const validTypes = [".csv", ".xlsx", ".xls", ".txt"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV, Excel, or text file.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate file upload with progress
    setUploadStatus("uploading");
    
    // In a real app, this would be an API request to upload the file
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      // eslint-disable-next-line no-loop-func
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Simulate successful upload
    setUploadStatus("success");
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been processed and data imported.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Data Import</h1>
        
        <Tabs defaultValue="file-upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file-upload">File Upload</TabsTrigger>
            <TabsTrigger value="manual-entry">Manual Entry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file-upload" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk File Upload</CardTitle>
                <CardDescription>
                  Import employee or company data from CSV, Excel, or text files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="importType">Import Type</Label>
                    <Select
                      value={importType}
                      onValueChange={setImportType}
                    >
                      <SelectTrigger id="importType">
                        <SelectValue placeholder="Select import type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee Data</SelectItem>
                        <SelectItem value="company">Company Data</SelectItem>
                        <SelectItem value="department">Department Data</SelectItem>
                        <SelectItem value="role">Role/Position Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center text-center">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <h3 className="font-medium text-base">Drop your file here or click to browse</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Supports CSV, Excel (.xlsx, .xls), and text files
                        </p>
                        {file && (
                          <div className="mt-4 px-3 py-1 bg-muted rounded-md text-sm">
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </div>
                        )}
                      </div>
                      <Input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx,.xls,.txt"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById("file")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Select File
                      </Button>
                    </div>
                  </div>
                  
                  {uploadStatus === "uploading" && (
                    <div className="space-y-2">
                      <div className="text-sm flex justify-between">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-talentBlue h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {uploadStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0 text-green-500" />
                      <div>
                        <h3 className="font-medium text-sm">Upload Complete</h3>
                        <p className="text-xs mt-1">
                          Your file has been successfully processed. The data is now available in the system.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {uploadStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 flex items-start">
                      <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0 text-red-500" />
                      <div>
                        <h3 className="font-medium text-sm">Upload Failed</h3>
                        <p className="text-xs mt-1">
                          There was an error processing your file. Please check the format and try again.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <CardFooter className="px-0 pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!file || uploadStatus === "uploading" || uploadStatus === "success"}
                    >
                      {uploadStatus === "uploading" ? "Uploading..." : "Upload and Process File"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>File Templates</CardTitle>
                <CardDescription>
                  Download templates for data import
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Employee Data Template
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Company Data Template
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Department Data Template
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Role Data Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manual-entry" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manual Data Entry</CardTitle>
                <CardDescription>
                  Add individual records manually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-center py-10">
                  <h3 className="font-medium">Choose a record type to add</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Button asChild>
                      <Link to="/employees/add">
                        Add Employee Record
                      </Link>
                    </Button>
                    
                    <Button asChild>
                      <Link to="/companies/add">
                        Add Company Record
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Add this import at the top of the file
import { Link } from "react-router-dom";

export default Import;

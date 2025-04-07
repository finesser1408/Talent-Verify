
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Shield, Building, Users, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-talentBlue mb-6 animate-fade-in">
              Secure Talent Verification Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              TalentVerify helps employers securely manage and verify employee records, 
              ensuring accurate employment history across organizations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-talentBlue">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="dashboard-card">
                <div className="rounded-full w-12 h-12 bg-talentBlue/10 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-talentBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Company Management</h3>
                <p className="text-muted-foreground">
                  Easily register and manage your company information in a secure environment.
                </p>
              </div>
              
              <div className="dashboard-card">
                <div className="rounded-full w-12 h-12 bg-talentBlue/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-talentBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Employee Records</h3>
                <p className="text-muted-foreground">
                  Maintain comprehensive employee histories including roles, departments, and responsibilities.
                </p>
              </div>
              
              <div className="dashboard-card">
                <div className="rounded-full w-12 h-12 bg-talentBlue/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-talentBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bulk Data Management</h3>
                <p className="text-muted-foreground">
                  Import and update employee data in bulk using CSV, Excel, or text formats.
                </p>
              </div>
              
              <div className="dashboard-card">
                <div className="rounded-full w-12 h-12 bg-talentBlue/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-talentBlue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Verification</h3>
                <p className="text-muted-foreground">
                  Enable trusted verification of employment history with encrypted sensitive data.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-talentBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to streamline your talent verification?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10 text-white/80">
              Join thousands of companies using TalentVerify to manage and verify employee records.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">Create Your Account</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-talentGray-dark text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-lg mb-4">TalentVerify</h3>
              <p className="text-white/70 max-w-md">
                Secure talent verification platform for employers and employees.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><Link to="/features" className="text-white/70 hover:text-white">Features</Link></li>
                  <li><Link to="/pricing" className="text-white/70 hover:text-white">Pricing</Link></li>
                  <li><Link to="/security" className="text-white/70 hover:text-white">Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-white/70 hover:text-white">About Us</Link></li>
                  <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
                  <li><Link to="/careers" className="text-white/70 hover:text-white">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-white/70 hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/20 text-center text-white/50">
            <p>© {new Date().getFullYear()} TalentVerify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

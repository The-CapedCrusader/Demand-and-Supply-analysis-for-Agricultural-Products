"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  IconLeaf, 
  IconChartBar, 
  IconChartPie, 
  IconChartLine, 
  IconUsers,
  IconLogin,
  IconCheck,
  IconArrowRight,
  IconClock,
  IconDeviceAnalytics,
  IconPlant,
  IconCoin
} from "@tabler/icons-react";
import { useAuth } from "@/lib/auth/auth-context";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Demo data for charts
  const chartData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 55 },
    { month: "May", value: 60 },
    { month: "Jun", value: 75 },
  ];
  
  // If not mounted yet, show nothing to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <div className="relative overflow-hidden pb-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <IconLeaf className="text-primary h-8 w-8" />
                <h1 className="text-4xl font-bold text-primary">Krishok's</h1>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Agricultural Demand & Supply
                <span className="text-primary"> Analysis Dashboard</span>
              </h2>
              
              <p className="text-lg mb-8 text-muted-foreground">
                A comprehensive solution for farmers to analyze market trends,
                optimize crop production, and make data-driven decisions for better yields and profits.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Button size="lg" asChild>
                      <Link href="/dashboard">
                        Enter Dashboard
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/my-farm">
                        My Farm
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button size="lg" asChild>
                    <Link href="/login">
                      <IconLogin className="mr-2 h-5 w-5" />
                      Login / Sign Up
                    </Link>
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 mt-8">
                <Badge variant="outline" className="bg-background/60 border-primary/20 text-primary">Real-time Data</Badge>
                <Badge variant="outline" className="bg-background/60 border-primary/20 text-primary">Market Insights</Badge>
                <Badge variant="outline" className="bg-background/60 border-primary/20 text-primary">Crop Management</Badge>
                <Badge variant="outline" className="bg-background/60 border-primary/20 text-primary">Inventory Tracking</Badge>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-lg">
              <div className="relative h-[350px] w-full bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg overflow-hidden border border-border">
                <img 
                  src="/farm.gif" 
                  alt="Farm animation" 
                  className="absolute inset-0 h-full w-full object-cover opacity-30"
                />
                <div className="absolute bottom-0 left-0 right-0 h-3/4">
                  {/* Animated chart visualization */}
                  <div className="flex h-full items-end justify-around px-4">
                    {chartData.map((item, i) => (
                      <div key={i} className="relative w-8">
                        <div 
                          className="bg-primary/70 rounded-t-md w-full animate-in fade-in-50 slide-in-from-bottom-4 duration-500" 
                          style={{ 
                            height: `${item.value}%`, 
                            animationDelay: `${i * 100}ms`
                          }}
                        ></div>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-0 top-0 p-4">
                    <p className="text-sm font-medium">Crop Yield Trends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16 border-t border-border/20">
        <h2 className="text-3xl font-bold text-center mb-4">How Krishok's Works</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Our platform simplifies agricultural data analysis and market insights in four easy steps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <IconClock className="h-10 w-10 text-primary" />,
              title: "Connect Your Farm",
              description: "Sign up and input your farm details including location, crop types, and size."
            },
            {
              icon: <IconDeviceAnalytics className="h-10 w-10 text-primary" />,
              title: "Track Your Data",
              description: "Monitor crop growth, weather conditions, and input usage through our dashboard."
            },
            {
              icon: <IconChartLine className="h-10 w-10 text-primary" />,
              title: "Analyze Market Trends",
              description: "Access real-time analytics on market demand, pricing, and buyer preferences."
            },
            {
              icon: <IconCoin className="h-10 w-10 text-primary" />,
              title: "Maximize Profits",
              description: "Make informed decisions on when to plant, harvest, and sell your crops."
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {i < 3 && <IconArrowRight className="h-6 w-6 mt-4 text-primary/40 hidden lg:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-muted/20">
        <h2 className="text-3xl font-bold text-center mb-4">Powerful Analytics Features</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Leverage advanced tools and insights to optimize your farming operations
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <IconChartBar className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>Real-time market prices and supply demand analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[120px] w-full bg-muted/30 rounded-md overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4">
                  {Array.from({length: 7}).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-primary/60 w-4 rounded-t-sm" 
                      style={{ height: `${Math.random() * 70 + 20}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/market-analysis">
                  <span>Learn More</span>
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <IconChartPie className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Crop Distribution</CardTitle>
              <CardDescription>Optimize your crop portfolio based on market demand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[120px] w-full bg-muted/30 rounded-md overflow-hidden relative p-4 flex items-center justify-center">
                <div className="relative w-24 h-24 rounded-full border-8 border-primary/20">
                  <div className="absolute inset-0 border-t-8 border-r-8 border-primary rounded-full rotate-45"></div>
                  <div className="absolute inset-0 border-b-8 border-l-8 border-primary/60 rounded-full -rotate-45"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/crop-management">
                  <span>Learn More</span>
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <IconChartLine className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Price Forecasting</CardTitle>
              <CardDescription>AI-powered predictions for future market conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[120px] w-full bg-muted/30 rounded-md overflow-hidden relative">
                <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                  <path 
                    d="M0,60 C50,40 100,80 150,60 C200,40 250,70 300,50" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="3"
                  />
                  <path 
                    d="M0,60 C50,40 100,80 150,60 C200,40 250,70 300,50 L300,120 L0,120 Z" 
                    fill="hsl(var(--primary) / 0.2)" 
                    stroke="none"
                  />
                </svg>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/market-reports">
                  <span>Learn More</span>
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Key Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Key Benefits for Farmers</h2>
            <div className="space-y-4">
              {[
                "Make data-driven decisions based on real market insights",
                "Reduce waste and optimize resource allocation",
                "Connect directly with buyers and get better prices",
                "Predict market trends and plan crops accordingly",
                "Track inventory and manage farm operations efficiently",
                "Access agricultural expertise and best practices"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                    <IconCheck className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
            <Button className="mt-8" asChild>
              <Link href={user ? "/dashboard" : "/signup"}>
                Get Started Today
              </Link>
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden h-[400px] border border-border/40 shadow-lg">
              <img 
                src="/farm.gif" 
                alt="Farming Benefits" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Empower Your Farming</h3>
                <p className="text-white/80">Join thousands of farmers who are transforming their operations with Krishok's</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16 bg-muted/20">
        <h2 className="text-3xl font-bold text-center mb-4">Trusted by Farmers</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          See what our users say about Krishok's platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Tarek Ahmed",
              role: "Lakshmipur, Chittagong, Bangladesh",
              quote: "Krishok's has helped me increase my yield by 30% through data-driven decisions."
            },
            {
              name: "Naim Rahman",
              role: "Dhaka, Bangladesh",
              quote: "The market analysis tools are invaluable for planning what crops to grow each season."
            },
            {
              name: "Fariha Tasnim",
              role: "Rangpur, Bangladesh.",
              quote: "Finding buyers has never been easier. I've expanded my business significantly."
            }
          ].map((testimonial, i) => (
            <Card key={i} className="border-border/40 bg-background/60 backdrop-blur-sm">
              <CardHeader>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <IconUsers className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join Krishok's today and start making data-driven decisions that will increase your yields and profits.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={user ? "/dashboard" : "/signup"}>
                {user ? "Go to Dashboard" : "Sign Up Now"}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border/30 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <IconLeaf className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Krishok's © {new Date().getFullYear()}</span>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Documentation
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

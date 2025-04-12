import type { Route } from './+types/_index';
import { useMemo } from 'react';
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
  IconCoin,
} from '@tabler/icons-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Krishok's" },
    { name: 'description', content: "Krishok's" },
  ];
}

export default function Home() {
  const chartData = useMemo(
    () => [
      { month: 'Jan', value: 30 },
      { month: 'Feb', value: 40 },
      { month: 'Mar', value: 45 },
      { month: 'Apr', value: 55 },
      { month: 'May', value: 60 },
      { month: 'Jun', value: 75 },
    ],
    []
  );

  return (
    <div className="from-background to-background/80 min-h-screen bg-gradient-to-b">
      <div className="relative overflow-hidden pb-10">
        <div className="bg-grid-pattern absolute inset-0 z-0 opacity-[0.02]"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-2xl flex-1">
              <div className="mb-6 flex items-center gap-3">
                <IconLeaf className="text-primary h-8 w-8" />
                <h1 className="text-primary text-4xl font-bold">Krishok's</h1>
              </div>

              <h2 className="mb-6 text-3xl leading-tight font-bold md:text-4xl">
                Agricultural Demand & Supply
                <span className="text-primary"> Analysis Dashboard</span>
              </h2>

              <p className="text-muted-foreground mb-8 text-lg">
                A comprehensive solution for farmers to analyze market trends,
                optimize crop production, and make data-driven decisions for
                better yields and profits.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/login">
                    <IconLogin className="mr-2 h-5 w-5" />
                    Login / Sign Up
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="bg-background/60 border-primary/20 text-primary"
                >
                  Real-time Data
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/60 border-primary/20 text-primary"
                >
                  Market Insights
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/60 border-primary/20 text-primary"
                >
                  Crop Management
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background/60 border-primary/20 text-primary"
                >
                  Inventory Tracking
                </Badge>
              </div>
            </div>

            <div className="w-full max-w-lg flex-1">
              <div className="from-primary/10 to-primary/5 border-border relative h-[350px] w-full overflow-hidden rounded-lg border bg-gradient-to-r">
                <img
                  src="/farm.gif"
                  alt="Farm animation"
                  className="absolute inset-0 h-full w-full object-cover opacity-30"
                />
                <div className="absolute right-0 bottom-0 left-0 h-3/4">
                  <div className="flex h-full items-end justify-around px-4">
                    {chartData.map((item, i) => (
                      <div key={i} className="relative w-8">
                        <div
                          className="bg-primary/70 animate-in fade-in-50 slide-in-from-bottom-4 w-full rounded-t-md duration-500"
                          style={{
                            height: `${item.value}%`,
                            animationDelay: `${i * 100}ms`,
                          }}
                        ></div>
                        <span className="text-muted-foreground absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                    <p className="text-sm font-medium">Crop Yield Trends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="border-border/20 container mx-auto border-t px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">
          How Krishok's Works
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
          Our platform simplifies agricultural data analysis and market insights
          in four easy steps
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <IconClock className="text-primary h-10 w-10" />,
              title: 'Connect Your Farm',
              description:
                'Sign up and input your farm details including location, crop types, and size.',
            },
            {
              icon: <IconDeviceAnalytics className="text-primary h-10 w-10" />,
              title: 'Track Your Data',
              description:
                'Monitor crop growth, weather conditions, and input usage through our dashboard.',
            },
            {
              icon: <IconChartLine className="text-primary h-10 w-10" />,
              title: 'Analyze Market Trends',
              description:
                'Access real-time analytics on market demand, pricing, and buyer preferences.',
            },
            {
              icon: <IconCoin className="text-primary h-10 w-10" />,
              title: 'Maximize Profits',
              description:
                'Make informed decisions on when to plant, harvest, and sell your crops.',
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                {step.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {i < 3 && (
                <IconArrowRight className="text-primary/40 mt-4 hidden h-6 w-6 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/20 container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Powerful Analytics Features
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
          Leverage advanced tools and insights to optimize your farming
          operations
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <IconChartBar className="text-primary mb-2 h-10 w-10" />
              <CardTitle>Market Trends</CardTitle>
              <CardDescription>
                Real-time market prices and supply demand analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 relative h-[120px] w-full overflow-hidden rounded-md">
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4">
                  {Array.from({ length: 7 }).map((_, i) => (
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
                <Link to="/market-analysis">
                  <span>Learn More</span>
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <IconChartPie className="text-primary mb-2 h-10 w-10" />
              <CardTitle>Crop Distribution</CardTitle>
              <CardDescription>
                Optimize your crop portfolio based on market demand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 relative flex h-[120px] w-full items-center justify-center overflow-hidden rounded-md p-4">
                <div className="border-primary/20 relative h-24 w-24 rounded-full border-8">
                  <div className="border-primary absolute inset-0 rotate-45 rounded-full border-t-8 border-r-8"></div>
                  <div className="border-primary/60 absolute inset-0 -rotate-45 rounded-full border-b-8 border-l-8"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/crop-management">
                  <span>Learn More</span>
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/40 bg-background/60 backdrop-blur-sm">
            <CardHeader>
              <IconChartLine className="text-primary mb-2 h-10 w-10" />
              <CardTitle>Price Forecasting</CardTitle>
              <CardDescription>
                AI-powered predictions for future market conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 relative h-[120px] w-full overflow-hidden rounded-md">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 300 120"
                  preserveAspectRatio="none"
                >
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
                <Link to="/market-reports">
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
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold">
              Key Benefits for Farmers
            </h2>
            <div className="space-y-4">
              {[
                'Make data-driven decisions based on real market insights',
                'Reduce waste and optimize resource allocation',
                'Connect directly with buyers and get better prices',
                'Predict market trends and plan crops accordingly',
                'Track inventory and manage farm operations efficiently',
                'Access agricultural expertise and best practices',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-primary/20 mt-1 flex h-5 w-5 items-center justify-center rounded-full">
                    <IconCheck className="text-primary h-3 w-3" />
                  </div>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
            <Button className="mt-8" asChild>
              <Link to="/signup">Get Started Today</Link>
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="border-border/40 relative h-[400px] overflow-hidden rounded-lg border shadow-lg">
              <img
                src="/farm.gif"
                alt="Farming Benefits"
                className="h-full w-full object-cover"
              />
              <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent"></div>
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Empower Your Farming
                </h3>
                <p className="text-white/80">
                  Join thousands of farmers who are transforming their
                  operations with Krishok's
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-muted/20 container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Trusted by Farmers
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
          See what our users say about Krishok's platform
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Tarek Ahmed',
              role: 'Lakshmipur, Chittagong, Bangladesh',
              quote:
                "Krishok's has helped me increase my yield by 30% through data-driven decisions.",
            },
            {
              name: 'Naim Rahman',
              role: 'Dhaka, Bangladesh',
              quote:
                'The market analysis tools are invaluable for planning what crops to grow each season.',
            },
            {
              name: 'Fariha Tasnim',
              role: 'Rangpur, Bangladesh.',
              quote:
                "Finding buyers has never been easier. I've expanded my business significantly.",
            },
          ].map((testimonial, i) => (
            <Card
              key={i}
              className="border-border/40 bg-background/60 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-full">
                    <IconUsers className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary/10 rounded-2xl p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            Join Krishok's today and start making data-driven decisions that
            will increase your yields and profits.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-border/30 mt-auto border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <IconLeaf className="text-primary h-5 w-5" />
              <span className="text-sm font-medium">
                Krishok's © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex gap-6">
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Documentation
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

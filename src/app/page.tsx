import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MainNav } from '@/components/layout/main-nav';
import { CheckCircle, Zap, BarChart, Edit3, Gift, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Edit3 className="h-8 w-8 text-primary" />,
      title: 'Intuitive Survey Creation',
      description: 'Design surveys with various question types using a simple drag-and-drop interface.',
      dataAiHint: 'interface design'
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: 'Privacy Focused',
      description: 'Easily include privacy terms and agreements directly within your surveys.',
      dataAiHint: 'security privacy'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Instant Link Generation',
      description: 'Get a unique, shareable link for your survey as soon as it\'s ready.',
      dataAiHint: 'link share'
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Summaries',
      description: 'Leverage AI to automatically identify key trends and insights from responses.',
      dataAiHint: 'chart analytics'
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: 'Reward Management',
      description: 'Verify responses and reward participants with vouchers or digital cash seamlessly.',
      dataAiHint: 'gift reward'
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Spark Insights with <span className="text-primary">SurveySpark</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
              Create, distribute, and analyze surveys effortlessly. Turn feedback into actionable insights with our AI-powered platform.
            </p>
            <div className="mt-10 flex justify-center gap-x-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to succeed
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                SurveySpark offers a comprehensive suite of tools for modern research.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card border">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  <div className="mt-4 w-full aspect-[4/3] relative rounded-md overflow-hidden">
                    <Image 
                      src={`https://placehold.co/400x300.png`} 
                      alt={feature.title} 
                      layout="fill" 
                      objectFit="cover"
                      data-ai-hint={feature.dataAiHint}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to unlock valuable insights?
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-lg">
              Join thousands of researchers who trust SurveySpark to gather and analyze data.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/signup">Sign Up and Start Surveying</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} SurveySpark. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

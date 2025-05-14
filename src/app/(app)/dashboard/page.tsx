import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ClipboardList, BarChart, Award } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - SurveySpark',
  description: 'Your SurveySpark dashboard.',
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  );
}


export default function DashboardPage() {
  // Placeholder data
  const surveys = [
    { id: "1", title: "Customer Satisfaction Q3", responses: 120, status: "Active" },
    { id: "2", title: "New Feature Feedback", responses: 85, status: "Closed" },
    { id: "3", title: "Employee Engagement Survey", responses: 0, status: "Draft" },
  ];

  return (
    <>
      <PageHeader 
        title="Dashboard"
        description="Welcome back, Researcher! Here's an overview of your activities."
        actions={
          <Button asChild>
            <Link href="/surveys/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Survey
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Surveys" value="3" icon={<ClipboardList className="h-5 w-5 text-muted-foreground" />} description="All surveys created" />
        <StatCard title="Active Surveys" value="1" icon={<ClipboardList className="h-5 w-5 text-primary" />} description="Currently collecting responses" />
        <StatCard title="Total Responses" value="205" icon={<BarChart className="h-5 w-5 text-muted-foreground" />} description="Across all surveys" />
        <StatCard title="Rewards Pending" value="5" icon={<Award className="h-5 w-5 text-accent" />} description="Awaiting verification" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Surveys</CardTitle>
          <CardDescription>A quick look at your latest surveys.</CardDescription>
        </CardHeader>
        <CardContent>
          {surveys.length > 0 ? (
            <ul className="space-y-4">
              {surveys.map((survey) => (
                <li key={survey.id} className="flex items-center justify-between p-4 rounded-md border hover:bg-muted/50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-lg">{survey.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {survey.responses} responses - Status: <span className={`font-medium ${survey.status === 'Active' ? 'text-green-600' : survey.status === 'Draft' ? 'text-yellow-600' : 'text-red-600'}`}>{survey.status}</span>
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/surveys/${survey.id}`}>View Details</Link>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You haven't created any surveys yet.</p>
              <Button asChild>
                <Link href="/surveys/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Survey
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

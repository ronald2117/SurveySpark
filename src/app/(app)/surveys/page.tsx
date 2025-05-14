import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { PlusCircle, Edit, BarChart2, Link as LinkIconLucide, Trash2 } from "lucide-react"; // Renamed Link to LinkIconLucide
import type { Survey } from "@/types/survey";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Surveys - SurveySpark',
  description: 'Manage all your created surveys.',
};

// Placeholder data
const surveys: Survey[] = [
  {
    id: "survey_123",
    title: "Customer Satisfaction Q3",
    description: "Gather feedback on customer satisfaction for the third quarter.",
    questions: [], // Placeholder
    privacyTerms: { enabled: true, text: "Your data is safe." },
    createdAt: new Date("2023-07-15T10:00:00Z"),
    updatedAt: new Date("2023-07-18T14:30:00Z"),
    createdBy: "user_abc",
    status: "active",
    uniqueLink: "https://surveyspark.com/s/cust-sat-q3"
  },
  {
    id: "survey_456",
    title: "New Feature Feedback",
    description: "Collect opinions about the new feature X.",
    questions: [], // Placeholder
    privacyTerms: { enabled: false, text: "" },
    createdAt: new Date("2023-08-01T09:00:00Z"),
    updatedAt: new Date("2023-08-02T11:00:00Z"),
    createdBy: "user_abc",
    status: "closed",
    uniqueLink: "https://surveyspark.com/s/feature-x-feedback"
  },
  {
    id: "survey_789",
    title: "Employee Engagement Survey",
    description: "Annual survey to measure employee engagement.",
    questions: [], // Placeholder
    privacyTerms: { enabled: true, text: "Participation is anonymous." },
    createdAt: new Date("2023-08-10T16:00:00Z"),
    updatedAt: new Date("2023-08-10T16:00:00Z"),
    createdBy: "user_abc",
    status: "draft",
  }
];

function SurveyStatusBadge({ status }: { status: Survey["status"] }) {
  let bgColor = "bg-gray-100 text-gray-800";
  if (status === "active") bgColor = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
  else if (status === "closed") bgColor = "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  else if (status === "draft") bgColor = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${bgColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}


export default function MySurveysPage() {
  return (
    <>
      <PageHeader 
        title="My Surveys"
        description="Manage, edit, and view responses for your surveys."
        actions={
          <Button asChild>
            <Link href="/surveys/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Survey
            </Link>
          </Button>
        }
      />

      {surveys.length === 0 ? (
        <div className="text-center py-12">
          <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No Surveys Yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by creating your first survey.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/surveys/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Survey
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => (
            <Card key={survey.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                     <Link href={`/surveys/${survey.id}`}>{survey.title}</Link>
                  </CardTitle>
                  <SurveyStatusBadge status={survey.status} />
                </div>
                <CardDescription className="line-clamp-2 h-[40px]">{survey.description || "No description provided."}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Created: {new Date(survey.createdAt).toLocaleDateString()}</p>
                  {survey.uniqueLink && <p>Link: <a href={survey.uniqueLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{survey.uniqueLink.length > 30 ? survey.uniqueLink.substring(0,30) + "..." : survey.uniqueLink}</a></p>}
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 sm:flex sm:space-x-2">
                <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                  <Link href={`/surveys/${survey.id}/edit`}> {/* Assuming an edit route */}
                    <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                   <Link href={`/surveys/${survey.id}/responses`}> {/* Assuming a responses route */}
                    <BarChart2 className="mr-1.5 h-3.5 w-3.5" /> Responses
                  </Link>
                </Button>
                 {/* Add more actions like Share, Delete etc. */}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

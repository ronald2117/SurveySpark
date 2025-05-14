import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Survey, Question } from "@/types/survey"; // Assuming Survey and Question types are defined
import { Edit, BarChart2, Settings, Share2, ClipboardList, FileText, Link as LinkIcon, CheckSquare, ListChecks, SlidersHorizontal, Star, FileShield } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

// This would typically come from a database based on params.surveyId
const getSurveyData = async (surveyId: string): Promise<Survey | null> => {
  // Mock data for demonstration
  if (surveyId === "survey_123") {
    return {
      id: "survey_123",
      title: "Customer Satisfaction Q3",
      description: "Gather feedback on customer satisfaction for the third quarter. This survey helps us understand your experience and improve our services.",
      questions: [
        { id: "q1", text: "How satisfied are you with our product?", type: "likert-scale", isRequired: true, minLabel: "Very Unsatisfied", maxLabel: "Very Satisfied", scaleMin: 1, scaleMax: 5 },
        { id: "q2", text: "What features do you use most often?", type: "multiple-choice", isRequired: true, options: [{id: "opt1", text: "Feature A"}, {id: "opt2", text: "Feature B"}, {id: "opt3", text: "Feature C"}] },
        { id: "q3", text: "Any suggestions for improvement?", type: "open-ended", isRequired: false },
      ],
      privacyTerms: { enabled: true, text: "Your responses are anonymous and will be used for internal improvement purposes only. By submitting this survey, you agree to these terms." },
      createdAt: new Date("2023-07-15T10:00:00Z"),
      updatedAt: new Date("2023-07-18T14:30:00Z"),
      createdBy: "user_abc",
      status: "active",
      uniqueLink: `https://surveyspark.app/s/${surveyId}`
    };
  }
  return null;
};


export async function generateMetadata({ params }: { params: { surveyId: string } }): Promise<Metadata> {
  const survey = await getSurveyData(params.surveyId);
  if (!survey) {
    return {
      title: 'Survey Not Found - SurveySpark',
    };
  }
  return {
    title: `${survey.title} - Survey Details - SurveySpark`,
    description: survey.description || `Details for survey: ${survey.title}`,
  };
}


const questionTypeIcons: Record<Question["type"], React.ReactNode> = {
  "open-ended": <FileText className="h-4 w-4 text-muted-foreground" />,
  "closed-ended": <CheckSquare className="h-4 w-4 text-muted-foreground" />,
  "multiple-choice": <ListChecks className="h-4 w-4 text-muted-foreground" />,
  "likert-scale": <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />,
  "scaled": <Star className="h-4 w-4 text-muted-foreground" />,
};

export default async function SurveyDetailsPage({ params }: { params: { surveyId: string } }) {
  const survey = await getSurveyData(params.surveyId);

  if (!survey) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Survey Not Found</h1>
        <p className="text-muted-foreground mt-2">The survey you are looking for does not exist or has been moved.</p>
        <Button asChild className="mt-4">
          <Link href="/surveys">Go to My Surveys</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={survey.title}
        description={survey.description || "Detailed view of your survey."}
        actions={
          <Button asChild variant="outline">
            <Link href={`/surveys/${survey.id}/edit`}> {/* Assuming edit route */}
              <Edit className="mr-2 h-4 w-4" /> Edit Survey
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="overview"><ClipboardList className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Overview</TabsTrigger>
          <TabsTrigger value="questions"><FileText className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Questions</TabsTrigger>
          <TabsTrigger value="responses"><BarChart2 className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Responses</TabsTrigger>
          <TabsTrigger value="share"><Share2 className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Share</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Survey Overview</CardTitle>
              <CardDescription>Key details and statistics for this survey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p><strong>Status:</strong> <span className={`capitalize px-2 py-1 rounded-full text-xs ${survey.status === 'active' ? 'bg-green-100 text-green-700' : survey.status === 'draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{survey.status}</span></p>
              <p><strong>Created:</strong> {new Date(survey.createdAt).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {new Date(survey.updatedAt).toLocaleString()}</p>
              <p><strong>Total Questions:</strong> {survey.questions.length}</p>
              {/* Placeholder for response count */}
              <p><strong>Total Responses:</strong> 0 (Placeholder)</p> 
               {survey.privacyTerms.enabled && (
                <div className="pt-4 border-t">
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><FileShield className="h-5 w-5 text-primary"/> Privacy Terms</h4>
                    <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md whitespace-pre-wrap">{survey.privacyTerms.text}</p>
                </div>
               )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Survey Questions</CardTitle>
              <CardDescription>Review the questions in this survey.</CardDescription>
            </CardHeader>
            <CardContent>
              {survey.questions.length > 0 ? (
                <ul className="space-y-4">
                  {survey.questions.map((q, index) => (
                    <li key={q.id} className="p-4 border rounded-md bg-muted/30">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-primary">{index + 1}.</span>
                        <div className="flex-1">
                          <p className="font-medium">{q.text} {q.isRequired && <span className="text-red-500">*</span>}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            {questionTypeIcons[q.type]}
                            <span className="capitalize">{q.type.replace('-', ' ')}</span>
                          </div>
                          {q.options && q.options.length > 0 && (
                            <ul className="list-disc list-inside pl-4 mt-2 text-sm">
                              {q.options.map(opt => <li key={opt.id}>{opt.text}</li>)}
                            </ul>
                          )}
                           {(q.type === 'likert-scale' || q.type === 'scaled') && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              <span>Scale: {q.minLabel || q.scaleMin} to {q.maxLabel || q.scaleMax}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No questions have been added to this survey yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle>Responses & Analysis</CardTitle>
              <CardDescription>View submitted responses and generate AI summaries.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              {/* Placeholder for responses view */}
              <p className="text-muted-foreground mb-4">Response collection and analysis features are coming soon.</p>
              <Button asChild>
                <Link href={`/surveys/${survey.id}/summary`}>
                  Go to AI Summary (Demo)
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="share">
          <Card>
            <CardHeader>
              <CardTitle>Share Survey</CardTitle>
              <CardDescription>Get your unique survey link to distribute.</CardDescription>
            </CardHeader>
            <CardContent>
              {survey.uniqueLink ? (
                <div className="space-y-4">
                  <p className="text-sm">Use the following link to share your survey:</p>
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted">
                    <LinkIcon className="h-5 w-5 text-primary" />
                    <a href={survey.uniqueLink} target="_blank" rel="noopener noreferrer" className="text-primary font-medium break-all hover:underline">
                      {survey.uniqueLink}
                    </a>
                  </div>
                  <Button onClick={() => navigator.clipboard.writeText(survey.uniqueLink!)}>Copy Link</Button>
                   <p className="text-xs text-muted-foreground">Tip: You can share this link via email, social media, or embed it on your website.</p>
                </div>
              ) : (
                <p className="text-muted-foreground">This survey is currently a draft. Publish it to get a shareable link.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Survey Settings</CardTitle>
              <CardDescription>Configure advanced options for your survey.</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              {/* Placeholder for settings */}
              <p className="text-muted-foreground">Advanced survey settings (e.g., closing date, response limits) will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

"use client";

import { useState } from "react";
import { summarizeSurveyResponses, type SummarizeSurveyResponsesInput } from "@/ai/flows/summarize-survey-responses";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link"; // Added Link import

// Mock survey data (in a real app, this would be fetched)
const MOCK_SURVEY_TITLE = "Customer Satisfaction Q3"; 
const MOCK_SURVEY_ID = "survey_123";

export default function SurveySummaryPage({ params }: { params: { surveyId: string } }) {
  const { toast } = useToast();
  const [researchQuestion, setResearchQuestion] = useState("");
  const [responsesJson, setResponsesJson] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!researchQuestion || !responsesJson) {
      toast({
        title: "Missing Information",
        description: "Please provide both a research question and survey responses.",
        variant: "destructive",
      });
      return;
    }

    try {
      JSON.parse(responsesJson); // Validate JSON
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "The survey responses are not in valid JSON format.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      const input: SummarizeSurveyResponsesInput = {
        researchQuestion,
        responses: responsesJson,
      };
      const result = await summarizeSurveyResponses(input);
      setSummary(result.summary);
      toast({
        title: "Summary Generated!",
        description: "AI analysis complete.",
      });
    } catch (error) {
      console.error("Error summarizing responses:", error);
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error Generating Summary",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Use params.surveyId to fetch actual survey title if needed
  // For now, using MOCK_SURVEY_TITLE or a generic one
  const surveyTitle = params.surveyId === MOCK_SURVEY_ID ? MOCK_SURVEY_TITLE : `Survey ${params.surveyId}`;


  return (
    <>
      <PageHeader
        title={`AI Summary for "${surveyTitle}"`}
        description="Generate insights and key trends from your survey responses using AI."
        actions={
            <Button variant="outline" asChild>
                <Link href={`/surveys/${params.surveyId}`}>Back to Survey</Link>
            </Button>
        }
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Input Data</CardTitle>
            <CardDescription>Provide the necessary information for AI analysis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="research-question">Primary Research Question</Label>
              <Textarea
                id="research-question"
                value={researchQuestion}
                onChange={(e) => setResearchQuestion(e.target.value)}
                placeholder="e.g., What are the main drivers of customer satisfaction?"
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="responses-json">Survey Responses (JSON format)</Label>
              <Textarea
                id="responses-json"
                value={responsesJson}
                onChange={(e) => setResponsesJson(e.target.value)}
                placeholder='[{"questionId": "q1", "answer": "Very satisfied"}, ...]'
                className="mt-1 font-mono"
                rows={10}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Provide an array of response objects. Each object should represent a single respondent's answers.
              </p>
            </div>
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BrainCircuit className="mr-2 h-4 w-4" />
              )}
              Generate Summary
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>AI Generated Summary</CardTitle>
            <CardDescription>Key trends and insights identified by the AI.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Analyzing responses, please wait...</p>
              </div>
            )}
            {!isLoading && !summary && (
              <div className="text-center h-40 flex items-center justify-center">
                <p className="text-muted-foreground">Your summary will appear here once generated.</p>
              </div>
            )}
            {summary && (
              <div className="prose dark:prose-invert max-w-none p-4 bg-muted rounded-md whitespace-pre-wrap">
                <p>{summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

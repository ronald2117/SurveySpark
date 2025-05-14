"use client";

import { useState } from "react";
import type { Question, QuestionType, Survey, PrivacyTerms } from "@/types/survey";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { QuestionPalette } from "@/components/survey/question-palette";
import { 
  QuestionEditorBase, 
  OpenEndedQuestionEditor, 
  ClosedEndedQuestionEditor, 
  MultipleChoiceQuestionEditor,
  LikertScaleQuestionEditor,
  ScaledQuestionEditor
} from "@/components/survey/question-editor-base";
import { PrivacySectionEditor } from "@/components/survey/privacy-section-editor";
import { Baseline, CheckSquare, ListChecks, SlidersHorizontal, Star, Save, Eye, LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const questionTypeIcons: Record<QuestionType, React.ReactNode> = {
  "open-ended": <Baseline className="h-5 w-5 text-primary" />,
  "closed-ended": <CheckSquare className="h-5 w-5 text-primary" />,
  "multiple-choice": <ListChecks className="h-5 w-5 text-primary" />,
  "likert-scale": <SlidersHorizontal className="h-5 w-5 text-primary" />,
  "scaled": <Star className="h-5 w-5 text-primary" />,
};

export default function CreateSurveyPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [privacyTerms, setPrivacyTerms] = useState<PrivacyTerms>({ enabled: false, text: "" });
  const [showPrivacySection, setShowPrivacySection] = useState(false);


  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(), // Simple unique ID
      type,
      text: "",
      isRequired: false,
      options: type === "multiple-choice" ? [{ id: "opt1", text: "" }] : undefined,
      scaleMin: (type === "likert-scale" || type === "scaled") ? 1 : undefined,
      scaleMax: (type === "likert-scale" || type === "scaled") ? 5 : undefined,
      minLabel: (type === "likert-scale" || type === "scaled") ? "" : undefined,
      maxLabel: (type === "likert-scale" || type === "scaled") ? "" : undefined,
    };
    setQuestions([...questions, newQuestion]);
  };
  
  const handleAddPrivacySection = () => {
    setShowPrivacySection(true);
    if (!privacyTerms.enabled) {
      setPrivacyTerms(prev => ({ ...prev, enabled: true }));
    }
  };

  const updateQuestion = (index: number, updatedQuestion: Question) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveSurvey = () => {
    const surveyData: Partial<Survey> = {
      title,
      description,
      questions,
      privacyTerms,
      status: "draft", // Default to draft
      // createdBy: currentUserId, // This would come from auth
      // createdAt: new Date(),
      // updatedAt: new Date(),
    };
    // TODO: Implement actual save logic (e.g., API call)
    console.log("Saving survey:", surveyData);
    toast({
      title: "Survey Saved!",
      description: `"${title}" has been saved as a draft.`,
      variant: "default",
    });
    // Simulate saving and redirecting to survey details page (mock ID)
    const mockSurveyId = "survey_123"; 
    router.push(`/surveys/${mockSurveyId}`);
  };

  const renderQuestionEditor = (question: Question, index: number) => {
    const baseProps = { question, index, onUpdateQuestion: updateQuestion, onRemoveQuestion: removeQuestion, questionTypeIcon: questionTypeIcons[question.type] };
    switch (question.type) {
      case "open-ended":
        return <QuestionEditorBase {...baseProps}><OpenEndedQuestionEditor {...baseProps} /></QuestionEditorBase>;
      case "closed-ended":
        return <QuestionEditorBase {...baseProps}><ClosedEndedQuestionEditor {...baseProps} /></QuestionEditorBase>;
      case "multiple-choice":
        return <QuestionEditorBase {...baseProps}><MultipleChoiceQuestionEditor {...baseProps} /></QuestionEditorBase>;
      case "likert-scale":
        return <QuestionEditorBase {...baseProps}><LikertScaleQuestionEditor {...baseProps} /></QuestionEditorBase>;
      case "scaled":
        return <QuestionEditorBase {...baseProps}><ScaledQuestionEditor {...baseProps} /></QuestionEditorBase>;
      default:
        return null;
    }
  };


  return (
    <>
      <PageHeader 
        title="Create New Survey"
        description="Build your survey question by question."
        actions={
          <div className="space-x-2">
            <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
            <Button onClick={handleSaveSurvey}><Save className="mr-2 h-4 w-4" /> Save Survey</Button>
          </div>
        }
      />
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h2 className="text-xl font-semibold mb-1">Survey Details</h2>
            <p className="text-sm text-muted-foreground mb-4">Provide a title and description for your survey.</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="survey-title">Survey Title</Label>
                <Input
                  id="survey-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Customer Satisfaction Survey"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="survey-description">Description (Optional)</Label>
                <Textarea
                  id="survey-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe your survey"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </div>
          
          {questions.map((q, index) => (
            <div key={q.id}>
              {renderQuestionEditor(q, index)}
            </div>
          ))}

          {showPrivacySection && (
            <PrivacySectionEditor privacyTerms={privacyTerms} onChange={setPrivacyTerms} />
          )}
        </div>

        <div className="md:col-span-1">
          <QuestionPalette onAddQuestion={addQuestion} onAddPrivacySection={handleAddPrivacySection} />
        </div>
      </div>
    </>
  );
}

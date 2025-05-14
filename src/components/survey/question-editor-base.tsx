"use client";

import type { Question } from "@/types/survey";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, GripVertical } from "lucide-react";
import type { ReactNode } from "react";

interface QuestionEditorBaseProps {
  question: Question;
  index: number;
  onUpdateQuestion: (index: number, question: Question) => void;
  onRemoveQuestion: (index: number) => void;
  questionTypeIcon: ReactNode;
  children?: ReactNode; // For specific options of each question type
}

export function QuestionEditorBase({
  question,
  index,
  onUpdateQuestion,
  onRemoveQuestion,
  questionTypeIcon,
  children,
}: QuestionEditorBaseProps) {
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateQuestion(index, { ...question, text: e.target.value });
  };

  const handleRequiredChange = (checked: boolean) => {
    onUpdateQuestion(index, { ...question, isRequired: checked });
  };

  return (
    <Card className="mb-6 bg-card shadow-sm relative group">
       <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-50 group-hover:opacity-100 transition-opacity" onClick={() => onRemoveQuestion(index)} aria-label="Remove question">
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="absolute top-3 left-1 text-muted-foreground cursor-grab opacity-30 group-hover:opacity-100 transition-opacity" aria-label="Drag to reorder">
        <GripVertical className="h-5 w-5" />
      </Button>
      <CardHeader>
        <div className="flex items-center gap-2">
          {questionTypeIcon}
          <CardTitle className="capitalize">{question.type.replace('-', ' ')} Question</CardTitle>
        </div>
         <CardDescription>Configure this question for your survey.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`question-text-${question.id}`}>Question Text</Label>
          <Input
            id={`question-text-${question.id}`}
            value={question.text}
            onChange={handleTextChange}
            placeholder="Enter your question here"
            className="mt-1"
          />
        </div>
        
        {children} {/* Placeholder for type-specific options */}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Switch
              id={`question-required-${question.id}`}
              checked={question.isRequired}
              onCheckedChange={handleRequiredChange}
            />
            <Label htmlFor={`question-required-${question.id}`}>Required</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Example specific question type editors (can be in separate files)

export function OpenEndedQuestionEditor({ question, index, onUpdateQuestion }: Omit<QuestionEditorBaseProps, 'onRemoveQuestion' | 'children' | 'questionTypeIcon'>) {
  // No specific options for open-ended beyond base
  return null;
}

export function ClosedEndedQuestionEditor({ question, index, onUpdateQuestion }: Omit<QuestionEditorBaseProps, 'onRemoveQuestion' | 'children' | 'questionTypeIcon'>) {
  // Options for Yes/No labels could be added here if needed
  return (
    <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
      Respondents will choose between "Yes" or "No".
    </p>
  );
}

export function MultipleChoiceQuestionEditor({ question, index, onUpdateQuestion, onRemoveQuestion }: Omit<QuestionEditorBaseProps, 'children' | 'questionTypeIcon'>) {
  const handleOptionChange = (optIndex: number, text: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[optIndex] = { ...newOptions[optIndex], text };
    onUpdateQuestion(index, { ...question, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), { id: Date.now().toString(), text: "" }];
    onUpdateQuestion(index, { ...question, options: newOptions });
  };

  const removeOption = (optIndex: number) => {
    const newOptions = (question.options || []).filter((_, i) => i !== optIndex);
    onUpdateQuestion(index, { ...question, options: newOptions });
  };

  return (
    <div className="space-y-3">
      <Label>Options</Label>
      {(question.options || []).map((option, optIndex) => (
        <div key={option.id || optIndex} className="flex items-center gap-2">
          <Input
            value={option.text}
            onChange={(e) => handleOptionChange(optIndex, e.target.value)}
            placeholder={`Option ${optIndex + 1}`}
          />
          <Button variant="ghost" size="icon" onClick={() => removeOption(optIndex)} aria-label="Remove option">
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addOption}>Add Option</Button>
    </div>
  );
}

// Placeholder for LikertScaleQuestionEditor and ScaledQuestionEditor
export function LikertScaleQuestionEditor({ question, index, onUpdateQuestion }: Omit<QuestionEditorBaseProps, 'onRemoveQuestion' | 'children' | 'questionTypeIcon'>) {
   const handleLabelChange = (field: 'minLabel' | 'maxLabel', value: string) => {
    onUpdateQuestion(index, { ...question, [field]: value });
  };
  return (
     <div className="space-y-3 p-2 bg-muted rounded-md">
      <p className="text-sm text-muted-foreground">Typically a 5 or 7 point scale (e.g., Strongly Disagree to Strongly Agree).</p>
       <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`min-label-${question.id}`}>Min Scale Label (e.g., Strongly Disagree)</Label>
          <Input id={`min-label-${question.id}`} value={question.minLabel || ''} onChange={(e) => handleLabelChange('minLabel', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor={`max-label-${question.id}`}>Max Scale Label (e.g., Strongly Agree)</Label>
          <Input id={`max-label-${question.id}`} value={question.maxLabel || ''} onChange={(e) => handleLabelChange('maxLabel', e.target.value)} className="mt-1" />
        </div>
      </div>
       <p className="text-xs text-muted-foreground">Number of scale points (e.g., 5 for a 1-5 scale) can be configured in advanced settings (not shown).</p>
    </div>
  );
}

export function ScaledQuestionEditor({ question, index, onUpdateQuestion }: Omit<QuestionEditorBaseProps, 'onRemoveQuestion' | 'children' | 'questionTypeIcon'>) {
   const handleLabelChange = (field: 'minLabel' | 'maxLabel', value: string) => {
    onUpdateQuestion(index, { ...question, [field]: value });
  };
  return (
    <div className="space-y-3 p-2 bg-muted rounded-md">
      <p className="text-sm text-muted-foreground">Ask respondents to rate something on a numerical scale (e.g., 1 to 5 stars).</p>
       <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`min-label-${question.id}`}>Min Scale Label (e.g., Not at all likely)</Label>
          <Input id={`min-label-${question.id}`} value={question.minLabel || ''} onChange={(e) => handleLabelChange('minLabel', e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor={`max-label-${question.id}`}>Max Scale Label (e.g., Extremely likely)</Label>
          <Input id={`max-label-${question.id}`} value={question.maxLabel || ''} onChange={(e) => handleLabelChange('maxLabel', e.target.value)} className="mt-1" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">The actual scale (e.g., 1-5, 1-10) can be configured in advanced settings (not shown).</p>
    </div>
  );
}


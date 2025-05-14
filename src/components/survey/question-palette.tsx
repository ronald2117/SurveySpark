"use client";

import type { Question, QuestionType } from "@/types/survey";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baseline, CheckSquare, ListChecks, SlidersHorizontal, Star, FileShield } from "lucide-react";

interface QuestionPaletteProps {
  onAddQuestion: (type: QuestionType) => void;
  onAddPrivacySection: () => void; // Added prop for privacy section
}

const questionTypesConfig: Array<{ type: QuestionType; label: string; icon: React.ReactNode }> = [
  { type: "open-ended", label: "Open-Ended", icon: <Baseline className="mr-2 h-4 w-4" /> },
  { type: "closed-ended", label: "Yes/No", icon: <CheckSquare className="mr-2 h-4 w-4" /> },
  { type: "multiple-choice", label: "Multiple Choice", icon: <ListChecks className="mr-2 h-4 w-4" /> },
  { type: "likert-scale", label: "Likert Scale", icon: <SlidersHorizontal className="mr-2 h-4 w-4" /> },
  { type: "scaled", label: "Scaled (e.g., Rating)", icon: <Star className="mr-2 h-4 w-4" /> },
];

export function QuestionPalette({ onAddQuestion, onAddPrivacySection }: QuestionPaletteProps) {
  return (
    <Card className="sticky top-24 shadow-md">
      <CardHeader>
        <CardTitle>Add Elements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Question Types</p>
        {questionTypesConfig.map((qType) => (
          <Button
            key={qType.type}
            variant="outline"
            className="w-full justify-start"
            onClick={() => onAddQuestion(qType.type)}
          >
            {qType.icon}
            {qType.label}
          </Button>
        ))}
        <hr className="my-4"/>
        <p className="text-sm font-medium text-muted-foreground">Other</p>
         <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onAddPrivacySection}
          >
            <FileShield className="mr-2 h-4 w-4" />
            Privacy Terms
          </Button>
      </CardContent>
    </Card>
  );
}

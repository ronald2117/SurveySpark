export type QuestionType = 
  | "open-ended" 
  | "closed-ended" // Yes/No
  | "multiple-choice" 
  | "likert-scale" 
  | "scaled"; // e.g., 1-5 rating

export interface QuestionOption {
  id: string;
  text: string;
  value?: string | number; // For multiple choice, scaled questions
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  isRequired: boolean;
  options?: QuestionOption[]; // For multiple-choice, Likert, scaled
  scaleMin?: number; // For Likert, scaled
  scaleMax?: number; // For Likert, scaled
  minLabel?: string; // Label for min value on Likert/scaled
  maxLabel?: string; // Label for max value on Likert/scaled
}

export interface PrivacyTerms {
  enabled: boolean;
  text: string;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  privacyTerms: PrivacyTerms;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID
  uniqueLink?: string;
  status: "draft" | "active" | "closed";
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId?: string; // Optional, for anonymous responses
  answers: Array<{ questionId: string; value: any }>; // Value can be string, number, string[] etc.
  submittedAt: Date;
  isVerified?: boolean; // For reward management
  rewardStatus?: "pending" | "issued" | "not_eligible";
}

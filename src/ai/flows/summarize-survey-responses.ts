'use server';
/**
 * @fileOverview Summarizes survey responses using AI to identify key trends and insights.
 *
 * - summarizeSurveyResponses - A function that summarizes survey responses.
 * - SummarizeSurveyResponsesInput - The input type for the summarizeSurveyResponses function.
 * - SummarizeSurveyResponsesOutput - The return type for the summarizeSurveyResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSurveyResponsesInputSchema = z.object({
  responses: z
    .string()
    .describe('The survey responses to summarize, as a JSON string.'),
  researchQuestion: z.string().describe('The primary research question the survey aims to answer.'),
});
export type SummarizeSurveyResponsesInput = z.infer<typeof SummarizeSurveyResponsesInputSchema>;

const SummarizeSurveyResponsesOutputSchema = z.object({
  summary: z.string().describe('A summary of the survey responses, highlighting key trends and insights.'),
});
export type SummarizeSurveyResponsesOutput = z.infer<typeof SummarizeSurveyResponsesOutputSchema>;

export async function summarizeSurveyResponses(input: SummarizeSurveyResponsesInput): Promise<SummarizeSurveyResponsesOutput> {
  return summarizeSurveyResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSurveyResponsesPrompt',
  input: {schema: SummarizeSurveyResponsesInputSchema},
  output: {schema: SummarizeSurveyResponsesOutputSchema},
  prompt: `You are an expert survey analyst. You will be provided with a set of survey responses in JSON format, and the primary research question the survey aimed to answer. Your task is to summarize the responses, identifying key trends and insights that address the research question.\n\nResearch Question: {{{researchQuestion}}}\n\nSurvey Responses: {{{responses}}}\n\nSummary: `,
});

const summarizeSurveyResponsesFlow = ai.defineFlow(
  {
    name: 'summarizeSurveyResponsesFlow',
    inputSchema: SummarizeSurveyResponsesInputSchema,
    outputSchema: SummarizeSurveyResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

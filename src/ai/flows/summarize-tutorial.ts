// src/ai/flows/summarize-tutorial.ts
'use server';
/**
 * @fileOverview Summarizes a tutorial given a URL.
 *
 * - summarizeTutorial - A function that handles the summarization process.
 * - SummarizeTutorialInput - The input type for the summarizeTutorial function.
 * - SummarizeTutorialOutput - The return type for the summarizeTutorial function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeTutorialInputSchema = z.object({
  url: z.string().describe('The URL of the tutorial to summarize.'),
});
export type SummarizeTutorialInput = z.infer<typeof SummarizeTutorialInputSchema>;

const SummarizeTutorialOutputSchema = z.object({
  summary: z.string().describe('A short summary of the tutorial.'),
});
export type SummarizeTutorialOutput = z.infer<typeof SummarizeTutorialOutputSchema>;

export async function summarizeTutorial(input: SummarizeTutorialInput): Promise<SummarizeTutorialOutput> {
  return summarizeTutorialFlow(input);
}

const summarizeTutorialPrompt = ai.definePrompt({
  name: 'summarizeTutorialPrompt',
  input: {
    schema: z.object({
      url: z.string().describe('The URL of the tutorial to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A short summary of the tutorial.'),
    }),
  },
  prompt: `You are an expert at summarizing tutorials. Please summarize the tutorial at the following URL in a few sentences:\n\nURL: {{{url}}}`,
});

const summarizeTutorialFlow = ai.defineFlow<
  typeof SummarizeTutorialInputSchema,
  typeof SummarizeTutorialOutputSchema
>(
  {
    name: 'summarizeTutorialFlow',
    inputSchema: SummarizeTutorialInputSchema,
    outputSchema: SummarizeTutorialOutputSchema,
  },
  async input => {
    const {output} = await summarizeTutorialPrompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview A FAQ answering AI agent.
 *
 * - answerFAQ - A function that handles the FAQ answering process.
 * - AnswerFAQInput - The input type for the answerFAQ function.
 * - AnswerFAQOutput - The return type for the answerFAQ function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnswerFAQInputSchema = z.object({
  question: z.string().describe('The question to be answered.'),
});
export type AnswerFAQInput = z.infer<typeof AnswerFAQInputSchema>;

const AnswerFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AnswerFAQOutput = z.infer<typeof AnswerFAQOutputSchema>;

export async function answerFAQ(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  return answerFAQFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFAQPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The question to be answered.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the question.'),
    }),
  },
  prompt: `You are a tech support chatbot answering frequently asked questions.

  Answer the following question:

  Question: {{{question}}}
  Answer: `,
});

const answerFAQFlow = ai.defineFlow<
  typeof AnswerFAQInputSchema,
  typeof AnswerFAQOutputSchema
>(
  {
    name: 'answerFAQFlow',
    inputSchema: AnswerFAQInputSchema,
    outputSchema: AnswerFAQOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

// 'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant skills based on a job title.
 *
 * - suggestSkills - A function that suggests skills for a given job title.
 * - SuggestSkillsInput - The input type for the suggestSkills function, which includes the job title.
 * - SuggestSkillsOutput - The output type for the suggestSkills function, which is an array of skill suggestions.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillsInputSchema = z.object({
  jobTitle: z.string().describe('The job title for which to suggest skills.'),
});
export type SuggestSkillsInput = z.infer<typeof SuggestSkillsInputSchema>;

const SuggestSkillsOutputSchema = z.object({
  skills: z.array(z.string()).describe('An array of suggested skills for the job title.'),
});
export type SuggestSkillsOutput = z.infer<typeof SuggestSkillsOutputSchema>;

export async function suggestSkills(input: SuggestSkillsInput): Promise<SuggestSkillsOutput> {
  return suggestSkillsFlow(input);
}

const suggestSkillsPrompt = ai.definePrompt({
  name: 'suggestSkillsPrompt',
  input: {schema: SuggestSkillsInputSchema},
  output: {schema: SuggestSkillsOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting relevant skills for a given job title.

  Based on the job title provided, generate a list of skills that would be valuable to employers.
  Return the skills as an array of strings.

  Job Title: {{{jobTitle}}}
  Skills:`, // Ensure the AI knows to return an array of skills
});

const suggestSkillsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsFlow',
    inputSchema: SuggestSkillsInputSchema,
    outputSchema: SuggestSkillsOutputSchema,
  },
  async input => {
    const {output} = await suggestSkillsPrompt(input);
    return output!;
  }
);

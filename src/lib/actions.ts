'use server';

import { suggestSkills } from '@/ai/flows/suggest-skills';

export async function getSkillSuggestions(jobTitle: string) {
  if (!jobTitle) {
    return { skills: [] };
  }
  try {
    const result = await suggestSkills({ jobTitle });
    return result;
  } catch (error) {
    console.error('Error fetching skill suggestions:', error);
    return { skills: [] };
  }
}

import { type ResumeData } from './types';

export const defaultResumeData: ResumeData = {
  name: 'Alex Doe',
  title: 'Full Stack Developer',
  contact: {
    email: 'alex.doe@email.com',
    phone: '123-456-7890',
    website: 'alexdoe.dev',
  },
  summary: 'A passionate Full Stack Developer with 5+ years of experience in building scalable web applications using React, Node.js, and TypeScript. Proven ability to work in fast-paced, collaborative environments and deliver high-quality software.',
  skills: [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'Next.js' },
    { name: 'GraphQL' },
    { name: 'PostgreSQL' },
    { name: 'Docker' },
  ],
  education: [
    {
      school: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: '2012',
      endDate: '2016',
      location: 'Techville, USA',
    },
  ],
  workExperience: [
    {
      company: 'Innovate Inc.',
      role: 'Senior Software Engineer',
      startDate: '2018',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: '- Led the development of a new customer-facing dashboard, improving user engagement by 25%.\n- Mentored junior engineers and conducted code reviews to maintain code quality.\n- Optimized application performance, reducing page load times by 40%.',
    },
    {
      company: 'Solutions Co.',
      role: 'Software Engineer',
      startDate: '2016',
      endDate: '2018',
      location: 'Boston, MA',
      description: '- Developed and maintained features for a large-scale e-commerce platform.\n- Collaborated with cross-functional teams to define and ship new features.\n- Wrote unit and integration tests to ensure software reliability.',
    },
  ],
  projects: [
    {
      name: 'Portfolio Website',
      description: 'Personal portfolio website built with Next.js and deployed on Vercel.',
      url: 'https://alexdoe.dev',
    },
    {
        name: 'Task Management App',
        description: 'A full-stack task management application using the MERN stack.',
        url: 'https://github.com/alexdoe/task-app',
      },
  ],
  certifications: [
    {
      name: 'AWS Certified Developer - Associate',
      authority: 'Amazon Web Services',
      date: '2021',
    },
  ],
};

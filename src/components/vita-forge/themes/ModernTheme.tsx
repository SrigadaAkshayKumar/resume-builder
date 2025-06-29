import { type ResumeData } from "@/lib/types";
import { Mail, Phone, Globe, Briefcase, GraduationCap, Lightbulb, Sparkles, Award } from 'lucide-react';

interface ThemeProps {
  data: ResumeData;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-6">
    <h2 className="font-headline text-xl font-bold text-primary border-b-2 border-primary/50 pb-1 mb-3">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </section>
);

export default function ModernTheme({ data }: ThemeProps) {
  return (
    <div className="font-body text-sm">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 bg-secondary p-8 text-secondary-foreground">
            <div className="text-center">
                <h1 className="font-headline text-3xl font-bold">{data.name}</h1>
                <p className="font-headline text-lg text-primary mt-1">{data.title}</p>
            </div>
            
            <div className="mt-8 space-y-4">
              <h3 className="font-headline text-lg font-semibold">Contact</h3>
              <div className="space-y-2">
                {data.contact?.email && <a href={`mailto:${data.contact.email}`} className="flex items-center gap-3 hover:text-primary"><Mail className="w-4 h-4" /><span>{data.contact.email}</span></a>}
                {data.contact?.phone && <span className="flex items-center gap-3"><Phone className="w-4 h-4" />{data.contact.phone}</span>}
                {data.contact?.website && <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary"><Globe className="w-4 h-4" /><span>{data.contact.website}</span></a>}
              </div>
            </div>

            {data.skills && data.skills.length > 0 && (
              <div className="mt-8 space-y-2">
                <h3 className="font-headline text-lg font-semibold">Skills</h3>
                <ul className="list-disc list-inside space-y-1">
                  {data.skills.map((skill, index) => skill.name && (
                    <li key={index}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.education && data.education.length > 0 && (
                <div className="mt-8 space-y-4">
                    <h3 className="font-headline text-lg font-semibold">Education</h3>
                    {data.education.map((edu, index) => (
                    <div key={index}>
                        <h4 className="font-semibold">{edu.school}</h4>
                        <p className="opacity-80">{edu.degree}</p>
                        <p className="text-xs opacity-60">{edu.startDate} - {edu.endDate}</p>
                    </div>
                    ))}
                </div>
            )}
        </div>

        <div className="col-span-12 md:col-span-8 p-8">
            {data.summary && (
              <Section title="Summary">
                <p className="text-foreground/80">{data.summary}</p>
              </Section>
            )}

            {data.workExperience && data.workExperience.length > 0 && (
                <Section title="Work Experience">
                {data.workExperience.map((exp, index) => (
                    <div key={index}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-headline text-lg font-semibold">{exp.role}</h3>
                        <div className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <div className="flex justify-between items-baseline text-muted-foreground">
                        <p>{exp.company}</p>
                        <p className="text-xs">{exp.location}</p>
                    </div>
                    {exp.description && <ul className="mt-2 list-disc list-inside text-foreground/80 space-y-1">
                        {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item.trim().replace(/^-/, '').trim()}</li>)}
                    </ul>}
                    </div>
                ))}
                </Section>
            )}

            {data.projects && data.projects.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((proj, index) => (
                    <div key={index}>
                        <h3 className="font-headline text-lg font-semibold hover:text-primary">
                            <a href={proj.url} target="_blank" rel="noopener noreferrer">{proj.name}</a>
                        </h3>
                        <p className="text-foreground/80">{proj.description}</p>
                    </div>
                    ))}
                </Section>
            )}

            {data.certifications && data.certifications.length > 0 && (
                <Section title="Certifications">
                    {data.certifications.map((cert, index) => (
                        <div key={index}>
                            <h3 className="font-headline text-lg font-semibold">{cert.name}</h3>
                            <p className="text-muted-foreground">{cert.authority} ({cert.date})</p>
                        </div>
                    ))}
                </Section>
            )}
        </div>
      </div>
    </div>
  );
}

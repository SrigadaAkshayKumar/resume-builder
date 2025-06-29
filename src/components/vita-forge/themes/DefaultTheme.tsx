import { type ResumeData } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Globe, Briefcase, GraduationCap, Lightbulb, Sparkles, Award } from 'lucide-react';

interface ThemeProps {
  data: ResumeData;
}

const Section = ({ title, icon, children }: { title: string; icon: React.ElementType, children: React.ReactNode }) => {
  const Icon = icon;
  return (
    <section className="mb-6">
      <div className="flex items-center mb-3">
        <Icon className="w-6 h-6 mr-3 text-primary" />
        <h2 className="font-headline text-2xl font-bold text-primary">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
};

export default function DefaultTheme({ data }: ThemeProps) {
  return (
    <div className="p-8 sm:p-12 bg-background font-body">
      <header className="text-center mb-8">
        <h1 className="font-headline text-5xl font-bold text-primary">{data.name}</h1>
        <p className="font-headline text-2xl text-muted-foreground mt-1">{data.title}</p>
      </header>
      
      <div className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap text-sm text-muted-foreground mb-8">
        {data.contact?.email && <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="w-4 h-4" />{data.contact.email}</a>}
        {data.contact?.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4" />{data.contact.phone}</span>}
        {data.contact?.website && <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe className="w-4 h-4" />{data.contact.website}</a>}
      </div>

      <Separator className="my-8" />

      {data.summary && (
        <section className="mb-6">
          <p className="text-center text-foreground/80">{data.summary}</p>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <Section title="Skills" icon={Sparkles}>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => skill.name && (
              <span key={index} className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">{skill.name}</span>
            ))}
          </div>
        </Section>
      )}

      {data.workExperience && data.workExperience.length > 0 && (
        <Section title="Work Experience" icon={Briefcase}>
          {data.workExperience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-headline text-lg font-semibold">{exp.role}</h3>
                <div className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="flex justify-between items-baseline text-muted-foreground">
                <p>{exp.company}</p>
                <p className="text-sm">{exp.location}</p>
              </div>
              {exp.description && <ul className="mt-2 list-disc list-inside text-foreground/80 space-y-1 text-sm">
                {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item.trim().replace(/^-/, '').trim()}</li>)}
              </ul>}
            </div>
          ))}
        </Section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.education && data.education.length > 0 && (
          <Section title="Education" icon={GraduationCap}>
            {data.education.map((edu, index) => (
              <div key={index}>
                <h3 className="font-headline text-lg font-semibold">{edu.school}</h3>
                <p className="text-muted-foreground">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate} &bull; {edu.location}</p>
              </div>
            ))}
          </Section>
        )}

        {data.projects && data.projects.length > 0 && (
            <Section title="Projects" icon={Lightbulb}>
            {data.projects.map((proj, index) => (
                <div key={index}>
                    <h3 className="font-headline text-lg font-semibold">{proj.name}</h3>
                    <p className="text-sm text-foreground/80">{proj.description}</p>
                    {proj.url && <a href={proj.url} className="text-sm text-primary hover:underline" target="_blank" rel="noopener noreferrer">View Project</a>}
                </div>
            ))}
            </Section>
        )}
      </div>

       {data.certifications && data.certifications.length > 0 && (
        <Section title="Certifications" icon={Award}>
          {data.certifications.map((cert, index) => (
            <div key={index}>
              <h3 className="font-headline text-lg font-semibold">{cert.name}</h3>
              <p className="text-muted-foreground">{cert.authority} - {cert.date}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

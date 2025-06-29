'use client';

import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getSkillSuggestions } from '@/lib/actions';
import type { ResumeData } from '@/lib/types';
import { ThemeToggle } from '../ThemeToggle';
import {
  Award,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Palette,
  PlusCircle,
  Sparkles,
  Trash2,
  User,
  FileDown
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface ResumeFormProps {
  form: UseFormReturn<ResumeData>;
  onThemeChange: (theme: string) => void;
  onPrint: () => void;
  currentTheme: string;
}

function SectionHeader({ icon, title }: { icon: React.ElementType; title: string }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <span className="font-headline text-lg">{title}</span>
    </div>
  );
}

function FieldArraySection<T extends Record<'id', string>>({
  fields,
  append,
  remove,
  children,
  appendValue,
  title,
}: {
  fields: T[];
  append: (value: any) => void;
  remove: (index: number) => void;
  children: (field: T, index: number) => React.ReactNode;
  appendValue: any;
  title: string;
}) {
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="rounded-md border p-4 relative space-y-2">
          {children(field, index)}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => append(appendValue)}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add {title}
      </Button>
    </div>
  );
}

export default function ResumeForm({ form, onThemeChange, onPrint, currentTheme }: ResumeFormProps) {
  const { toast } = useToast();
  const [isSuggestionLoading, setIsSuggestionLoading] = React.useState(false);
  const [skillSuggestions, setSkillSuggestions] = React.useState<string[]>([]);
  const [isSuggestionDialogOpen, setIsSuggestionDialogOpen] = React.useState(false);

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: 'skills' });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control: form.control, name: 'education' });
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control: form.control, name: 'workExperience' });
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({ control: form.control, name: 'projects' });
  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control: form.control, name: 'certifications' });

  const handleSuggestSkills = async () => {
    const jobTitle = form.getValues('title');
    if (!jobTitle) {
      toast({
        title: 'Job Title Required',
        description: 'Please enter a job title to get skill suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsSuggestionLoading(true);
    try {
      const result = await getSkillSuggestions(jobTitle);
      setSkillSuggestions(result.skills || []);
      setIsSuggestionDialogOpen(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not fetch skill suggestions.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggestionLoading(false);
    }
  };
  
  const addSuggestedSkill = (skill: string) => {
    appendSkill({ name: skill });
    setSkillSuggestions(prev => prev.filter(s => s !== skill));
    toast({
      title: 'Skill Added',
      description: `"${skill}" has been added to your skills.`,
    })
  };

  return (
    <Form {...form}>
      <SidebarHeader className="p-4">
        <h1 className="font-headline text-2xl font-bold text-primary">Resume Builder</h1>
        <p className="text-sm text-muted-foreground">Build your professional resume with ease.</p>
      </SidebarHeader>

      <SidebarSeparator />

      <ScrollArea className="h-full">
      <SidebarContent className="p-4">
        <form className="space-y-6">
          <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <SectionHeader icon={User} title="Personal Details" />
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="contact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="contact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., (123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="contact.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website / Portfolio</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., myportfolio.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="A short summary about your professional self." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <SectionHeader icon={Sparkles} title="Skills" />
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <Button type="button" onClick={handleSuggestSkills} disabled={isSuggestionLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {isSuggestionLoading ? 'Getting suggestions...' : 'Suggest Skills with AI'}
                </Button>
                <FieldArraySection
                  fields={skillFields}
                  append={appendSkill}
                  remove={removeSkill}
                  appendValue={{ name: '' }}
                  title="Skill"
                >
                  {(_field, index) => (
                    <FormField
                      control={form.control}
                      name={`skills.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Skill</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., TypeScript" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FieldArraySection>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <SectionHeader icon={Briefcase} title="Work Experience" />
              </AccordionTrigger>
              <AccordionContent>
                <FieldArraySection
                  fields={expFields}
                  append={appendExp}
                  remove={removeExp}
                  appendValue={{ company: '', role: '', startDate: '', endDate: '', location: '', description: '' }}
                  title="Experience"
                >
                  {(_field, index) => (
                    <div className="space-y-4">
                      <FormField control={form.control} name={`workExperience.${index}.role`} render={({ field }) => ( <FormItem><FormLabel>Role</FormLabel><FormControl><Input placeholder="Role" {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name={`workExperience.${index}.company`} render={({ field }) => ( <FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="Company" {...field} /></FormControl></FormItem> )} />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name={`workExperience.${index}.startDate`} render={({ field }) => ( <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="e.g., Jan 2020" {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`workExperience.${index}.endDate`} render={({ field }) => ( <FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="e.g., Present" {...field} /></FormControl></FormItem> )} />
                      </div>
                      <FormField control={form.control} name={`workExperience.${index}.location`} render={({ field }) => ( <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Remote" {...field} /></FormControl></FormItem> )} />
                      <FormField control={form.control} name={`workExperience.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Key responsibilities and achievements..." {...field} /></FormControl></FormItem> )} />
                    </div>
                  )}
                </FieldArraySection>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <SectionHeader icon={GraduationCap} title="Education" />
              </AccordionTrigger>
              <AccordionContent>
                <FieldArraySection
                  fields={eduFields}
                  append={appendEdu}
                  remove={removeEdu}
                  appendValue={{ school: '', degree: '', startDate: '', endDate: '', location: '' }}
                  title="Education"
                >
                  {(_field, index) => (
                     <div className="space-y-4">
                        <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => ( <FormItem><FormLabel>School</FormLabel><FormControl><Input placeholder="School/University" {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="Degree/Field of Study" {...field} /></FormControl></FormItem> )} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name={`education.${index}.startDate`} render={({ field }) => ( <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input placeholder="e.g., 2018" {...field} /></FormControl></FormItem> )} />
                            <FormField control={form.control} name={`education.${index}.endDate`} render={({ field }) => ( <FormItem><FormLabel>End Date</FormLabel><FormControl><Input placeholder="e.g., 2022" {...field} /></FormControl></FormItem> )} />
                        </div>
                        <FormField control={form.control} name={`education.${index}.location`} render={({ field }) => ( <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., City, Country" {...field} /></FormControl></FormItem> )} />
                     </div>
                  )}
                </FieldArraySection>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                <SectionHeader icon={Lightbulb} title="Projects" />
              </AccordionTrigger>
              <AccordionContent>
                 <FieldArraySection
                  fields={projectFields}
                  append={appendProject}
                  remove={removeProject}
                  appendValue={{ name: '', description: '', url: '' }}
                  title="Project"
                >
                  {(_field, index) => (
                     <div className="space-y-4">
                        <FormField control={form.control} name={`projects.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="Project Name" {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`projects.${index}.url`} render={({ field }) => ( <FormItem><FormLabel>URL</FormLabel><FormControl><Input placeholder="Link to project or repository" {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe the project..." {...field} /></FormControl></FormItem> )} />
                     </div>
                  )}
                </FieldArraySection>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                <SectionHeader icon={Award} title="Certifications" />
              </AccordionTrigger>
              <AccordionContent>
                <FieldArraySection
                  fields={certFields}
                  append={appendCert}
                  remove={removeCert}
                  appendValue={{ name: '', authority: '', date: '' }}
                  title="Certification"
                >
                  {(_field, index) => (
                     <div className="space-y-4">
                        <FormField control={form.control} name={`certifications.${index}.name`} render={({ field }) => ( <FormItem><FormLabel>Certification Name</FormLabel><FormControl><Input placeholder="Certification Name" {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`certifications.${index}.authority`} render={({ field }) => ( <FormItem><FormLabel>Issuing Authority</FormLabel><FormControl><Input placeholder="e.g., Google, Coursera" {...field} /></FormControl></FormItem> )} />
                        <FormField control={form.control} name={`certifications.${index}.date`} render={({ field }) => ( <FormItem><FormLabel>Date</FormLabel><FormControl><Input placeholder="e.g., 2023" {...field} /></FormControl></FormItem> )} />
                     </div>
                  )}
                </FieldArraySection>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </SidebarContent>
      </ScrollArea>
      <SidebarSeparator />
      <SidebarFooter className="p-4 space-y-4">
        <div className="space-y-2">
            <Label>
                <div className='flex items-center gap-2'>
                    <Palette className="h-4 w-4" />
                    Theme
                </div>
            </Label>
            <Select onValueChange={onThemeChange} defaultValue={currentTheme}>
            <SelectTrigger>
                <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <Button onClick={onPrint} className="w-full">
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <ThemeToggle />
      </SidebarFooter>
      
      <Dialog open={isSuggestionDialogOpen} onOpenChange={setIsSuggestionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skill Suggestions</DialogTitle>
            <DialogDescription>
              Based on your job title, here are some suggested skills. Click to add them.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-60 overflow-y-auto p-1">
            <div className="flex flex-wrap gap-2">
            {skillSuggestions.length > 0 ? (
              skillSuggestions.map((skill) => (
                <Button key={skill} variant="outline" size="sm" onClick={() => addSuggestedSkill(skill)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {skill}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No new suggestions found.</p>
            )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

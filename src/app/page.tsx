"use client";

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import ResumeForm from '@/components/vita-forge/ResumeForm';
import ResumePreview from '@/components/vita-forge/ResumePreview';
import { type ResumeData, ResumeSchema } from '@/lib/types';
import { defaultResumeData } from '@/lib/resume-data';

export default function ResumeBuilderPage() {
  const [theme, setTheme] = React.useState('default');
  
  const form = useForm<ResumeData>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: defaultResumeData,
    mode: 'onBlur',
  });

  const resumeData = form.watch();

  const handlePrint = () => {
    window.print();
  };

  return (
    <SidebarProvider>
      <Sidebar className="no-print">
        <ResumeForm
          form={form}
          onThemeChange={setTheme}
          onPrint={handlePrint}
          currentTheme={theme}
        />
      </Sidebar>
      <SidebarInset>
        <ResumePreview data={resumeData} theme={theme} />
      </SidebarInset>
    </SidebarProvider>
  );
}

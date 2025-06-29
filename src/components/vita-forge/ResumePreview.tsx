"use client";

import type { ResumeData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import DefaultTheme from "./themes/DefaultTheme";
import ModernTheme from "./themes/ModernTheme";

interface ResumePreviewProps {
  data: ResumeData;
  theme: string;
}

export default function ResumePreview({ data, theme }: ResumePreviewProps) {
  const renderTheme = () => {
    switch (theme) {
      case 'modern':
        return <ModernTheme data={data} />;
      case 'default':
      default:
        return <DefaultTheme data={data} />;
    }
  };

  return (
    <div id="resume-container" className="p-4 sm:p-8 bg-muted/40 min-h-full">
      <Card id="resume-preview" className="max-w-4xl mx-auto shadow-lg resume-container">
        <CardContent className="p-0">
          {renderTheme()}
        </CardContent>
      </Card>
    </div>
  );
}

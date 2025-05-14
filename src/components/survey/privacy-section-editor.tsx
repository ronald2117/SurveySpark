"use client";

import type { PrivacyTerms } from "@/types/survey";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileShield } from "lucide-react";

interface PrivacySectionEditorProps {
  privacyTerms: PrivacyTerms;
  onChange: (updatedTerms: PrivacyTerms) => void;
}

export function PrivacySectionEditor({ privacyTerms, onChange }: PrivacySectionEditorProps) {
  return (
    <Card className="mt-6 shadow-sm border-dashed border-primary">
      <CardHeader>
        <div className="flex items-center gap-2">
            <FileShield className="h-6 w-6 text-primary" />
            <CardTitle>Privacy Terms & Agreement</CardTitle>
        </div>
        <CardDescription>
          Include terms and conditions for survey participants.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-privacy"
            checked={privacyTerms.enabled}
            onCheckedChange={(checked) => onChange({ ...privacyTerms, enabled: checked })}
          />
          <Label htmlFor="enable-privacy">Enable Privacy Section</Label>
        </div>
        {privacyTerms.enabled && (
          <div>
            <Label htmlFor="privacy-text">Terms and Conditions Text</Label>
            <Textarea
              id="privacy-text"
              placeholder="Enter your privacy terms and conditions here..."
              value={privacyTerms.text}
              onChange={(e) => onChange({ ...privacyTerms, text: e.target.value })}
              rows={8}
              className="mt-1"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

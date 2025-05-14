"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/page-header";
import { Award, CheckCircle, Send, Filter, Search } from "lucide-react";
import type { Survey, SurveyResponse } from "@/types/survey";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import type { Metadata } from 'next';

// export const metadata: Metadata = { // Metadata cannot be used in client components
//   title: 'Reward Management - SurveySpark',
//   description: 'Verify responses and manage rewards for participants.',
// };


// Mock data
const mockSurveys: Pick<Survey, "id" | "title">[] = [
  { id: "survey_123", title: "Customer Satisfaction Q3" },
  { id: "survey_456", title: "New Feature Feedback" },
];

const mockResponses: SurveyResponse[] = [
  { id: "resp_001", surveyId: "survey_123", respondentId: "user_xyz", answers: [], submittedAt: new Date("2023-07-20T10:00:00Z"), isVerified: false, rewardStatus: "pending" },
  { id: "resp_002", surveyId: "survey_123", respondentId: "user_abc", answers: [], submittedAt: new Date("2023-07-21T11:30:00Z"), isVerified: true, rewardStatus: "issued" },
  { id: "resp_003", surveyId: "survey_456", respondentId: "user_def", answers: [], submittedAt: new Date("2023-08-05T14:15:00Z"), isVerified: false, rewardStatus: "pending" },
  { id: "resp_004", surveyId: "survey_123", respondentId: "user_ghi", answers: [], submittedAt: new Date("2023-07-22T09:00:00Z"), isVerified: false, rewardStatus: "not_eligible" },
];


export default function RewardManagementPage() {
  const { toast } = useToast();
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResponses, setSelectedResponses] = useState<Set<string>>(new Set());

  const filteredResponses = mockResponses.filter(
    (response) =>
      response.surveyId === selectedSurveyId &&
      (response.respondentId?.toLowerCase().includes(searchTerm.toLowerCase()) || response.id.includes(searchTerm))
  );

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      const allIds = new Set(filteredResponses.map(r => r.id));
      setSelectedResponses(allIds);
    } else {
      setSelectedResponses(new Set());
    }
  };
  
  const handleSelectResponse = (responseId: string, checked: boolean) => {
    const newSelected = new Set(selectedResponses);
    if (checked) {
      newSelected.add(responseId);
    } else {
      newSelected.delete(responseId);
    }
    setSelectedResponses(newSelected);
  };

  const handleVerifySelected = () => {
    // Mock verification
    selectedResponses.forEach(id => {
        const resp = mockResponses.find(r => r.id === id);
        if(resp) resp.isVerified = true;
    });
    toast({ title: "Responses Verified", description: `${selectedResponses.size} responses marked as verified.` });
    setSelectedResponses(new Set()); // Clear selection
  };

  const handleIssueRewardsSelected = () => {
    // Mock issuing rewards
     selectedResponses.forEach(id => {
        const resp = mockResponses.find(r => r.id === id && r.isVerified && r.rewardStatus === 'pending');
        if(resp) resp.rewardStatus = 'issued';
    });
    toast({ title: "Rewards Issued", description: `Rewards processed for ${selectedResponses.size} eligible responses.` });
    setSelectedResponses(new Set()); // Clear selection
  };

  return (
    <>
      <PageHeader
        title="Reward Management"
        description="Verify survey responses and manage participant rewards."
        actions={
          <div className="flex gap-2">
            <Button onClick={handleVerifySelected} disabled={selectedResponses.size === 0} variant="outline"><CheckCircle className="mr-2 h-4 w-4" /> Verify Selected</Button>
            <Button onClick={handleIssueRewardsSelected} disabled={selectedResponses.size === 0}><Send className="mr-2 h-4 w-4" /> Issue Rewards</Button>
          </div>
        }
      />

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Participant Rewards</CardTitle>
              <CardDescription>Select a survey to view and manage rewards for its participants.</CardDescription>
            </div>
            <div className="w-full sm:w-auto min-w-[200px]">
              <Select onValueChange={setSelectedSurveyId} value={selectedSurveyId || undefined}>
                <SelectTrigger id="survey-select" aria-label="Select survey">
                  <SelectValue placeholder="Select a survey..." />
                </SelectTrigger>
                <SelectContent>
                  {mockSurveys.map((survey) => (
                    <SelectItem key={survey.id} value={survey.id}>
                      {survey.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
           <div className="mt-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by respondent ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
              disabled={!selectedSurveyId}
            />
          </div>
        </CardHeader>
        <CardContent>
          {selectedSurveyId ? (
            filteredResponses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                     <Checkbox 
                        checked={selectedResponses.size === filteredResponses.length && filteredResponses.length > 0 ? true : selectedResponses.size > 0 ? 'indeterminate' : false}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all responses"
                      />
                  </TableHead>
                  <TableHead>Respondent ID</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Reward Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResponses.map((response) => (
                  <TableRow key={response.id} data-state={selectedResponses.has(response.id) ? "selected" : ""}>
                    <TableCell>
                       <Checkbox
                          checked={selectedResponses.has(response.id)}
                          onCheckedChange={(checked) => handleSelectResponse(response.id, !!checked)}
                          aria-label={`Select response ${response.id}`}
                        />
                    </TableCell>
                    <TableCell className="font-medium">{response.respondentId || "Anonymous"}</TableCell>
                    <TableCell>{new Date(response.submittedAt).toLocaleString()}</TableCell>
                    <TableCell>{response.isVerified ? <CheckCircle className="h-5 w-5 text-green-500" /> : "No"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        response.rewardStatus === 'issued' ? 'bg-accent text-accent-foreground' :
                        response.rewardStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {response.rewardStatus?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" disabled={response.isVerified}>Verify</Button>
                      <Button variant="ghost" size="sm" className="ml-2 text-primary" disabled={!response.isVerified || response.rewardStatus === 'issued'}>Issue Reward</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            ) : (
              <p className="text-center text-muted-foreground py-8">No responses found for this survey or matching your search.</p>
            )
          ) : (
            <div className="text-center py-10">
              <Award className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Please select a survey to manage rewards.</p>
            </div>
          )}
        </CardContent>
         {selectedSurveyId && filteredResponses.length > 0 && (
          <CardFooter className="justify-between">
            <div className="text-xs text-muted-foreground">
              {selectedResponses.size} of {filteredResponses.length} response(s) selected.
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
}

// Adding a simple client component to set metadata, as metadata object cannot be directly exported from client components
export function RewardsPageMetadata() {
  // This is a workaround. In a real app, metadata is typically set in Server Components or layout files.
  if (typeof window !== 'undefined') {
    document.title = 'Reward Management - SurveySpark';
  }
  return null; 
}

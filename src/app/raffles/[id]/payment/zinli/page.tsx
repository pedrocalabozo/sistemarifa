'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Send, Info, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PaymentSummary from "@/components/payment/PaymentSummary";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const zinliUsername = "@RifaFacilZ"; // Example Zinli username

export default function ZinliPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [senderUsername, setSenderUsername] = useState('');
  const [reference, setReference] = useState('');


  const handleCopyUsername = () => {
    navigator.clipboard.writeText(zinliUsername);
    toast({ title: "Username Copied!", description: "Zinli username copied to clipboard." });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderUsername || !reference) {
      toast({ title: "Missing Information", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    console.log("Zinli Data:", {senderUsername, reference});
    toast({
      title: "Payment Submitted (Simulated)",
      description: "Your Zinli payment information has been received. We will verify it shortly.",
    });
    sessionStorage.removeItem('rafflePurchaseInfo');
    router.push('/profile?tab=activity');
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
       <div>
        <PaymentSummary />
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <TrendingUp className="h-8 w-8 mr-3 text-primary" />
            <CardTitle className="text-3xl">Zinli Payment</CardTitle>
          </div>
          <CardDescription>
            Send the payment to our Zinli account and submit your sender username and reference.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg space-y-2 shadow-inner">
            <p className="font-semibold text-lg text-primary">Zinli Payment Details:</p>
            <div className="flex items-center space-x-2">
                <p className="text-lg font-mono bg-background p-2 rounded break-all flex-grow">{zinliUsername}</p>
                <Button variant="outline" size="icon" onClick={handleCopyUsername} aria-label="Copy Zinli Username">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            <p><span className="font-medium">Note:</span> Include your RifaFacil username or raffle ID in the payment description if possible.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="senderUsername">Your Zinli Username (Sender)</Label>
              <Input 
                id="senderUsername" 
                name="senderUsername" 
                placeholder="@YourZinliUser" 
                value={senderUsername} 
                onChange={(e) => setSenderUsername(e.target.value)} 
                required 
              />
            </div>
             <div>
              <Label htmlFor="reference">Payment Reference / Screenshot Link (Optional)</Label>
              <Input 
                id="reference" 
                name="reference" 
                placeholder="Optional: Transaction ID or Screenshot URL" 
                value={reference} 
                onChange={(e) => setReference(e.target.value)} 
              />
            </div>
            <Button type="submit" className="w-full text-lg py-6" size="lg">
              <Send className="mr-2 h-5 w-5" />
              Confirm Payment Sent
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700 flex items-start">
            <Info className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
            <span>
              Ensure your Zinli username is correct for faster verification. Your participation will be confirmed once payment is verified.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

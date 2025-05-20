'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Send, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useState } from "react";
import PaymentSummary from "@/components/payment/PaymentSummary";
import { useRouter } from "next/navigation";

export default function PagoMovilPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    bankCode: '',
    idNumber: '',
    referenceNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log("Pago Movil Data:", formData);
    toast({
      title: "Payment Submitted (Simulated)",
      description: "Your Pago Móvil payment information has been received. We will verify it shortly.",
    });
    // Clear session storage for purchase
    sessionStorage.removeItem('rafflePurchaseInfo');
    router.push('/profile?tab=activity'); // Redirect to profile activity
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div>
        <PaymentSummary />
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Smartphone className="h-8 w-8 mr-3 text-primary" />
            <CardTitle className="text-3xl">Pago Móvil</CardTitle>
          </div>
          <CardDescription>
            Please make the payment to the following details and then submit your payment reference.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg space-y-2 shadow-inner">
            <p className="font-semibold text-lg text-primary">Payment Details:</p>
            <p><span className="font-medium">Bank:</span> Banco Ejemplo (01XX)</p>
            <p><span className="font-medium">Phone Number:</span> 0412-1234567</p>
            <p><span className="font-medium">ID Number (RIF/CI):</span> J-12345678-9</p>
            <p><span className="font-medium">Concept:</span> RifaFacil Purchase</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Your Phone Number (Sender)</Label>
              <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="04XX-XXXXXXX" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="bankCode">Your Bank Code (Sender)</Label>
              <Input id="bankCode" name="bankCode" placeholder="e.g., 0102" value={formData.bankCode} onChange={handleChange} required />
            </div>
             <div>
              <Label htmlFor="idNumber">Your ID Number (Sender)</Label>
              <Input id="idNumber" name="idNumber" placeholder="V-XXXXXXXX" value={formData.idNumber} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="referenceNumber">Payment Reference Number</Label>
              <Input id="referenceNumber" name="referenceNumber" placeholder="00000000" value={formData.referenceNumber} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full text-lg py-6" size="lg">
              <Send className="mr-2 h-5 w-5" />
              Submit Payment Proof
            </Button>
          </form>
           <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700 flex items-start">
            <Info className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
            <span>
              After submitting, your participation will be confirmed once the payment is verified. This may take a few hours.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

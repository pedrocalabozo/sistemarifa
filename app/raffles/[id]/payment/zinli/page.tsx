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

const zinliUsername = "@RifaFacilZ"; // Nombre de usuario Zinli de ejemplo

export default function ZinliPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [senderUsername, setSenderUsername] = useState('');
  const [reference, setReference] = useState('');


  const handleCopyUsername = () => {
    navigator.clipboard.writeText(zinliUsername);
    toast({ title: "¡Usuario Copiado!", description: "Usuario de Zinli copiado al portapapeles." });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderUsername || !reference) {
      toast({ title: "Información Faltante", description: "Por favor, completa todos los campos.", variant: "destructive" });
      return;
    }
    console.log("Datos de Zinli:", {senderUsername, reference});
    toast({
      title: "Pago Enviado (Simulado)",
      description: "La información de tu pago con Zinli ha sido recibida. La verificaremos en breve.",
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
            <CardTitle className="text-3xl">Pago con Zinli</CardTitle>
          </div>
          <CardDescription>
            Envía el pago a nuestra cuenta de Zinli y envía tu nombre de usuario emisor y referencia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg space-y-2 shadow-inner">
            <p className="font-semibold text-lg text-primary">Datos de Pago Zinli:</p>
            <div className="flex items-center space-x-2">
                <p className="text-lg font-mono bg-background p-2 rounded break-all flex-grow">{zinliUsername}</p>
                <Button variant="outline" size="icon" onClick={handleCopyUsername} aria-label="Copiar Usuario Zinli">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            <p><span className="font-medium">Nota:</span> Incluye tu nombre de usuario de RifaFacil o ID de la rifa en la descripción del pago si es posible.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="senderUsername">Tu Usuario de Zinli (Emisor)</Label>
              <Input 
                id="senderUsername" 
                name="senderUsername" 
                placeholder="@TuUsuarioZinli" 
                value={senderUsername} 
                onChange={(e) => setSenderUsername(e.target.value)} 
                required 
              />
            </div>
             <div>
              <Label htmlFor="reference">Referencia de Pago / Enlace de Captura (Opcional)</Label>
              <Input 
                id="reference" 
                name="reference" 
                placeholder="Opcional: ID de transacción o URL de captura" 
                value={reference} 
                onChange={(e) => setReference(e.target.value)} 
              />
            </div>
            <Button type="submit" className="w-full text-lg py-6" size="lg">
              <Send className="mr-2 h-5 w-5" />
              Confirmar Envío de Pago
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700 flex items-start">
            <Info className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
            <span>
              Asegúrate de que tu usuario de Zinli sea correcto para una verificación más rápida. Tu participación será confirmada una vez verificado el pago.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

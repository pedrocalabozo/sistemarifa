import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Gift, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <Ticket className="mx-auto h-20 w-20 text-primary mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground bg-primary px-4 py-2 rounded-md inline-block shadow-xl">
            ¡Bienvenido a RifaFacil!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Tu destino definitivo para rifas online emocionantes. Participa fácilmente, gana premios increíbles y disfruta de una experiencia fluida.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/raffles">
                <Gift className="mr-2 h-5 w-5" /> Ver Rifas Activas
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/rules">
                <Users className="mr-2 h-5 w-5" /> Cómo Participar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">¿Por Qué Elegir RifaFacil?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/20 rounded-full mb-4">
                <Image src="https://placehold.co/80x80.png" alt="Participación Fácil" width={80} height={80} className="rounded-full" data-ai-hint="boleto icono" />
              </div>
              <CardTitle className="text-2xl">Fácil de Participar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Pasos sencillos para unirte a cualquier rifa. Elige tus números y paga de forma segura.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-accent/20 rounded-full mb-4">
                 <Image src="https://placehold.co/80x80.png" alt="Pagos Seguros" width={80} height={80} className="rounded-full" data-ai-hint="escudo seguridad" />
              </div>
              <CardTitle className="text-2xl">Pagos Seguros</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Múltiples opciones de pago con seguridad robusta para tu tranquilidad.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
             <div className="p-4 bg-primary/20 rounded-full mb-4">
                <Image src="https://placehold.co/80x80.png" alt="Premios Emocionantes" width={80} height={80} className="rounded-full" data-ai-hint="caja regalo" />
              </div>
              <CardTitle className="text-2xl">Premios Emocionantes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Gana premios fantásticos de una amplia variedad de rifas actualizadas regularmente.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

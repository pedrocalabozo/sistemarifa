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
            Welcome to RifaFacil!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your ultimate destination for exciting online raffles. Participate easily, win amazing prizes, and enjoy a seamless experience.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/raffles">
                <Gift className="mr-2 h-5 w-5" /> View Active Raffles
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/rules">
                <Users className="mr-2 h-5 w-5" /> How to Participate
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose RifaFacil?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/20 rounded-full mb-4">
                <Image src="https://placehold.co/80x80.png" alt="Easy Participation" width={80} height={80} className="rounded-full" data-ai-hint="ticket icon" />
              </div>
              <CardTitle className="text-2xl">Easy to Participate</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Simple steps to join any raffle. Choose your numbers and pay securely.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-accent/20 rounded-full mb-4">
                 <Image src="https://placehold.co/80x80.png" alt="Secure Payments" width={80} height={80} className="rounded-full" data-ai-hint="security shield" />
              </div>
              <CardTitle className="text-2xl">Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Multiple payment options with robust security for your peace of mind.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
             <div className="p-4 bg-primary/20 rounded-full mb-4">
                <Image src="https://placehold.co/80x80.png" alt="Exciting Prizes" width={80} height={80} className="rounded-full" data-ai-hint="gift box" />
              </div>
              <CardTitle className="text-2xl">Exciting Prizes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Win fantastic prizes from a wide variety of raffles updated regularly.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

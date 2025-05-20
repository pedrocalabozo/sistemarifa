import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckSquare, LogIn, ShoppingCart, UserCheck, Award, ListOrdered } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold">Rules & How to Participate</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Follow these simple steps to join RifaFacil and win big!
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <ListOrdered className="mr-3 h-7 w-7 text-primary" />
            How to Participate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex items-start space-x-4">
            <LogIn className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">1. Log In or Register</h3>
              <p className="text-muted-foreground">
                Securely log in using your Google account. If it's your first time, you'll need to complete a short registration form with your name, last name, phone number, and ID (Cédula).
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckSquare className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">2. Choose a Raffle</h3>
              <p className="text-muted-foreground">
                Browse our list of active raffles. Each raffle shows the prize, ticket price, and draw date. Click "Participate" on the raffle you're interested in.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <ShoppingCart className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">3. Select Your Numbers</h3>
              <p className="text-muted-foreground">
                On the raffle page, decide how many numbers you want to buy. Our system will generate unique random numbers for you (up to 900 per raffle, depending on the specific raffle rules).
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <UserCheck className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">4. Make Payment</h3>
              <p className="text-muted-foreground">
                Choose one of our available payment methods: Pago Móvil, Cryptocurrency, or Zinli. Follow the instructions for your chosen method and complete the payment.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Award className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">5. Await Results</h3>
              <p className="text-muted-foreground">
                Once your payment is confirmed, your tickets are active! Keep an eye on the draw date. Winners will be announced on our "Winners" page and may be contacted directly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">General Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Participants must be 18 years or older.</li>
            <li>All user information must be accurate and verifiable.</li>
            <li>Tickets are non-refundable once purchased, except in cases of raffle cancellation by RifaFacil.</li>
            <li>Payments must be completed and confirmed before the raffle draw for tickets to be valid.</li>
            <li>RifaFacil reserves the right to modify raffle rules or cancel raffles if necessary, with prior notification to participants.</li>
            <li>Winners are selected randomly through a transparent process.</li>
            <li>Prizes must be claimed within the specified timeframe, otherwise they may be forfeited.</li>
            <li>By participating, you agree to our Terms of Service and Privacy Policy.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckSquare, LogIn, ShoppingCart, UserCheck, Award, ListOrdered } from "lucide-react";

export default function RulesPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold">Reglas y Cómo Participar</h1>
        <p className="text-lg text-muted-foreground mt-2">
          ¡Sigue estos simples pasos para unirte a RifaFacil y ganar a lo grande!
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <ListOrdered className="mr-3 h-7 w-7 text-primary" />
            Cómo Participar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg">
          <div className="flex items-start space-x-4">
            <LogIn className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">1. Inicia Sesión o Regístrate</h3>
              <p className="text-muted-foreground">
                Inicia sesión de forma segura con tu cuenta de Google. Si es tu primera vez, deberás completar un breve formulario de registro con tu nombre, apellido, número de teléfono e ID (Cédula).
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckSquare className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">2. Elige una Rifa</h3>
              <p className="text-muted-foreground">
                Explora nuestra lista de rifas activas. Cada rifa muestra el premio, el precio del boleto y la fecha del sorteo. Haz clic en "Participar" en la rifa que te interese.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <ShoppingCart className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">3. Selecciona Tus Números</h3>
              <p className="text-muted-foreground">
                En la página de la rifa, decide cuántos números quieres comprar. Nuestro sistema generará números aleatorios únicos para ti (hasta 900 por rifa, dependiendo de las reglas específicas de la rifa).
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <UserCheck className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">4. Realiza el Pago</h3>
              <p className="text-muted-foreground">
                Elige uno de nuestros métodos de pago disponibles: Pago Móvil, Criptomoneda o Zinli. Sigue las instrucciones para el método elegido y completa el pago.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Award className="h-8 w-8 text-accent mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold">5. Espera los Resultados</h3>
              <p className="text-muted-foreground">
                Una vez confirmado tu pago, ¡tus boletos están activos! Mantente atento a la fecha del sorteo. Los ganadores se anunciarán en nuestra página de "Ganadores" y podrían ser contactados directamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Reglas Generales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Los participantes deben ser mayores de 18 años.</li>
            <li>Toda la información del usuario debe ser precisa y verificable.</li>
            <li>Los boletos no son reembolsables una vez comprados, excepto en casos de cancelación de la rifa por parte de RifaFacil.</li>
            <li>Los pagos deben completarse y confirmarse antes del sorteo de la rifa para que los boletos sean válidos.</li>
            <li>RifaFacil se reserva el derecho de modificar las reglas de la rifa o cancelar rifas si es necesario, con notificación previa a los participantes.</li>
            <li>Los ganadores se seleccionan aleatoriamente a través de un proceso transparente.</li>
            <li>Los premios deben reclamarse dentro del plazo especificado, de lo contrario, pueden perderse.</li>
            <li>Al participar, aceptas nuestros Términos de Servicio y Política de Privacidad.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

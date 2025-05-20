'use client';

import { useEffect, useState } from 'react';
import { useAuth, type UserProfile as AuthUserProfile } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit3, Save, ListCollapse, ShieldCheck, Smartphone, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PurchasedTicket } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

// Extended UserProfile for form state
interface UserProfileFormData {
  name: string;
  lastName: string;
  phone: string;
  idNumber: string;
}

// Mock purchased tickets data
const mockUserActivity: PurchasedTicket[] = [
  {
    id: 'ticket1',
    raffleId: '1',
    raffleTitle: 'Grand Holiday Raffle',
    numbers: [101, 234, 567],
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    totalAmount: 30,
    paymentMethod: 'Pago Movil',
    status: 'paid',
  },
  {
    id: 'ticket2',
    raffleId: '2',
    raffleTitle: 'Tech Gadget Bundle',
    numbers: [45, 123, 300, 450, 488],
    purchaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    totalAmount: 25,
    paymentMethod: 'Cripto Moneda',
    status: 'pending',
  },
   {
    id: 'ticket3',
    raffleId: '4',
    raffleTitle: 'Home Makeover Package',
    numbers: [88, 721],
    purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalAmount: 30,
    paymentMethod: 'Zinli',
    status: 'paid', // Example of a past, paid ticket
  },
];

const PaymentIcon = ({ method }: { method: PurchasedTicket['paymentMethod'] }) => {
  if (method === 'Pago Movil') return <Smartphone className="h-5 w-5 text-blue-500" />;
  if (method === 'Cripto Moneda') return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 lucide lucide-bitcoin"><path d="M11.8 12.5H13.8C14.9 12.5 15.5 13.1 15.5 13.8C15.5 14.5 14.9 15.1 13.8 15.1H11.8V12.5Z"/><path d="M11.8 8.90002H13.5C14.6 8.90002 15.2 9.50002 15.2 10.2C15.2 10.9 14.6 11.5 13.5 11.5H11.8V8.90002Z"/><path d="M18.6 19.2C17.3 20.5 15.1 21.5 12.2 21.5C8.20001 21.5 5.30001 19.3 4.40001 16.6L3.90001 17.6L2.5 17.2L4.5 12.2L5 11.2L6.4 11.6L5.9 12.6C6.50001 14.5 8.40001 17.9 12.2 17.9C14.1 17.9 15.5 17.3 16.5 16.3L17 16.8V16.8L18.5 15.4L18 14.8C17.5 14.3 17.2 13.5 17.2 12.5L17.1 12.1C17.1 12.1 17.1 11.9 17.1 11.7C17.1 11.7 17.1 11.6 17.1 11.5C17.1 11.4 17.1 11.3 17.1 11.2C17.1 9.40002 17.1 7.40002 15.2 5.70002C14.7 5.20002 13.8 4.50002 12.2 4.50002C9.50001 4.50002 7.10001 7.20002 6.40001 9.30002L5.90001 8.30002L4.50001 8.70002L6.50001 13.8L7.00001 14.8L8.40001 14.4L7.90001 13.4C8.20001 12.3 8.70001 10.4 10.3 9.10002C10.6 8.80002 11.2 8.30002 12.2 8.30002C13.4 8.30002 13.8 8.90002 13.8 9.50002C13.8 10.1 13.4 10.6 12.9 10.8L12.7 10.9H10.3V12.5H12.7L12.9 12.6C13.4 12.8 13.8 13.3 13.8 13.9C13.8 14.5 13.4 15.1 12.2 15.1H10.3V16.7H12.2C14.9 16.7 16.6 15.2 16.6 13.2C16.6 13.1 16.6 13 16.6 12.9C16.6 12.9 16.6 12.9 16.6 12.9C16.6 12.9 16.6 12.9 16.6 12.9C16.6 12.8 16.6 12.7 16.6 12.6C16.6 12.6 16.6 12.6 16.6 12.5C16.6 11.5 16.1 10.5 15.3 9.80002L14.8 9.30002L16.2 7.90002L16.8 8.40002C17.8 9.50002 18.6 11.2 18.6 12.5C18.6 12.6 18.6 12.6 18.6 12.7C18.6 12.7 18.6 12.7 18.6 12.7C18.6 12.7 18.6 12.7 18.6 12.7C18.6 12.8 18.6 12.8 18.6 12.8C18.6 12.9 18.6 12.9 18.6 12.9C18.6 12.9 18.6 13 18.6 13C18.6 13 18.6 13 18.6 13C18.6 13 18.6 13 18.6 13C18.6 13.1 18.6 13.1 18.6 13.1C18.6 13.1 18.6 13.1 18.6 13.1C18.6 13.2 18.6 13.2 18.6 13.2C18.6 13.2 18.6 13.2 18.6 13.2C18.6 13.3 18.6 13.3 18.6 13.3C18.6 13.3 18.6 13.3 18.6 13.3C18.6 13.4 18.6 13.4 18.6 13.4C18.6 13.4 18.6 13.4 18.6 13.4C18.6 13.5 18.6 13.5 18.6 13.5C18.6 13.5 18.6 13.5 18.6 13.5C18.6 13.6 18.6 13.6 18.6 13.6C18.6 13.6 18.6 13.6 18.6 13.6C18.6 13.7 18.6 13.7 18.6 13.7C18.6 13.7 18.6 13.7 18.6 13.7C18.6 13.8 18.6 13.8 18.6 13.8C18.6 13.8 18.6 13.8 18.6 13.8C18.6 13.9 18.6 13.9 18.6 13.9C18.6 13.9 18.6 13.9 18.6 13.9C18.6 14 18.6 14 18.6 14L18.6 19.2Z"/></svg>;
  if (method === 'Zinli') return <TrendingUp className="h-5 w-5 text-purple-500" />;
  return <ShieldCheck className="h-5 w-5 text-gray-500" />;
};


export default function ProfilePage() {
  const { user, updateProfile, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<UserProfileFormData>({
    name: '', lastName: '', phone: '', idNumber: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userActivity] = useState<PurchasedTicket[]>(mockUserActivity); // Using mock data

  const defaultTab = searchParams.get('tab') || 'info';


  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        idNumber: user.idNumber,
      });
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast({ title: "Profile Updated", description: "Your information has been successfully updated." });
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <User className="h-10 w-10 mr-3 text-primary" />
          <h1 className="text-4xl font-bold">My Profile</h1>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        )}
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Personal Information</TabsTrigger>
          <TabsTrigger value="activity">My Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Account Details</CardTitle>
              <CardDescription>View and manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="idNumber">ID Number (Cédula)</Label>
                    <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} />
                  </div>
                  <div className="flex space-x-4">
                    <Button type="submit" size="lg">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setIsEditing(false); /* Reset form if needed */ }} size="lg">
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-lg">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Name:</strong> {user.name || 'Not set'}</p>
                  <p><strong>Last Name:</strong> {user.lastName || 'Not set'}</p>
                  <p><strong>Phone:</strong> {user.phone || 'Not set'}</p>
                  <p><strong>ID Number:</strong> {user.idNumber || 'Not set'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Raffle Activity</CardTitle>
              <CardDescription>View your history of purchased tickets and participation.</CardDescription>
            </CardHeader>
            <CardContent>
              {userActivity.length > 0 ? (
                <div className="space-y-6">
                  {userActivity.map(ticket => (
                    <Card key={ticket.id} className="bg-muted/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl flex justify-between items-center">
                          <span>{ticket.raffleTitle}</span>
                           <Link href={`/raffles/${ticket.raffleId}`}>
                            <Button variant="link" size="sm">View Raffle</Button>
                          </Link>
                        </CardTitle>
                         <CardDescription>
                          Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="flex items-center">
                          <ListCollapse className="h-5 w-5 mr-2 text-primary" /> 
                          Numbers: {ticket.numbers.join(', ')}
                        </p>
                        <p className="flex items-center">
                          <PaymentIcon method={ticket.paymentMethod} />
                          <span className="ml-2">Payment: ${ticket.totalAmount.toFixed(2)} via {ticket.paymentMethod}</span>
                        </p>
                        <p className="flex items-center">
                           <ShieldCheck className={`h-5 w-5 mr-2 ${ticket.status === 'paid' ? 'text-green-500' : ticket.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`} /> 
                           Status: <span className={`font-semibold ml-1 capitalize ${ticket.status === 'paid' ? 'text-green-600' : ticket.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>{ticket.status}</span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                 <div className="text-center py-10">
                    <Image src="https://placehold.co/200x150.png" alt="No activity" width={200} height={150} className="mx-auto mb-4 rounded-md" data-ai-hint="empty box illustration" />
                    <p className="text-muted-foreground text-xl">You haven't participated in any raffles yet.</p>
                    <Button asChild className="mt-4">
                      <Link href="/raffles">Explore Raffles</Link>
                    </Button>
                  </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}



export interface Iuser {
 id: number;
 firstName: string;
 lastName: string;
 imageUrl: string;
 email: string;
 phone: string;
 dateOfBirth: string;
 gender: string;
 bloodGroup: string;
 address: {
 street: string;
 city: string;
 state: string;
 pincode: string;
 };
 skills: string[];
}[]
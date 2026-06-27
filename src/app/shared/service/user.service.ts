import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iuser } from '../model/Iuser';
import { Ires } from '../model/Ires';
import { Iproduct } from '../model/Iproduct';

@Injectable({
  providedIn: 'root',
})
export class UserService {
usersArr: Iuser[] = [
  {
    id: 1,
    firstName: 'Ronak',
    lastName: 'Indrawar',
    imageUrl:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    email: 'ronak.indrawar@gmail.com',
    phone: '9876543210',
    dateOfBirth: '2001-04-15',
    gender: 'Male',
    bloodGroup: 'O+',
    address: {
      street: 'Shivaji Nagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    skills: ['Angular', 'TypeScript', 'HTML'],
  },
  {
    id: 2,
    firstName: 'Aman',
    lastName: 'Sharma',
    imageUrl:
      'https://imgs.search.brave.com/ydS-7XBkfpPwJPsNzjNLjIiYSub_DwpFWYgVidct98s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTUv/NDA5Lzk4OS9zbWFs/bC9lbGVnYW50LW1h/bi1pbi1idXNpbmVz/cy1zdWl0LXdpdGgt/YmFkZ2UtbWFuLWJ1/c2luZXNzLWF2YXRh/ci1wcm9maWxlLXBp/Y3R1cmUtaWxsdXN0/cmF0aW9uLWlzb2xh/dGVkLXZlY3Rvci5q/cGc',
    email: 'aman.sharma@gmail.com',
    phone: '9876501234',
    dateOfBirth: '1999-09-10',
    gender: 'Male',
    bloodGroup: 'A+',
    address: {
      street: 'MG Road',
      city: 'Nagpur',
      state: 'Maharashtra',
      pincode: '440001',
    },
    skills: ['Java', 'Spring Boot', 'MySQL'],
  },
  {
    id: 3,
    firstName: 'Priya',
    lastName: 'Patil',
    imageUrl:
      'https://imgs.search.brave.com/ydS-7XBkfpPwJPsNzjNLjIiYSub_DwpFWYgVidct98s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTUv/NDA5Lzk4OS9zbWFs/bC9lbGVnYW50LW1h/bi1pbi1idXNpbmVz/cy1zdWl0LXdpdGgt/YmFkZ2UtbWFuLWJ1/c2luZXNzLWF2YXRh/ci1wcm9maWxlLXBp/Y3R1cmUtaWxsdXN0/cmF0aW9uLWlzb2xh/dGVkLXZlY3Rvci5q/cGc',
    email: 'priya.patil@gmail.com',
    phone: '9876512345',
    dateOfBirth: '2000-12-22',
    gender: 'Female',
    bloodGroup: 'B+',
    address: {
      street: 'FC Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
    },
    skills: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: 4,
    firstName: 'Rahul',
    lastName: 'Verma',
    imageUrl:
      'https://imgs.search.brave.com/ydS-7XBkfpPwJPsNzjNLjIiYSub_DwpFWYgVidct98s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTUv/NDA5Lzk4OS9zbWFs/bC9lbGVnYW50LW1h/bi1pbi1idXNpbmVz/cy1zdWl0LXdpdGgt/YmFkZ2UtbWFuLWJ1/c2luZXNzLWF2YXRh/ci1wcm9maWxlLXBp/Y3R1cmUtaWxsdXN0/cmF0aW9uLWlzb2xh/dGVkLXZlY3Rvci5q/cGc',
    email: 'rahul.verma@gmail.com',
    phone: '9876523456',
    dateOfBirth: '1998-06-18',
    gender: 'Male',
    bloodGroup: 'AB+',
    address: {
      street: 'Civil Lines',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110054',
    },
    skills: ['Angular', 'Node.js', 'MongoDB'],
  },
];

  constructor() {}

  fetchAll() : Observable<Iuser[]>{
    return of(this.usersArr)
  }

  fetchUserById(id : number) : Observable<Iuser>{
    let userObj = this.usersArr.find(u => u.id === id)!;
    return of(userObj)

  }

  onCreateUser(userObj : Iuser) : Observable<Ires<Iuser>>{
    this.usersArr.unshift(userObj);
    return of({
      msg : `The user with id ${userObj.id} is added successfully..!`,
      data : userObj
    })
  }
  onUpdateUser(updatedObj : Iuser) : Observable<Ires<Iuser>>{
    let GETINDEX = this.usersArr.findIndex(u => u.id === updatedObj.id);
    this.usersArr[GETINDEX]=updatedObj;
    return of({
      msg : `The user with ${updatedObj.id} is updated successfully...!`,
      data : updatedObj
    })

  }

  onRemoveUser(userId : number) : Observable<Ires<Iuser>>{
    let GETINDEX = this.usersArr.findIndex(u => u.id === userId);
    let array = this.usersArr.splice(GETINDEX,1);
    return of({
      msg : `The product with id ${userId} is removed successfully...!`,
      data : array[0]
    })
  }
}

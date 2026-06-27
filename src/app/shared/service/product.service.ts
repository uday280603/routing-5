import { Injectable } from '@angular/core';
import { Iproduct } from '../model/Iproduct';
import { Observable, of } from 'rxjs';
import { Ires } from '../model/Ires';
import { UpperCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsArray: Iproduct[] = [
    {
      id: 1,
      name: 'Mobile',
      price: 20000,
      image:
        'https://th.bing.com/th/id/OIP._HzAbKiBvtNB0HLI1ZGgDgHaHa?w=127&h=150&c=6&o=7&dpr=1.5&pid=1.7&rm=3',
      description: 'Android smartphone',
    },
    {
      id: 2,
      name: 'Laptop',
      price: 55000,
      image: 'https://imgs.search.brave.com/sMFlGDRGRO6i0cwrYgy0yEBUYfFip7odcpjY-D4zA8A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2ODE1NjY5/MjUyNDYtY2M1ODRh/NDRkN2ZlP2ZtPWpw/ZyZxPTYwJnc9MzAw/MCZhdXRvPWZvcm1h/dCZmaXQ9Y3JvcCZp/eGxpYj1yYi00LjEu/MCZpeGlkPU0zd3hN/akEzZkRCOE1IeHpa/V0Z5WTJoOE5YeDha/R1ZzYkNVeU1HeGhj/SFJ2Y0h4bGJud3dm/SHd3Zkh4OE1BPT0',
      description: 'High performance laptop',
    },
  ];

  constructor() {}

  fetchAll(): Observable<Iproduct[]> {
    return of(this.productsArray);
  }
  fetchProductbyId(productId: number): Observable<Iproduct> {
    let productObj = this.productsArray.find((p) => p.id === productId)!;
    return of(productObj);
  }

  onCreateProduct(obj : Iproduct) : Observable<Ires<Iproduct>>{
    this.productsArray.unshift(obj);
    return of({
      msg : `The product with id ${obj.id} is added successfully...!`,
      data : obj
    })
  }

  onUpdateProduct(updatedObj : Iproduct) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArray.findIndex(p => p.id === updatedObj.id);
    this.productsArray[GETINDEX] = updatedObj;
    return of({
      msg : `The product with id ${updatedObj.id} is updated successfully..!`,
      data : updatedObj
    })


  }

    onRemove(id : number) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArray.findIndex(p => p.id === id);
    let array = this.productsArray.splice(GETINDEX,1);
    return of({
      msg : `Product with id ${id} is removed successfully..!`,
      data : array[0]
    })
  }
}

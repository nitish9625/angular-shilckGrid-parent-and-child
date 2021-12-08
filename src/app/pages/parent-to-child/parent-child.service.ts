import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ParentChildService {

  constructor(private http: HttpClient) { }

  async getFakeData(){
      let data = await this.http.get("https://reqres.in/api/users?page=2")
   .toPromise()
   .catch(err=>{
     console.log(err);
   })
  return data;
  }
  
}


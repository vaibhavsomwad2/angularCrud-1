import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Ipost } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrlPost:string = environment.baseUrl;
  constructor(private _http:HttpClient) { }

  getPost():Observable<Ipost[]>{
  let httpheaders = new HttpHeaders({
    'content-type' : 'application/json; charset=utf-8',
    'Authorization' : 'JWT Token qwerty'
  }) 
    return this._http.get<Ipost[]>(this.baseUrlPost,{
      headers:httpheaders
    })
  }
  deletePost(id:number):Observable<{}>{
    let deleteUrl = `${this.baseUrlPost}/${id}`
    return this._http.delete<{}>(deleteUrl)
  }
  createPost(post:Ipost):Observable<Ipost>{
  return this._http.post<Ipost>(this.baseUrlPost,post)
  }
  getSignalPost(id:number):Observable<Ipost>{
  let sigId = `${this.baseUrlPost}/${id}`;
  return this._http.get<Ipost>(sigId) 
  }
  UpdatePost(id:number, obj:Ipost):Observable<Ipost>{
    let upUrl = `${this.baseUrlPost}/${id}`
    return this._http.patch<Ipost>(upUrl,obj)
  }
}

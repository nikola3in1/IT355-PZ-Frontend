import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
interface myData{
  success:boolean,
  message:string
}

@Injectable({
  providedIn: 'root'
})



export class UploaderService {

  constructor(private http: HttpClient) { }
  
  upload(songName,genre,song,songWatermarked){
    const body={
      songName,
      genre,
      song,
      songWatermarked
    };

    return this.http.post<myData>('http://localhost/IT255-PZ-Backend/upload.php',body,{
      withCredentials:true
    })

  }
}

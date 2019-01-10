import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface songs {
  songs: [
    {
      "creator": "nikola",
      "name": "Rock you like a hurricane",
      "path": "",
      "likes": "12412",
      "upload-date": "2018-06-04",
      "liked": true
    }
  ]
}

interface song {
  "creator": "nikola",
  "name": "Rock you like a hurricane",
  "path": "",
  "likes": "12412",
  "upload-date": "2018-06-04",
  "liked": true,
  "about": "",
  "price": 13.2,
  "genre": "rock",
  "sales": 13,
  "duration": 123
}

interface like {
  'ip': '12321',
  'song': 'songName'
}
interface ip {
  ip: ''
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getGenreList(limit) {
    const body = {
      'limit': limit
    }
    return this.http.post<any>('http://localhost:3131/rest/content/genres', body);
  }

  search(query) {
    const body = {
      'query': query
    }
    return this.http.post<any>('http://localhost:3131/rest/content/search', body);
  }
  getTop5() {
    return this.http.get<songs>('http://localhost:3131/rest/content/getTop5',{withCredentials:true});
  }

  getByCreator(creator) {
    let params = new HttpParams();
    params = params.append("creator", creator);
    return this.http.get<songs>('http://localhost:3131/rest/content/songs', { params, withCredentials: true });
  }

  getByGenre(genre) {
    let params = new HttpParams();
    params = params.append("genre", genre);
    return this.http.get<songs>('http://localhost:3131/rest/content/songs', { params: params, withCredentials: true });
  }

  getSong(creator, name) {
    let params = new HttpParams();
    params = params.append("creator",creator);
    params = params.append("songName",name);
    // console.log(body, "service");
    return this.http.get<song>('http://localhost:3131/rest/content/song', { params: params,withCredentials: true });
  }

  likeSong(songName,creator) {
    const body = {
      'songName': songName,
      'creator':creator
    }
    return this.http.post<like>('http://localhost:3131/rest/user/like', body, { withCredentials: true });
  }

  getCreatorDetails(creator) {
    const body = {
      'creator': creator
    }
    return this.http.post<any>('http://localhost:3131/rest/content/profile', body, { withCredentials: true });
  }
  buy(songname, creator,paypalEmail) {
    const body = {
      'songName': songname,
      'creator': creator,
      'paypalEmail': paypalEmail
    }
    return this.http.post<any>('http://localhost:3131/rest/content/buy', body);
  }
}


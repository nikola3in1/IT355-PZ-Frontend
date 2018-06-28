import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  getIp() {
    return new Promise((resolve, reject) => {
      var path = 'http://ipv4.myexternalip.com/json';
      this.http.get(path).subscribe((data) => {
        resolve(data)
      });
    });
  }
  getGenreList(limit) {
    if (limit) {
      const body = {
        'limit': limit
      }
      return this.http.post<any>('http://localhost/IT255-PZ-Backend/getGenreList.php', body);
    }
    return this.http.get<any>('http://localhost/IT255-PZ-Backend/getGenreList.php');
  }

  search(query) {
    const body = {
      'query': query
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/search.php', body);
  }
  getTop5(ip) {
    const body = {
      'ip': ip
    }
    console.log(body, "we got ip2");
    return this.http.post<songs>('http://localhost/IT255-PZ-Backend/getTop5.php', body);
  }

  getByCreator(creator, ip) {
    const body = {
      'creator': creator,
      'ip': ip
    }
    return this.http.post<songs>('http://localhost/IT255-PZ-Backend/getSongs.php', body, { withCredentials: true });
  }

  getGenres() {
    return this.http.get<any>('http://localhost/IT255-PZ-Backend/getGenres.php', { withCredentials: true });
  }

  getByGenre(genre, ip) {
    const body = {
      'genre': genre,
      'ip': ip
    }
    console.log(body, "we got ip2");
    return this.http.post<songs>('http://localhost/IT255-PZ-Backend/getSongs.php', body, { withCredentials: true });
  }

  getSong(creator, name, ip) {
    const body = {
      'creator': creator,
      'songName': name,
      'ip': ip
    }
    console.log(body, "service");
    return this.http.post<song>('http://localhost/IT255-PZ-Backend/getSong.php', body, { withCredentials: true });
  }

  likeSong(songName, ip) {
    const body = {
      'songName': songName,
      'ip': ip
    }
    return this.http.post<like>('http://localhost/IT255-PZ-Backend/likeSong.php', body, { withCredentials: true });
  }

  getCreatorDetails(creator) {
    const body = {
      'creator': creator
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/getCreator.php', body);
  }
  buy(songname,creator){
    const body={
      'songname':songname,
      'creator':creator
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/buySong.php', body);
  }
}

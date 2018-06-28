import { Injectable } from '@angular/core';
import { AudioComponent } from './../_components/audio/audio.component';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public isPlaying:boolean = false;
  public currPlaying:AudioComponent;
  constructor() { }
}

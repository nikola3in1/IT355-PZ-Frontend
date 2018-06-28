import { Component, OnInit, Input, Output, AfterViewInit, ViewContainerRef, EventEmitter } from '@angular/core';
import { PlayerService } from '../../_services/player.service';
import { ContentService } from '../../_services/content.service';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

declare var WaveSurfer: any;

interface song {
  "creator": "nikola",
  "name": "Rock you like a hurricane",
  "path": "",
  "likes": "12412",
  "liked": true,
  "upload-date": "2018-06-04"
}
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, AfterViewInit {

  @Input() song: song;
  @Output() deleted = new EventEmitter<boolean>();

  isMine: boolean = false;
  isCreator: boolean = false;
  isAdmin: boolean=false;

  closeResult: string;

  form: FormGroup;
  form2: FormGroup;

  public isPlaying = false;
  public isLiked = false;

  public isLoaded = true;

  //temp vars
  public isReported=false;


  //Player controls and adjustments 
  public toggleCtrls = false;
  public floatRight = false;

  public wavesurfer;
  public id: string;
  public wlinGrad;
  public linGrad;

  public waveHeigth = 100;
  public waveGradHeigth = 200;

  public btnName = "Play" //Play or Pause

  public likeStyle = {
    'color': 'rgba(244, 67, 54, 0.7)'
  }

  constructor(private player: PlayerService, private auth: AuthService,
    private content: ContentService, private fb: FormBuilder,
    private _vcr: ViewContainerRef) {

    this.form = this.fb.group({
      confirmation: new FormControl("", Validators.required),
    });

    this.form2 = this.fb.group({
      reason: new FormControl("", Validators.required),
    });

    this.adjustCtrls();

    var ctx = document.createElement('canvas').getContext('2d');
    this.linGrad = ctx.createLinearGradient(0, 0, 0, this.waveGradHeigth);
    this.linGrad.addColorStop(0.5, 'rgba(51, 51, 51, 1.000)');
    this.linGrad.addColorStop(0.5, 'rgba(153, 153, 153, 1.000)');

    this.wlinGrad = ctx.createLinearGradient(0, 0, 0, this.waveGradHeigth);
    this.wlinGrad.addColorStop(0.5, 'rgba(255,98,50, 1.000)');
    this.wlinGrad.addColorStop(0.5, 'rgba(255,192,160, 1.000)');
  }


  ngOnInit() {
    if(this.auth.isLoggedIn){
      this.isCreator=true;
    }else if(this.auth.isAdmin){
      this.isAdmin=true;
      console.log('admin is logged');
    }

    if (this.auth.getUsername == this.song.creator) {
      this.isMine = true;
    }

    //Id playera
    this.id = this.song.name.replace(/\s/g, "").toLowerCase();
    if (this.song.liked == true)
      this.isLiked = true;
  }

  ngAfterViewInit() {
    try {
      this.wavesurfer = WaveSurfer.create({
        height: this.waveHeigth,
        cursorColor: 'rgba(255, 0, 0, 0.0)',
        barWidth: 2,
        container: document.querySelector("#" + this.id),
        progressColor: this.wlinGrad,
        reflection: false,
        waveColor: this.linGrad,
      });

      this.wavesurfer.load("http://localhost/IT255-PZ-Backend/" + this.song.path);

      this.wavesurfer.on('ready', () => {
        this.isLoaded = true;
      });

    } catch (e) {
      console.log(e, 'error');
    }
  }
  adjustCtrls() {
    if (window.screen.width >= 1900) {
      this.waveGradHeigth = 100;
    }

    if (window.screen.width <= 991) {
      this.toggleCtrls = true;
    }

    if (window.screen.width >= 768) {
      this.floatRight = true;
      console.log('toggle text');
    }
  }
  playOrPause() {
    //play pause

    if (typeof this.player.currPlaying !== 'undefined' && this.player.currPlaying != null && this.player.currPlaying != this) {
      this.player.currPlaying.stop();
      this.player.currPlaying.btnName = "Play";
      console.log('here');
    }

    this.wavesurfer.playPause();

    if (this.wavesurfer.isReady && !this.player.isPlaying) {
      this.player.currPlaying = this;
      this.player.isPlaying = true;
      this.btnName = "Pause";
      console.log('here2', this.player.isPlaying);

    } else {
      console.log('here3');

      this.btnName = "Play";
      this.player.isPlaying = false;
      this.player.currPlaying = null;
    }
  }

  stop() {
    this.wavesurfer.stop();
    this.isPlaying = false;
    this.player.isPlaying = false;
    this.btnName = "Play";
  }

  like() {
    this.isLiked = !this.isLiked;
    this.content.getIp()
      .then((data: any) => {
        this.content.likeSong(this.song.name, data.ip).subscribe(status => {
          console.log(status, "like song");
        });
      });
  }

  matchValidator(event) {
    console.log(this.form);
    console.log(event.target.value, this.song.name);
    if (event.target.value == this.song.name) {
      this.form.controls['confirmation'].setErrors(null);
    } else {
      this.form.controls['confirmation'].setErrors({ 'invalid': true });
    }
  }


  remove() {
    this.auth.deleteSong(this.song.name, this.song.creator).subscribe(data => {
      console.log(data, 'data from srv delete');
      if (data.success) {
        this.deleted.emit(true);
      }
    })
  }

  report(){
    const songname = this.song.name;
    const creator = this.song.creator; 
    const reason = this.form2.value['reason'];
    const reportedBy = this.auth.getUsername;
    this.auth.reportSong(reason,creator,songname,reportedBy).subscribe(data=>{
      console.log(data,'data from srv reported')
      if (data.success) {
        console.log(data,'reported')
        this.isReported=true;
      }
    })
  }
}

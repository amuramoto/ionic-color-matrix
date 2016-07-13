import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

	@ViewChild("photo") photo: ElementRef;

	private photoCanvas: any;
	private photoCtx: CanvasRenderingContext2D;
	private image;
	private showTable: Boolean;

  constructor(private navController: NavController) {
  	this.showTable = true;
  }

  ngAfterViewInit () {
  	this.drawImageToCanvas('./img/default.jpg');
  }

  private drawImageToCanvas (imageUri) {

  	this.photoCanvas = this.photo.nativeElement;
  	this.photoCtx = this.photoCanvas.getContext("2d");    		
  	this.image = new Image();

  	this.image.onload = () => {
 
  		let canvasWidth = window.innerWidth - 40;
  		let canvasHeight = (canvasWidth / this.image.width) * this.image.height - 40 ; //match canvas aspect ratio to original image
  	
  		this.photoCtx.canvas.width = canvasWidth;
  		this.photoCtx.canvas.height = canvasHeight;
  		
  		this.photoCtx.drawImage(this.image, 0, 0, this.image.width - 40, this.image.height - 40,
  												 0, 0, canvasWidth, canvasHeight);
  	
  	}

  	this.image.src=imageUri;

  }

  private getImageData() {

  }
}

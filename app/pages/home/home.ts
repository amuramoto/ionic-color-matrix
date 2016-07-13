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

  constructor(private navController: NavController) {

  }

  ngAfterViewInit () {
  	console.log('imageUri')
  	this.drawImageToCanvas('./img/default.jpg');
  }

  private drawImageToCanvas (imageUri) {

  	this.photoCanvas = this.photo.nativeElement;
  	this.photoCtx = this.photoCanvas.getContext("2d");    		
  	const image = new Image();

  	image.onload = () => {
 
  		let canvasWidth = window.innerWidth - 25;
  		let canvasHeight = (canvasWidth / image.width) * image.height - 25 ; //match canvas aspect ratio to original image
  	
  		this.photoCtx.canvas.width = canvasWidth;
  		this.photoCtx.canvas.height = canvasHeight;
  		
  		this.photoCtx.drawImage(image, 0, 0, image.width - 25, image.height - 25,
  												 0, 0, canvasWidth, canvasHeight);
  	
  	}

  	image.src=imageUri;
  	console.log('image.src')
  }
}

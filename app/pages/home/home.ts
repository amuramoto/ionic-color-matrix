import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

	@ViewChild("photo") photo: ElementRef;

	private photoCanvas: any;
	private photoCtx: CanvasRenderingContext2D;
private canvasCopy;
  private ctxCopy;
  private canvasWidth;
  private canvasHeight;
	private image;
	private imageData;
	private showTable: Boolean;
	private sliders: Array<Object>;
	private rows: Array<string>;
	private columns: Array<string>;
	private red: number;
	private green: number;
	private blue: number;
	private alpha: number;	
private brightness: number;
private test2: any;
private start;
  constructor(private navController: NavController) {
  	this.showTable = true;  	
  	this.red = this.green = this.blue = this.alpha = 100;  	
    this.brightness=0;
  }

  ionViewLoaded () {
  	this.photoCanvas = this.photo.nativeElement;
  	this.photoCtx = this.photoCanvas.getContext("2d");    		
   	
  	this.drawImage('./img/default.jpg');
    
  }
	

private redraw () {  
  if (!this.start || Date.now() - this.start > 50) {
    this.start = Date.now();
  let imageData = this.ctxCopy.getImageData(0,0,this.canvasWidth, this.canvasHeight);
  let d = imageData.data;
    
  for (var i = 0; i < d.length; i += 4) {
   
    d[i] *= this.red/100 + this.brightness/100

    d[i+1] *= this.green/100 + this.brightness/100;

    d[i+2] *= this.blue/100 + this.brightness/100;

    d[i+3] *= this.alpha/100 + this.brightness/100;
  
  }

  this.photoCtx.putImageData(imageData, 0, 0);
  }
}


private test = (timestamp) => {
  let imageData = this.ctxCopy.getImageData(0,0,this.canvasWidth, this.canvasHeight);
  let d = imageData.data;
    
  for (var i = 0; i < d.length; i += 4) {
   
    d[i] *= this.red/100 + this.brightness/100

    d[i+1] *= this.green/100 + this.brightness/100;

    d[i+2] *= this.blue/100 + this.brightness/100;

    d[i+3] *= this.alpha/100 + this.brightness/100;
  
  }

  this.photoCtx.putImageData(imageData, 0, 0);

  requestAnimationFrame(this.test)
}

private calcPixels (imageDataCopy) {
  
  
  this.photoCtx.putImageData(imageDataCopy, 0, 0);  
}

	private updateColor() {	
    this.redraw();


    
    
    


    
	}


  private drawImage (imageUri) {
  	
  	this.image = new Image();

  	this.image.onload = () => {
			
  		this.canvasWidth = window.innerWidth - 40;
  		this.canvasHeight = (this.canvasWidth / this.image.width) * this.image.height - 40 ; //match canvas aspect ratio to original image
  	
  		this.photoCtx.canvas.width = this.canvasWidth;
  		this.photoCtx.canvas.height = this.canvasHeight;
  		
  		this.photoCtx.drawImage(this.image, 0, 0, this.image.width - 40, this.image.height - 40,
  												 0, 0, this.canvasWidth, this.canvasHeight);

      this.canvasCopy = this.photoCanvas.cloneNode();
    this.ctxCopy = this.canvasCopy.getContext("2d");
    this.ctxCopy.drawImage(this.image, 0, 0, this.image.width - 40, this.image.height - 40,
                           0, 0, this.canvasWidth, this.canvasHeight)

  	}

  	this.image.src=imageUri;


    

  }

  private getImageData() {

  }

  private showGallery() {
  	Camera.getPicture({
    	destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,      
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    })
  	.then((file) => {    	
      this.drawImage(file);
    }, (err) => {
      console.log(err);
    });
  }
}

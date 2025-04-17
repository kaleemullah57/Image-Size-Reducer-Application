import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxImageCompressService, UploadResponse } from 'ngx-image-compress';


@Component({
  selector: 'app-image-compressor',
  imports: [CommonModule],
  templateUrl: './image-compressor.component.html',
  styleUrl: './image-compressor.component.css'
})
export class ImageCompressorComponent {

  originalImage: string = '';
  compressedImage: string = '';
  originalSize: number = 0;
  compressedSize: number = 0;

  constructor(private imageCompress: NgxImageCompressService) { }


  // Upload Image
  uploadImage(): void {
    this.imageCompress.uploadFile().then(({ image, orientation }: UploadResponse) => {
      this.originalImage = image;
      this.originalSize = this.imageCompress.byteCount(image) / 1024;

      // Reduce size, but keep quality at 100%
      this.imageCompress.compressFile(image, orientation, 90, 90).then(
        result => {
          this.compressedImage = result;
          this.compressedSize = this.imageCompress.byteCount(result) / 1024;


          // Apply brightness enhancement
          this.applyBrightness(result, 1.1).then(brightenedImage => {
            this.compressedImage = brightenedImage;
          });
        }
      );
    });
  }






  // Brightness Helper Function
  applyBrightness(base64: string, brightness = 1.1): Promise<string> {
    return new Promise(resolve => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.filter = `brightness(${brightness})`;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        resolve(canvas.toDataURL('image/jpeg', 1.0));
      };
    });
  }




  downloadImage(): void {
    const link = document.createElement('a');
    link.href = this.compressedImage;
    link.download = 'compressed-image.jpg';
    link.click();
  }

}

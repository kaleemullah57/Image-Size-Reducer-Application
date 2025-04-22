import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface DownloadOption {
  label: string;
  width: number;
  height: number;
  description: string;
}

@Component({
  selector: 'app-jpg-to-png',
  imports: [CommonModule, FormsModule],
  templateUrl: './jpg-to-png.component.html',
  styleUrl: './jpg-to-png.component.css'
})
export class JpgToPngComponent {

  originalImage: HTMLImageElement | null = null;
  selectedFileName: string = '';
  selectedOption: DownloadOption | null = null;



  downloadOptions: DownloadOption[] = [
    { label: 'Web (700x600)', width: 700, height: 600, description: 'Optimized for website usage' },
    { label: 'Profile (300x300)', width: 300, height: 300, description: 'Perfect for social media' },
    { label: 'High Quality (1720x1080)', width: 1720, height: 1080, description: 'Best for HD displays' },
    { label: 'A4 Printable (2480x3508)', width: 2480, height: 3508, description: 'Suitable for A4 printing' }
  ];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => this.originalImage = img;
    };
    reader.readAsDataURL(file);
  }





  downloadImage(option: DownloadOption | null) {
  if (!option || !this.originalImage) return;

  const canvas = document.createElement('canvas');
  canvas.width = option.width;
  canvas.height = option.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.drawImage(this.originalImage, 0, 0, option.width, option.height);

  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `converted-${option.label.replace(/\s|\(|\)/g, '')}.png`;
  link.click();
}

  private getBaseFileName(): string {
    return this.selectedFileName.split('.').slice(0, -1).join('.') || 'converted-image';
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {PDFDocument} from 'pdf-lib';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-pdf-compressor',
  imports: [CommonModule],
  templateUrl: './pdf-compressor.component.html',
  styleUrl: './pdf-compressor.component.css'
})
export class PdfCompressorComponent {
originalSize: number = 0;
  compressedSize: number = 0;

  async handleFileInput(event: any): Promise<void> {
    const file: File = event.target.files[0];
    if (!file || file.type !== 'application/pdf') return;

    this.originalSize = file.size / 1024;

    const arrayBuffer = await file.arrayBuffer();
    const existingPdf = await PDFDocument.load(arrayBuffer);

    // Rebuild a new PDF to minimize size
    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(existingPdf, existingPdf.getPageIndices());

    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    const compressedPdfBytes = await newPdf.save();
    this.compressedSize = compressedPdfBytes.byteLength / 1024;

    const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'compressed.pdf');
  }
}

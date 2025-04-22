import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCompressorComponent } from "./image-compressor/image-compressor.component";
import { PdfCompressorComponent } from "./pdf-compressor/pdf-compressor.component";
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { JpgToPngComponent } from "./jpg-to-png/jpg-to-png.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PdfCompressorComponent, CommonModule, FormsModule, ImageCompressorComponent, JpgToPngComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ImageSizeReducer';


  //  Select Drop Down 
  selectedFile : string = 'pdf'; // Default selected file type
}

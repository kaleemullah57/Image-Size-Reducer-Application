import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCompressorComponent } from "./image-compressor/image-compressor.component";
import { PdfCompressorComponent } from "./pdf-compressor/pdf-compressor.component";
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { JpgToPngComponent } from "./jpg-to-png/jpg-to-png.component";
import { ThemeService } from './ThemseServices/theme.service';


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



  // selectedBackgroundColor : string  = 'white';
  // fontColor : string = 'black';
  // selectBackgroundColor(){
  //   if(this.selectedBackgroundColor === 'white'){
  //     this.selectedBackgroundColor = 'white';
  //     this.fontColor = 'black';

  //   }else{
  //     this.selectedBackgroundColor = 'black';
  //     this.fontColor = 'white';
  //   }
  // }


  // isDarkMod : boolean = false;
  // selectedBackground : string = 'white';
  // selectedFont : string = 'black';
  // selectedBackgroundColor(){
  //   this.isDarkMod = !this.isDarkMod;
  //   this.selectedBackground = this.isDarkMod ? 'black' : 'white';
  //   this.selectedFont = this.isDarkMod ? 'white' : 'black';
  // }











  constructor(private _themseService:ThemeService){}
  isDarkMode = false;

  toggleThemse(){
    this.isDarkMode  = !this.isDarkMode;
    this._themseService.toggleDarkMode();
    console.log("butons pressed", this._themseService)
  }


}

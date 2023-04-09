import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiniETicaretClient';

  constructor(private toastrService: CustomToastrService) {
    // toastrService.message("<i>Mesaj</i>", "Başlık", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
  }
}

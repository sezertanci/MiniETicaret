import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService: ToastrService) { }

  message(message: string, title: string, option: Partial<ToastrOptions>) {

    if (option.messageType != undefined)
      this.toastrService[option.messageType](message, title, { positionClass: option.position, progressBar: true, closeButton: true, enableHtml: true, newestOnTop: true });
  }

  messageInfo(message: string) {
    this.toastrService[ToastrMessageType.Info](message, "Info", { positionClass: ToastrPosition.TopRight, progressBar: true, closeButton: true, enableHtml: true, newestOnTop: true });
  }

  // oneMessageInfo(message: string) {
  //   this.toastrService[ToastrMessageType.Info](message, "Info", { positionClass: ToastrPosition.TopRight, progressBar: true, closeButton: true, enableHtml: true, newestOnTop: true });
  // }

  success(message: string, title: string) {
    this.toastrService[ToastrMessageType.Success](message, title, { positionClass: ToastrPosition.TopRight, progressBar: true, closeButton: true, enableHtml: true, newestOnTop: true });
  }

  error(message: string, title: string) {
    this.toastrService[ToastrMessageType.Error](message, title, { positionClass: ToastrPosition.TopRight, progressBar: true, closeButton: true, enableHtml: true, newestOnTop: true });
  }
}

export class ToastrOptions {
  messageType: ToastrMessageType = ToastrMessageType.Info;
  position: ToastrPosition = ToastrPosition.TopRight;
}

export enum ToastrMessageType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Info = "info"
}

export enum ToastrPosition {
  TopLeft = "toast-top-left",
  TopCenter = "toast-top-center",
  TopRight = "toast-top-right",
  BottomLeft = "toast-bottom-left",
  BottomCenter = "toast-bottom-center",
  BottomRight = "toast-bottom-right",
  BottomFullWidth = "toast-bottom-full-width",
  TopFullWidth = "toast-top-full-width"
}
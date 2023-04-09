import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set("notifier", "position", options.position);

    if (options.messageType != undefined)
      alertify[options.messageType](message);
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  position: AlertifyPosition = AlertifyPosition.TopRight;
}

export enum AlertifyMessageType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Notify = "notify",
  Message = "message"
}

export enum AlertifyPosition {
  TopLeft = "top-left",
  TopCenter = "top-center",
  TopRight = "top-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right"
}
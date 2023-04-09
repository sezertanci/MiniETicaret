import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private dialog: MatDialog,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("style", "cursor:pointer;");

    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() controller: string;
  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  onclick() {
    this.openDialog(async () => {
      this.spinner.show();
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        this.spinner.hide();
        this.toastrService.success("Silme işlemi başarılı", "Silindi.");
        const td: HTMLTableCellElement = this.element.nativeElement;
        $(td.parentElement).fadeOut(1000, () => {
          this.callback.emit();
        });
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide();
        this.toastrService.error(errorResponse.message, "Silinemedi.");
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "400px",
      data: "Yes",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "Yes")
        afterClosed();
    });
  }
}

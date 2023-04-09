import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { CustomToastrService } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService, private dialogService: DialogService) { }

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData = new FormData();
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          formData.append(file.name, file, droppedFile.relativePath)

          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }

    this.dialogService.openDialog({
      componentType: FileUploadComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({
            "responseType": "blob"
          })
        }, formData).subscribe({
          next: () => this.toastrService.success("Dosyalar başaıyla yüklenmiştir.", "Başarılı"),
          error: () => this.toastrService.error("Dosyalar yüklenirken beklenmeyen bir hata oluştu.", "Hata"),
          complete: () => this.toastrService.messageInfo("İşlem tamamlandı.")
        });
      }
    });
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
}
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';

@NgModule({
    declarations: [
        DeleteDialogComponent,
        FileUploadDialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule, 
        MatButtonModule, 
        MatCardModule, 
        MatTableModule, 
        MatToolbarModule, 
        MatBadgeModule, 
        MatListModule, 
        MatFormFieldModule, 
        MatInputModule,
        FileUploadModule
    ]
})
export class DialogModule { }
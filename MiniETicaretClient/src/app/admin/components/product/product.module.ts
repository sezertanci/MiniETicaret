import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ListComponent } from './list/list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadComponent } from "../../../services/common/file-upload/file-upload.component";
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';



@NgModule({
    declarations: [
        ProductComponent,
        CreateComponent,
        ListComponent,
        DeleteDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "", component: ProductComponent }
        ]),
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        DialogModule,
        FileUploadModule
    ]
})
export class ProductModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { TelephoneList } from '../../models/TelephoneList';

import {
      MatDialog,
      MAT_DIALOG_DATA,
      MatDialogRef,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
} from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';





@Component({
  selector: 'app-element-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.scss'
})

export class ElementDialogComponent {
  element!: TelephoneList
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: TelephoneList,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}


  ngOnInit(): void{
    if(this.data.field_1984977 != null){
      this.isChange = true;
    } else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();

  }
}

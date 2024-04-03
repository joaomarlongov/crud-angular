import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTable, MatTableModule} from '@angular/material/table';
// import { DataSource } from '@angular/cdk/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ElementDialogComponent } from './shared/element-dialog/element-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';



export interface TelephoneList {
  position: number;
  name: string;
  number: string;
  action: string;
}

const ELEMENT_DATA: TelephoneList[] = [
  {position: 1, name: 'João', number: "27999798888", action: ''},
  {position: 2, name: 'Maria', number: "27999798888", action: ''},
  {position: 3, name: 'Fernanda', number: "27999798888", action: ''},
  {position: 4, name: 'Larissa', number: "27999798888", action: ''},
  {position: 5, name: 'Josué', number: "27999798888", action: ''},
  {position: 6, name: 'Lincoln', number:"27999798888", action: ''},
  
];



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
  HomeComponent,
  FooterComponent,
  MatToolbarModule,
  MatTableModule, 
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  ElementDialogComponent,
  MatFormFieldModule,
  FormsModule,
  MatInputModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent{
  title = 'crud-angular';
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['position', 'name', 'number', 'action'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog) {}

  openDialog(element: TelephoneList | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: "300px",
      data: element === null ? {
        position: null,
        name: "",
        number:"",
      }: {
        position: element.position,
        name: element.name,
        number: element.number,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.position).includes(result.position)){
          this.dataSource[result.position - 1] = result;
          this.table.renderRows();
        } else {
          this.dataSource.push(result);
          this.table.renderRows();
        }
      }
    });
  }

  deleteItem(position: number): void{
    this.dataSource = this.dataSource.filter(p => p.position !== position)
  }

  editItem(element: TelephoneList):void {
    this.openDialog(element);
  }

}

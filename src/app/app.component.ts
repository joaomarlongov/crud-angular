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
import { HttpClientModule } from '@angular/common/http';
import { TelephoneList } from './models/TelephoneList';
import { TelephoneListService } from './services/telephoneList.service';





// const ELEMENT_DATA: TelephoneList[] = [
//   {order: "1", field_1977253: 'João', field_1977254: "27999798888",},
//   {order: "2", field_1977253: 'Maria', field_1977254: "27999798888",},
//   {order: "3", field_1977253: 'Fernanda', field_1977254: "27999798888",},
//   {order: "4", field_1977253: 'Larissa', field_1977254: "27999798888",},
//   {order: "5", field_1977253: 'Josué', field_1977254: "27999798888",},
//   {order: `6`, field_1977253: 'Lincoln', field_1977254:"27999798888"},
// ];



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
  HttpClientModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TelephoneListService]
  
})
export class AppComponent{
  title = 'crud-angular';
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['name', 'number', "action"];
  dataSource!: TelephoneList[];
  
  constructor(
    public dialog: MatDialog,
    public telephoneListService: TelephoneListService
    ){
      this.telephoneListService.getTel()
      .subscribe((data: any) =>{
        console.log(data.results)
        this.dataSource = data.results ;
      })
      
      
      
    }

  openDialog(element: TelephoneList | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: "300px",
      data: element === null ? {
        id: null,
        name: "",
        number:"",
      }: {
        id: element.id,
        name: element.name,
        number: element.number,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result)
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.telephoneListService.editTel(result)
          .subscribe((data) => {
            const index = this.dataSource.findIndex(t => t.id == result.id)
            this.dataSource[index] = result
            this.table.renderRows();
          })
          // this.dataSource[result.id - 1] = result;
          // this.table.renderRows();
        } else {
          this.telephoneListService.createTel(result)
          .subscribe((data: TelephoneList) => {
            this.dataSource.push(data);
            this.table.renderRows();
          })
        }
      }
    });
  }

 
  deleteItem(id: number ): void{
    this.telephoneListService.deleteTel(id)
    .subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== id)
    })
  }




  

}

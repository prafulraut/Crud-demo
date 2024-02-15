import { Component, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AddUserComponent } from '../../dialogs/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from 'src/app/dialogs/delete-user/delete-user.component';
import { UserData } from 'src/app/interface/userData.interface';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'gender',
    'position',
    'action',
  ];
  
  dataSource: UserData[] = [];
  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(
    private apiService: ApiServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    try {
      this.apiService.getUser().subscribe((res: UserData[]) => {
        this.dataSource = res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  userData(data?: string, selected?: string) {
    try {
      const dialogRef = this.dialog.open(AddUserComponent, {
        minHeight: '400px',
        minWidth: '400px',
        data: { user: data, mode: selected },
      });

      dialogRef.afterClosed().subscribe((res: UserData) => {
        if (res) {
          this.dataSource.push(res);
          this.dataSource = this.dataSource;
        }
        this.table.renderRows();
        this.getUserData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteItem(id: number) {
    try {
      const dialogRef = this.dialog.open(DeleteUserComponent, {
        width: '300px',
        minWidth: '200px',
        data: id,
      });

      dialogRef.afterClosed().subscribe((deleteUser: number) => {
        if (deleteUser) {
          this.getUserData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

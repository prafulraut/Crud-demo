import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:number,
    public apiService: ApiServiceService,
   private snackBar:MatSnackBar
  ) {}

  onCloseDialog() {
    this.dialogRef.close();
  }
  
  confirmDelete() {
    const userId = this.data;
    this.apiService.deleteUser(userId).subscribe(
      () => {
        this.dialogRef.close(userId);    
        this.snackBar.open('User deleted successfully', 'Dismiss', {
          duration: 1000,
          verticalPosition: 'top', 
          panelClass: 'success-snackbar' 
        });
      }
    );
  }
  
}

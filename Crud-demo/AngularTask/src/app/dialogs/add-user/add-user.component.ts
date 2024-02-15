import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserData } from 'src/app/interface/userData.interface';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  form = this.formBuilder.group({
    name: new FormControl('', [Validators.required, this.spaceValidator()]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    gender: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  });
  
  type: string | undefined = '';
  formSubmitted!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private apiService: ApiServiceService
  ) {}
  ngOnInit() {
    this.type = this.data.mode;
    if (this.type == 'edit') {
      this.form.patchValue({
        email: this.data.user.email,
        phone: this.data.user.phone,
        position: this.data.user.position,
        name: this.data.user.name,
        gender: this.data.user.gender,
      });
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.invalid) {
      this.formSubmitted = true;
    } else if (this.form.valid) {
      this.formSubmitted = false;

      if (this.type == 'add') {
        const userData = this.form.value as UserData;
        this.apiService.saveUser(userData).subscribe((saveRes: UserData[]) => {
          this.dialogRef.close(saveRes);
        });
      } else if (this.type == 'edit') {
        const userId = this.data.user.id;
        const updatedUserData = this.form.value as UserData;
        this.apiService
          .updateItem(userId, updatedUserData)
          .subscribe((saveRes: UserData) => {
            this.dialogRef.close(saveRes.mode);
          });
      }
    }
  }

  spaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && (control.value as string).trim() !== control.value) {
        return { noLeadingTrailingSpaces: true };
      }
      return null;
    };
  }
}

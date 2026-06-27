import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/Iuser';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}
  userForm!: FormGroup;
  isInEditMode: boolean = false;
  userId!: number;
  userObj!: Iuser;

  ngOnInit(): void {
    this.onCreateForm();
    this.onAddSkill();
    this.onPatchData();
  }
  onCreateForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      bloodGroup: new FormControl(null, [Validators.required]),

      address: new FormGroup({
        street: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        pincode: new FormControl(null, [Validators.required]),
      }),

      skills: new FormArray([]),
    });
  }
  get skillArray() {
    return this.userForm.get('skills') as FormArray;
  }

  onAddSkill() {
    if (this.skillArray.length < 3) {
      let newSkill = new FormControl(null, [Validators.required]);
      this.skillArray.push(newSkill);
    }
  }

  onAddUser() {
    console.log(this.userForm);

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      let NEW_OBJ: Iuser = {
        ...this.userForm.value,
        id: Date.now(),
      };
      this._userService.onCreateUser(NEW_OBJ).subscribe({
        next: (data) => {
          console.log(this.userForm);
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['users']);
        },
      });
    }
  }

  onRemove(i : number){
    this.skillArray.removeAt(i)
  }
  onPatchData() {
    this.userId = +this._activatedRoute.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.isInEditMode = true;
      this._userService.fetchUserById(this.userId).subscribe({
        next: (data) => {
          this.userObj = data;
          this.skillArray.clear();
          this.userObj.skills.forEach((s) => {
            let control = new FormControl(s, [Validators.required]);
            this.skillArray.push(control);
          });
          this.userForm.patchValue(data);
        },
      });
    }
  }

  onUpdate(){
     if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      let UPDATED_USER: Iuser = {
        ...this.userForm.value,
        id:this.userId,
      };
      this._userService.onUpdateUser(UPDATED_USER).subscribe({
        next: (data) => {
          console.log(this.userForm);
          this._snackbar.opensnackbar(data.msg);
          this._router.navigate(['users']);
        },
      });
    }

  }
}

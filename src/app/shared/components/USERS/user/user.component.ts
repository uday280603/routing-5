import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/Iuser';
import { UserService } from 'src/app/shared/service/user.service';
import { GetConfirmComponent } from '../../NAVBAR/get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId!: number;
  userObj!: Iuser;

  constructor(
    private _activated: ActivatedRoute,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _sanckbar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserObj();
  }

  getUserObj() {
    // this.userId = +this._activated.snapshot.paramMap.get('id')!;
    // if (this.userId) {
    //   this._userService.fetchUserById(this.userId).subscribe({
    //     next: (data) => {
    //       this.userObj = data;
    //     },
    //   });
    // }
    this._activated.paramMap.subscribe((parms) => {
      this.userId = +parms.get('id')!;
      this._userService.fetchUserById(this.userId).subscribe({
        next: (data) => {
          this.userObj = data;
        },
      });
    });
  }

  onRemoveUser() {
    let config = new MatDialogConfig();
    config.width = '400px';
    config.disableClose = true;
    config.data = `Are you sure to remove the data with id ${this.userId}...?`;
    let _matref = this._matDialog.open(GetConfirmComponent, config);
    _matref.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this._userService.onRemoveUser(this.userId).subscribe({
          next: (data) => {
            this._sanckbar.opensnackbar(data.msg);
            this._router.navigate(['users']);
          },
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/shared/model/Iuser';
import { UserService } from 'src/app/shared/service/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  getAllUsers!: Iuser[];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._userService.fetchAll().subscribe({
      next: (data) => {
        this.getAllUsers = data;
      },
    });
  }
}

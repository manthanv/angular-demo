import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../model';

@Component({
  selector: 'app-user-details',
  imports: [RouterModule, CommonModule],
  providers: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  userDetails: User | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.userDetails = (nav?.extras.state ?? history.state?.userData) as User;
  }
}

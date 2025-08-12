import { Component, OnInit } from '@angular/core';
import { ActiveTableCell, FieldType, User } from '../model';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AutoFocusDirective } from '../auto-focus.directive';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AutoFocusDirective],
  providers: [UserService],
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  isLoading: boolean = false;
  userListTableForm!: FormGroup;
  activeTableCell: ActiveTableCell | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userListTableForm = this.fb.group({
      rows: this.fb.array([]),
    });
    this.loadUserDetails();
  }

  private createRow(row: User): FormGroup {
    const { bio, id, language, name, version } = row;
    return this.fb.group({
      bio: [bio],
      id: [id],
      language: [language],
      name: [name],
      version: [version],
    });
  }

  private setDataToTableForm(data: User[]): void {
    data.forEach((user: User) => {
      this.rows.push(this.createRow(user));
    });
  }

  get rows(): FormArray {
    return this.userListTableForm.get('rows') as FormArray;
  }

  loadUserDetails(): void {
    this.isLoading = true;
    this.userService.getUserList().subscribe({
      next: (data: User[]) => {
        if (data?.length) {
          this.setDataToTableForm(data);
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onCellClick(rowIndex: number, field: FieldType) {
    this.activeTableCell = {
      rowIndex,
      field,
    };
  }

  onInputBlur() {
    if (this.activeTableCell) {
      this.activeTableCell = null;
    }
  }

  isEditingCell(rowIndex: number, field: FieldType): boolean {
    if (!this.activeTableCell) {
      return false;
    }
    return (
      this.activeTableCell?.rowIndex === rowIndex &&
      this.activeTableCell?.field === field
    );
  }

  onNavigateView(rowIndex: number) {
    const selectedUserData = this.rows.at(rowIndex).value;
    this.route.navigate(['user-details'], {
      state: {
        userData: selectedUserData,
      },
    });
  }
}

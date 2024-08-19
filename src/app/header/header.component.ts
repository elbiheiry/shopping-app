import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../services/auth.service';
import { Subject, Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit , OnDestroy{
  isAuthenticated: boolean = false;
  private userSub!: Subscription;

  constructor (private dataStorageService: DataStorageService , private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe();
  }

  onSaveData () {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}

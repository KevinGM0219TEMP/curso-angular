import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataServiceService } from '@shared/services/data-service.service';
import { MessageService } from '@shared/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit,OnDestroy{





  constructor(){}

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
}

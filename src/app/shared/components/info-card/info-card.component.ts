import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input() title = "";
  @Input() info = "";
  @Input() items: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

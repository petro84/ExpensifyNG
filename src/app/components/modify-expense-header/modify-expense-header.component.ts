import { Component, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import {DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modify-expense-header',
  imports: [ButtonModule],
  templateUrl: './modify-expense-header.component.html',
  styleUrl: './modify-expense-header.component.css'
})
export class ModifyExpenseHeaderComponent implements OnInit {
  configData: any;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.configData = this.config;
  }

  close() {
    this.ref.close();
  }
}

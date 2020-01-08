import { Component, OnInit } from '@angular/core';
import { ReceivingSheet } from 'src/app/domain/Receivingsheet';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReceivingSheetService } from 'src/app/services/Receivingsheet.service';

@Component({
  selector: 'mot-receivingsheet-view',
  templateUrl: './receivingsheet-view.component.html',
  styleUrls: ['./receivingsheet-view.component.scss']
})
export class ReceivingSheetViewComponent implements OnInit {

  model: ReceivingSheet = null;
  id: number = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ReceivingSheetService
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        const id = +params['id'];
        if (this.id !== id && id) {
          this.service.getById(id).subscribe({ next: model => (this.model = model) });
          this.id = id;
        }
      }
    });
  }

  selectModel(selectedModel: ReceivingSheet, toEdit = false): void {

    if (toEdit) {
      this.router.navigate(['/receivingsheet', 'edit', selectedModel.id]);
    } else {
      this.router.navigate(['/receivingsheet', selectedModel.id]);
    }
  }

  onCancelEdit(): void {
    this.router.navigate(['/receivingsheet']);
  }
}

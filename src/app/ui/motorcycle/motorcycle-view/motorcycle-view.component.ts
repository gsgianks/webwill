import { Component, OnInit } from '@angular/core';
import { Motorcycle } from 'src/app/domain/Motorcycle';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MotorcycleService } from 'src/app/services/motorcycle.service';

@Component({
  selector: 'mot-motorcycle-view',
  templateUrl: './motorcycle-view.component.html',
  styleUrls: ['./motorcycle-view.component.scss']
})
export class MotorcycleViewComponent implements OnInit {

  model: Motorcycle = null;
  id: number = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: MotorcycleService
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

  selectModel(selectedModel: Motorcycle, toEdit = false): void {

    if (toEdit) {
      this.router.navigate(['/motorcycle', 'edit', selectedModel.id]);
    } else {
      this.router.navigate(['/motorcycle', selectedModel.id]);
    }
  }

  onCancelEdit(): void {
    this.router.navigate(['/motorcycle']);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Motorcycle } from 'src/app/domain/Motorcycle';
import { MotorcycleService } from 'src/app/services/motorcycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mot-motorcycle-list-user',
  templateUrl: './motorcycle-list-user.component.html',
  styleUrls: ['./motorcycle-list-user.component.scss']
})
export class MotorcycleListUserComponent implements OnInit {

  motorcycles: Motorcycle[] = [];
  numberOfRecords = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 10;
  pageIndex = 0;

  @Input() idUser = 0;

  constructor(
    private service: MotorcycleService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getAll(1);
  }

  getAll(page: number): void {
    this.service.getPaginated(page, this.pageSize, this.idUser)
    .subscribe(
      response => {
        this.motorcycles = response;
      }
    );
  }

  search(): void {
    this.getAll(1);
  }

  changePage(event: any): void {
    this.getAll(1);
  }

  edit(id: number) {
    // console.log(data);
    this.router.navigate(['/motorcycle', 'edit', id, 1, this.idUser]);

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ReceivingSheet } from 'src/app/domain/ReceivingSheet';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ReceivingSheetService } from 'src/app/services/receivingsheet.service';
import { FormUtils } from '../../shared/formUtils';
import { takeUntil } from 'rxjs/operators';
import * as alertify from 'alertifyjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/domain/User';
import { MotorcycleService } from 'src/app/services/motorcycle.service';
import { Motorcycle } from 'src/app/domain/Motorcycle';

const FIELD_REQUIRED = 'Campo Requerido.';
const FIELDMA_MAXLEN_2 = 'Minimo 2 digitos.';
const FIELD_MAXLEN_10 = 'Máximo 10 digitos.';
const FIELD_EMAIL = 'Email no válido.';

@Component({
  selector: 'mot-receivingsheet-edit',
  templateUrl: './receivingsheet-edit.component.html',
  styleUrls: ['./receivingsheet-edit.component.scss']
})
export class ReceivingSheetEditComponent implements OnInit {

  form: FormGroup;
  model: ReceivingSheet = null;
  user: User[] = [];
  motorcycle: Motorcycle[] = [];
  updating = false;

  private ngUnsubscribe: Subject<boolean> = new Subject();

  messages: any = {};
  formMessages: any = {
    idUsuario: {
      required: FIELD_REQUIRED
    },
    idMotocicleta: {
      required: FIELD_REQUIRED
    },
    trabajoRealizar: {
      required: FIELD_REQUIRED,
      email: FIELD_EMAIL
    },
    observaciones: {
      required: FIELD_REQUIRED
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ReceivingSheetService,
    private serviceUser: UserService,
    private serviceMotocycle: MotorcycleService,
    private fb: FormBuilder,
  ) { }

  createForm(): void {
    this.form = this.fb.group({
      id: [''],
      idUsuario: ['', [Validators.required]],
      idMotocicleta: ['', [Validators.required]],
      trabajoRealizar: ['', [Validators.required]],
      observaciones: [''],
      fechaSalida: [''],
    });

    const fieldsToWatch = [
      'idUsuario',
      'idMotocicleta',
      'trabajoRealizar',
      'observaciones'
    ];
    fieldsToWatch.forEach(x => this.addFieldWatch(this.form.get(x), this.messages, this.formMessages, x));

    if (this.model) {
      FormUtils.toFormGroup(this.form, this.model);
    }
  }

  addFieldWatch(ctrl: AbstractControl, errorMessages: any, defaultMessages: any, name: string): void {
    ctrl.valueChanges
      // the operator takeUntil will keep alive the subscription until the Subject tells
      // them to complete (see ngOnDestroy below)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.setMessage(ctrl, errorMessages, defaultMessages, name));
  }

  setMessage(ctrl: AbstractControl, errorMessages: any, defaultMessages: any, name: string): void {
    errorMessages[name] = '';
    if ((ctrl.touched || ctrl.dirty) && ctrl.errors) {
      errorMessages[name] = Object.keys(ctrl.errors)
        .map(key => defaultMessages[name][key])
        .join(' ');
    }
  }

  ngOnInit() {

    this.createForm();

    const id = +this.route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getById(id).subscribe({
        next: model => {
          this.model = model;
          FormUtils.toFormGroup(this.form, this.model);
        }
      });
      this.updating = true;
    } else {
      this.model = {
        id: 0
      } as ReceivingSheet;
      FormUtils.toFormGroup(this.form, this.model);
    }

    // Obtener todos los usuarios
    this.getUsers();

    // Obtener todos las motocicletas
    this.getMotorcycles();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // trigger the next and complete on the Subject observable to signal to the
    // running subscriptions to complete as well
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submit() {

    if (!this.form.valid) {
      alertify.error('Formulario invalido');
    } else {
      FormUtils.toModel(this.form, this.model);
      this.saveModel();
    }
    return false;
  }

  saveModel(): void {
    if (this.model.id) {
      this.service
        .update(this.model)
        .subscribe({ next: this.showSuccess.bind(this), error: this.showError.bind(this) });
    } else {
      this.service
        .insert(this.model)
        .subscribe({ next: this.showSuccess.bind(this), error: this.showError.bind(this) });
    }
  }

  showSuccess(response: ReceivingSheet): void {
    alertify.success('Registro guardado exitosamente.');
    this.model = response;
    this.form.controls.id.setValue(this.model.id);
    this.updating = true;
    // FormUtils.toFormGroup(this.form, this.model);
    // console.log(response);
  }

  showError(error: any): void {
    const msg: string = (error && error.error && error.error.error && error.error.error.message) || error.message;
    alertify.error(msg);
  }

  return(): void {
    this.router.navigate(['./receivingsheet']);
  }

  delete(id: number): void {
    const rout = this.router;
    const serv = this.service;
    const showErro = this.showError;

    alertify.confirm('¿Desea eliminar el registro?',
    // tslint:disable-next-line: only-arrow-functions
    function() {
      serv.delete(id)
      .subscribe({
        next() {
          alertify.success('Registro eliminado exitosamente.');
          rout.navigate(['./receivingsheet']);
        },
        error: showErro.bind(this)
      });
    },
    // tslint:disable-next-line: only-arrow-functions
    function() {
      // alertify.error('Cancel');
    });
  }

  getUsers(): void {
    this.serviceUser.getAll(1, 200)
    .subscribe(
      response => {
        this.user = response;
      }
    );
  }

  getMotorcycles(): void {
    this.serviceMotocycle.getAll()
    .subscribe(
      response => {
        this.motorcycle = response;
      }
    );
  }

  trackByFn(index: number, model: {Id: number}) {
    return model ? model.Id : undefined;
  }

}

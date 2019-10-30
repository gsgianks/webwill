import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Motorcycle } from 'src/app/domain/Motorcycle';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MotorcycleService } from 'src/app/services/motorcycle.service';
import { takeUntil } from 'rxjs/operators';
import { FormUtils } from '../../shared/formUtils';
import * as alertify from 'alertifyjs';

const FIELD_REQUIRED = 'Campo Requerido.';
const FIELDMA_MAXLEN_2 = 'Minimo 2 digitos.';
const FIELD_MAXLEN_10 = 'Máximo 10 digitos.';
const FIELD_EMAIL = 'Email no válido.';

@Component({
  selector: 'mot-motorcycle-edit',
  templateUrl: './motorcycle-edit.component.html',
  styleUrls: ['./motorcycle-edit.component.scss']
})
export class MotorcycleEditComponent implements OnInit {

  form: FormGroup;
  model: Motorcycle = null;
  updating = false;

  private ngUnsubscribe: Subject<boolean> = new Subject();

  messages: any = {};

  formMessages: any = {
    nombre: {
      required: FIELD_REQUIRED
    },
    apellidos: {
      required: FIELD_REQUIRED
    },
    cedula: {
      required: FIELD_REQUIRED
    },
    correoElectronico: {
      required: FIELD_REQUIRED,
      email: FIELD_EMAIL
    },
    direccion: {
      required: FIELD_REQUIRED
    },
    telefonoCelular: {
      required: FIELD_REQUIRED,
      maxLength: FIELD_MAXLEN_10
    },
    telefono: {
      required: FIELD_REQUIRED,
      maxLength: FIELD_MAXLEN_10
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: MotorcycleService,
    private fb: FormBuilder,
  ) { }

  createForm(): void {
    this.form = this.fb.group({
      iD: [''],
      numeroPlaca: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      serieMarco: ['', [Validators.required]],
      serieMotor: ['', [Validators.required]],
      anotaciones: [''],
      idUsuario: ['', [Validators.required]]
    });

    const fieldsToWatch = [
      'numeroPlaca',
      'marca',
      'modelo',
      'ano',
      'serieMarco',
      'serieMotor',
      'anotaciones',
      'idUsuario'
    ];
    fieldsToWatch.forEach(x => this.addFieldWatch(this.form.get(x), this.messages, this.formMessages, x));

    if (this.model) {
      FormUtils.toFormGroup(this.form, this.model);
    }
  }

  addFieldWatch(ctrl: AbstractControl, errorMessages: any, defaultMessages: any, name: string): void {
    ctrl.valueChanges
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
      } as Motorcycle;
      FormUtils.toFormGroup(this.form, this.model);
    }
  }

  ngOnDestroy() {
    // trigger the next and complete on the Subject observable to signal to the
    // running subscriptions to complete as well
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submit() {

    if (!this.form.valid) {
      alertify.success('Formulario invalido');
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

  showSuccess(response: Motorcycle): void {
    alertify.success('Registro guardado exitosamente.');
    this.model = response;
    this.form.controls['id'].setValue(this.model.id);
    this.updating = true;
    // FormUtils.toFormGroup(this.form, this.model);
    // console.log(response);
  }

  showError(error: any): void {
    const msg: string = (error && error.error && error.error.error && error.error.error.message) || error.message;
    alertify.error(msg);
  }

  goToList(): void {
    this.router.navigate(['./motorcycle']);
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
          rout.navigate(['./motorcycle']);
        },
        error: showErro.bind(this)
      });
    },
    // tslint:disable-next-line: only-arrow-functions
    function() {
      // alertify.error('Cancel');
    });
  }

}

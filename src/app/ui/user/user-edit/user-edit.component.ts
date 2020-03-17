import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/domain/User';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { FormUtils } from '../../shared/formUtils';
import * as alertify from 'alertifyjs';
import { ConfirmationDialogService } from '../../shared/confirmation-dialog/confirmation-dialog.service';

const FIELD_REQUIRED = 'Campo Requerido.';
const FIELDMA_MAXLEN_2 = 'Minimo 2 digitos.';
const FIELD_MAXLEN_10 = 'Máximo 10 digitos.';
const FIELD_EMAIL = 'Email no válido.';


@Component({
  selector: 'mot-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  form: FormGroup;
  model: User = null;
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
    private service: UserService,
    private fb: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  createForm(): void {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefonoCelular: ['', [Validators.required, Validators.maxLength(10)]],
      telefono: ['', [Validators.maxLength(10)]]
    });

    const fieldsToWatch = [
      'nombre',
      'apellidos',
      'identificacion',
      'correoElectronico',
      'direccion',
      'telefonoCelular',
      'telefono'
    ];
    fieldsToWatch.forEach(x => this.addFieldWatch(this.form.get(x), this.messages, this.formMessages, x));
    console.log(this.messages);
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
      this.service.getById(id).subscribe( res => {
        if (res.code === 0) {
          this.model = res.items[0];
          FormUtils.toFormGroup(this.form, this.model);
        } else {
          alertify.error(res.description);
        }
      });
      this.updating = true;
    } else {
      this.model = {
        id: 0
      } as User;
      FormUtils.toFormGroup(this.form, this.model);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submit() {

    if (!this.form.valid) {
      alertify.error('Formulario inválido');
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
        .subscribe(res => {
          if (res.code === 0) {
            alertify.success(res.description);
          } else {
            alertify.error(res.description);
          }
        });
    } else {
      this.service
        .insert(this.model)
        .subscribe(res => {
          if (res.code === 0) {
            this.form.controls.id.setValue(res.items[0].id);
            this.model = res.items[0];
            this.updating = true;
            alertify.success(res.description);
          } else {
            alertify.error(res.description);
          }
        });
    }
  }

  goToList(): void {
    this.router.navigate(['./user']);
  }

  delete(id: number): void {

    this.confirmationDialogService.confirm('Confirmación', '¿Desea eliminar el registro?')
    .then((confirmed) => {
      if (confirmed) {
        this.service.delete(id)
          .subscribe(response => {
            if (response.code === 0) {
              alertify.success(response.description);
              this.goToList();
            } else {
              alertify.error(response.description);
            }
          });
      }
    })
    .catch(() => {});
  }

}

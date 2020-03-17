import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Motorcycle } from 'src/app/domain/Motorcycle';
import { User } from 'src/app/domain/User';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MotorcycleService } from 'src/app/services/motorcycle.service';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { FormUtils } from '../../shared/formUtils';
import * as alertify from 'alertifyjs';
import { HttpEventType, HttpClient } from '@angular/common/http';

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
  user: User[] = [];
  origen = 0;
  idUsuario = 0;

  /*file begin */
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  public progress: number;
  public message: string;
 
fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();

    let fileToUpload = <File>fileInput.target.files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.service.upload(formData).subscribe(
      response => {
        if(response.code == 0){
          this.model.imagenPerfil = response.description;
        }else{
          alertify.error(response.description);
        }
      }
    );
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}

   /*file end */

  private ngUnsubscribe: Subject<boolean> = new Subject();

  messages: any = {};

  formMessages: any = {
    numeroPlaca: {
      required: FIELD_REQUIRED
    },
    marca: {
      required: FIELD_REQUIRED
    },
    modelo: {
      required: FIELD_REQUIRED
    },
    ano: {
      required: FIELD_REQUIRED,
      email: FIELD_EMAIL
    },
    serieMarco: {
      required: FIELD_REQUIRED
    },
    serieMotor: {
      required: FIELD_REQUIRED,
      maxLength: FIELD_MAXLEN_10
    },
    anotaciones: {
      required: FIELD_REQUIRED,
      maxLength: FIELD_MAXLEN_10
    },
    idUsuario: {
      required: FIELD_REQUIRED,
    }
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: MotorcycleService,
    private serviceUser: UserService,
    private fb: FormBuilder
  ) { }

  createForm(): void {
    this.form = this.fb.group({
      id: [''],
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
    this.origen = +this.route.snapshot.paramMap.get('origen');
    this.idUsuario = +this.route.snapshot.paramMap.get('idUsuario');

    if (id) {
      this.service.getById(id).subscribe({
        next: model => {
          this.model = model;
          this.previewUrl = model.imagenPerfil;
          this.uploadedFilePath = model.imagenPerfil;
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

    //Obtener todos los usuarios
    this.getUsers();
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

  return(): void {
    if(this.origen != 0 && this.idUsuario != 0)
    {
      this.router.navigate(['/user', 'edit', this.idUsuario]);
    }
    else
    {
      this.router.navigate(['./motorcycle']);
    }
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
    }).set({title:"Eliminar"}).set({labels:{ok:'Aceptar', cancel: 'Cancelar'}});
  }

  getUsers(): void {
    this.serviceUser.getAll()
    .subscribe(
      response => {
        this.user = response.items;
      }
    );
  }

  trackByFn(index: number, model: {Id: number}) {
    return model ? model.Id : undefined;
  }

}

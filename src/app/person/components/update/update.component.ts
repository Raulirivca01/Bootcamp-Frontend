import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  formPerson: FormGroup;
  documentTypes: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
  ) {
    this.formPerson = formBuilder.group({
      id: [{value:  1, disabled: false}, [Validators.required]],
      name: [{value: null, disabled: false}, [Validators.required]],
      lastname: [{value: null, disabled: false}, [Validators.required]],
      documentNumber: [{value: null, disabled: false}, [Validators.required]],
      documentTypeId: [{value: null, disabled: false}, [Validators.required]],
      birthday: [{value: null, disabled: false}, []],
    })
  }

  ngOnInit(): void {
    this.personService.getTypeDocument().subscribe(documentTypes => {
      this.documentTypes = documentTypes;
    })
  }

  cancelar(): void {
    this.back();
  }

  back(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRouter
    })
  }

  actualizar(): void {
    const person = this.formPerson.getRawValue();
    this.personService.update(person).subscribe(x => {
      alert('Se actualizo correctamente');
      this.back();
    })
  }
}


import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dsplayedColumns: string[] = ['id', 'name', 'lastname', 'documentType', 'documentNumber', 'birthday', 'actions'];
  personDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(
    private personService: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void {
    this.personService.getAll().subscribe(listPerson => {
      this.personDataSource.data = listPerson;
    })
  }

  editarPerson(person: any): any {
    alert('Editando persona ' + person.name)
    this.router.navigate(['./update'], {
      relativeTo: this.activatedRoute
    })
    return person.id;
  }

  deletePerson(person: any): void {
    alert('Eliminado persona ' + person.name)
    this.personService.delete(person.id).subscribe();
  }

  agregarPerson(): void {
    this.router.navigate(['./create'], {
      relativeTo: this.activatedRoute
    })
  }
}

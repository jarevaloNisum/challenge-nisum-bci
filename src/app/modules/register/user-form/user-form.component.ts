import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CountriesnowService } from '../../../services/countriesnow.service';
import { Observable } from 'rxjs';
import { PersonaACargo } from '../../../models/personaACargo';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  registerForm!: FormGroup;
  peopleInChargeForm!: FormGroup;

  usuario!: Usuario;

  countries$: Observable<any> = new Observable<any[]>();
  cities$: Observable<any> = new Observable<any[]>();

  addingPerson: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesnowService,
    private router: Router
  ) {}

  ngOnInit() {
    this.countries$ = this.countriesService.loadAllCountries();
    this.initUsuario();
    this.initRegisterForm();
    this.initPeopleInChargeForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(15)]],
      apellido: ['', [Validators.required, Validators.maxLength(15)]],
      edad: ['35'],
      pais: [''],
      ciudad: [''],
    });
  }
  initPeopleInChargeForm() {
    this.peopleInChargeForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(30)]],
      parentesco: ['', [Validators.required, Validators.maxLength(15)]],
      edad: ['18'],
    });
  }

  initUsuario() {
    this.usuario = {
      nombre: '',
      apellido: '',
      edad: 0,
      pais: '',
      ciudad: '',
      personaACargo: [],
    };
  }

  checkValid(form: FormGroup, input: string) {
    return (
      form.get(input)?.invalid ||
      form.get(input)?.dirty ||
      form.get(input)?.touched
    );
  }

  setCities(country: string) {
    this.cities$ = this.countriesService.loadCityByCountry(country);
  }

  register(form: FormGroup) {
    (this.usuario.nombre = form.value.nombre),
      (this.usuario.apellido = form.value.apellido),
      (this.usuario.edad = form.value.edad),
      (this.usuario.ciudad = form.value.ciudad),
      (this.usuario.pais = form.value.pais),
      console.log('Usuario a enviar', this.usuario);
    alert('Usuario enviado, revisar en consola');
    this.initUsuario();
    this.initRegisterForm();
    this.initPeopleInChargeForm();
  }

  addPerson(form: FormGroup) {
    if (form.valid) {
      const personInCharge: PersonaACargo = {
        nombreCompleto: form.value.nombreCompleto,
        parentesco: form.value.parentesco,
        edad: form.value.edad,
      };
      this.usuario.personaACargo.push(personInCharge);
      this.initPeopleInChargeForm();
      this.addingPerson = false;
    }
  }

  goHome() {
    this.router.navigate(['home']);
  }
}

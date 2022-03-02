import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'example-application';

  public formLogin = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void{
    // Valores del formulario y algunas validaciones
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms:['', [Validators.required, Validators.requiredTrue]],
      youtube:['',[Validators.required, Validators.pattern('^(https?\\:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.?be)\\/?.*$')]],
      typeVeh:[''],
      color:['']
    })

    this.loadAPI();
  }

  // Función que cambia las validaciones de (color) según la seleección del typeVeh
  changeTypeVeh(){
    // console.log(this.formLogin.value.typeVeh);
    let typeVehSelected=this.formLogin.value.typeVeh;

    if(typeVehSelected==='carro'){
      this.formLogin.get('color')?.setValidators([Validators.required]);
      this.formLogin.get('color')?.updateValueAndValidity();
    }else{
      this.formLogin.get('color')?.clearValidators();
      this.formLogin.get('color')?.updateValueAndValidity();
    }

  }

  // Función para simular carga de datos API
  loadAPI(): void{
    const response={
      email: 'manuel@correo.com',
      password: '11123456789',
      terms: true,
      youtube: '',
      typeVeh: 'moto',
      color: ''
    }

    // Asignamos valores al formulario
    // this.formLogin.patchValue({
    //   email: response.email,
    //   password: response.password,
    //   terms: response.terms
    // });
    this.formLogin.setValue(response);
  }

  send(): any{
    console.log(this.formLogin.value);
  }
}

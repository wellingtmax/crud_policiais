import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PolicialService } from '../../services/policial.service';
import { cpfValidator } from '../../validators/cpf.validator';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro-policial',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-policial.component.html',
  styleUrls: ['./cadastro-policial.component.css']
})
export class CadastroPolicialComponent {
  policialForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private policialService: PolicialService
  ) {
    this.policialForm = this.fb.group({
      rg_civil: ['', Validators.required],
      rg_militar: ['', Validators.required],
  // cpf: ['', [Validators.required, cpfValidator]],
  cpf: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      matricula: ['', Validators.required],
      nome_de_escala: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.policialForm.valid) {
      this.policialService.cadastrarPolicial(this.policialForm.value).subscribe({
        next: (response) => {
          this.mensagemSucesso = 'Policial cadastrado com sucesso!';
          this.mensagemErro = '';
          this.policialForm.reset();
        },
        error: (error) => {
          this.mensagemErro = error.error?.error || 'Erro ao cadastrar policial';
          this.mensagemSucesso = '';
        }
      });
    }
  }
}

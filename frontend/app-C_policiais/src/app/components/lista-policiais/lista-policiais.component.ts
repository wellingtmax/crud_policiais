import { Component, OnInit } from '@angular/core';
import { PolicialService } from '../../services/policial.service';
import { Policial } from '../../models/policial.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-policiais',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-policiais.component.html',
  styleUrls: ['./lista-policiais.component.css']
})
export class ListaPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  filtro: string = '';
  carregando: boolean = false;
  erro: string = '';

  constructor(private policialService: PolicialService) { }

  ngOnInit(): void {
    this.carregarPoliciais();
  }

  carregarPoliciais(): void {
    this.carregando = true;
    this.erro = '';

    this.policialService.listarPoliciais(this.filtro || undefined).subscribe({
      next: (data) => {
        this.policiais = data;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao carregar policiais: ' + (error.error?.error || error.message);
        this.carregando = false;
      }
    });
  }

  aplicarFiltro(): void {
    this.carregarPoliciais();
  }

  limparFiltro(): void {
    this.filtro = '';
    this.carregarPoliciais();
  }
}

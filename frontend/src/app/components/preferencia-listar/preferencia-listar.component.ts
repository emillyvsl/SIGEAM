import { Component, OnInit } from '@angular/core';
import { PreferenciaService } from 'src/app/services/preferencia.service';
import { PreferenciaInterface } from 'src/app/model/preferencia.interface';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
interface JwtPayLoad {
  usuario_id: string;
  usuario_papel: string;
  iat: number;
}
@Component({
  selector: 'app-preferencia-listar',
  templateUrl: './preferencia-listar.component.html',
  styleUrls: ['./preferencia-listar.component.css'],
})
export class PreferenciaListarComponent implements OnInit {
  preferencias: PreferenciaInterface[] = [];
  userId: string = '';

  constructor(private preferenciaService: PreferenciaService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    console.log(token);
    const decodedToken = jwtDecode<JwtPayLoad>(token);
    this.userId = decodedToken.usuario_id;
    console.log(this.userId)
    this.getPreferencias();
  }

  getPreferencias(): void {
    if (this.userId) {
      this.preferenciaService
        .getPreferenciasPorUsuarioId(this.userId)
        .subscribe({
          next: (data) => {
            console.log(data); // Verifique a saída aqui
            this.preferencias = data;
          },
          error: (error) => {
            console.error('Erro ao carregar preferências:', error);
            Swal.fire(
              'Erro',
              'Não foi possível carregar as preferências',
              'error'
            );
          },
        });
    } else {
      Swal.fire('Erro', 'Usuário não autenticado', 'error');
    }
  }
}

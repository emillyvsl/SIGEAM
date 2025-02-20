import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SolicitarEntradaService {
  private baseUrl = environment.API_URL;
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  enviarSolicitacao(solicitacao: { usuario_id: string, ministerio_id: string; preferenciasAtividades : string[] }): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post(`${this.baseUrl}/membroministerio`, solicitacao, { headers });
  }
}

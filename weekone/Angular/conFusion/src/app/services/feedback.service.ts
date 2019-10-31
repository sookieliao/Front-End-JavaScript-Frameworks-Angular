import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Feedback } from '../shared/feedback'
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  
  putFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.http.put<Feedback>('http://localhost:3000/feedback', httpOptions)
    .pipe(catchError(this.processHTTPMsgService.handleError)); 
  }

}


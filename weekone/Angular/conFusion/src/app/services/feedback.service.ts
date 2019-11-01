import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Feedback } from '../shared/feedback'
import { catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

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
    debugger;

    return this.http.put<Feedback>(baseURL + 'feedbacks', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError)); 
  }

}


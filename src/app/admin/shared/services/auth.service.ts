import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { User, FirebaseAuthResponse } from '../../../shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private http: HttpClient) {}

	get token(): string {
		const expDate = localStorage.getItem('expDate');
		if (new Date() > new Date(expDate)) {
			this.logout();
			return null;
		}
		return localStorage.getItem('firebaseToken');
	}

	login(user: User): Observable<any> {
		user.returnSecureToken = true;
		return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(
				tap(this.setToken),
				catchError(this.handleError.bind(this))
			);
	}

	logout(): void {
		this.setToken(null);
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	handleError(error: HttpErrorResponse) {
		const {message} = error.error.error;

		switch(message) {
			case 'INVALID_EMAIL':
				this.error$.next('Incorect email');
				break
			case 'INVALID_PASSWORD':
				this.error$.next('Incorect password');
				break
			case 'EMAIL_NOT_FOUND':
				this.error$.next('Email not found'); // :TODO check it
				break
		}

		return throwError(error);
	}

	private setToken(response: FirebaseAuthResponse | null): void {
		if (response) {
			const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem('firebaseToken', response.idToken);
			localStorage.setItem('expDate', expDate.toString());
		} else {
			localStorage.clear()
		}
	}
}

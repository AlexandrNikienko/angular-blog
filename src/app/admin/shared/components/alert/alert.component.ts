import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { animate, trigger, state, style, transition } from '@angular/animations';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
	animations: [
		trigger('animate', [
			//state('start', style({ opacity: '0' })),
			//state('end', style({ opacity: '1' })),
			//transition('start => end', animate(300)),
			//transition('end => start', animate('300ms ease-in-out')),
			//'void => *'
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-100%)' }),
				animate('300ms ease-in-out')
			]),
			//'* => void'
			transition(':leave', [
				animate('300ms ease-in-out', style({
					opacity: 0,
					transform: 'translateY(-100%)'
				}))
			])
		])
	]
})
export class AlertComponent implements OnInit, OnDestroy {
	public text: string;
	public type = 'success';
	//public errorState = 'start';
	private delay = 5000;
	private alertSubscription: Subscription;
	private timeout;

	constructor(private alertService: AlertService) { }

	ngOnInit() {
		this.alertSubscription = this.alertService.alert$.subscribe(alert => {
			this.text = alert.text;
			this.type = alert.type;
			//this.errorState = 'end';

			this.timeout = setTimeout(() => {
				this.close()
			}, this.delay)
		})
	}

	ngOnDestroy() {
		if (this.alertSubscription) {
			this.alertSubscription.unsubscribe();
		}
	}

	close() {
		clearTimeout(this.timeout);
		//this.errorState = 'start';
		this.text = '';
	}

	animationStarted(event: AnimationEvent) {
		console.log('animation started')
	}

	animationDone(event: AnimationEvent) {
		console.log('animation done')
	}
}

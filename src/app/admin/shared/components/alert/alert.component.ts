import { AlertService } from './../../services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
	public text: string;
	public type = 'success';
	private delay = 5000;
	private alertSubscription: Subscription;

	constructor(private alertService: AlertService) { }

	ngOnInit() {
		this.alertSubscription = this.alertService.alert$.subscribe(alert => {
			this.text = alert.text;
			this.type = alert.type;

			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				this.text = '';
			}, this.delay)
		})
	}

	ngOnDestroy() {
		if (this.alertSubscription) {
			this.alertSubscription.unsubscribe();
		}
	}
}

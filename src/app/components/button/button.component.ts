/**
 * <app-button [valueModel]="value"
 * (changeBtnValue)="changeValue($event)"
 * (saveBtnValue)="saveValue($event)"></app-button>
 */
import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    value: any;
    @Input() valueModel: any;
    @Output() changeBtnValue: EventEmitter<string>;
    @Output() saveBtnValue: EventEmitter<string>;

    constructor() {
        this.changeBtnValue = new EventEmitter<string>();
        this.saveBtnValue = new EventEmitter<string>();
    }

    ngOnChanges() {
        this.value = '';
    }

    ngOnInit() {
        this.value = this.valueModel;
    }

    selectNumber(value: number) {
        if (typeof (value) === 'number') {
            if (this.value.length < 3) {
                this.value = this.value.toString() + value.toString();
                this.changeBtnValue.emit(this.value);
            }
        }
    }

    selectAction(action: string) {
        if (action === 'cancel') {
            this.value = this.value.slice(0, this.value.length - 1);
            this.changeBtnValue.emit(this.value);
        }
        if (action === 'validate') {
            this.saveBtnValue.emit(this.value);
        }
        if (action === 'clear') {
            this.value = '';
            this.changeBtnValue.emit(this.value);
        }
    }
}

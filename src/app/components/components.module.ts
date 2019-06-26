import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ButtonComponent} from '../components/button/button.component';
import {PopoverComponent} from '../components/popover/popover.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    entryComponents: [PopoverComponent],
    declarations: [ButtonComponent, PopoverComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [ButtonComponent, PopoverComponent]
})
export class ComponentsModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ButtonComponent} from '../components/button/button.component';
import {PopoverComponent} from '../components/popover/popover.component';
import {PopoverShareComponent} from '../components/popover-share/popover-share.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    entryComponents: [PopoverComponent, PopoverShareComponent],
    declarations: [ButtonComponent, PopoverComponent, PopoverShareComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports: [ButtonComponent, PopoverComponent, PopoverShareComponent]
})
export class ComponentsModule {
}

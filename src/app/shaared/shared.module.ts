import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipesService } from './_shared/recipes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule ({
    declarations: [
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
        RecipesService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})  

export class RecipesModule { }
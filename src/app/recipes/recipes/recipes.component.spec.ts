import { ComponentFixtureAutoDetect, inject, TestBed } from '@angular/core/testing';
import { RecipesService } from '../_shared/recipes.service';
import { RecipesComponent } from './recipes.component';
import { Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('Recipes Component', () => {
    let component = RecipesComponent
    let recipesService: RecipesService
    let mockRecipe = {
        id: '123',
        name: 'taco',
        tacoShell: 'soft',
        protein: 'meat',
        toppings: 'lettuce',
        sauce: 'hot',
        instructions: 'cook for 10 min'
    }

    beforeEach(() => TestBed.configureTestingModule({
        declarations: [RecipesComponent],
        imports: [HttpClientTestingModule],
        providers: [RecipesService, ReactiveFormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }))

    it ('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // Postive Test
    it('should load recipes', () => {
        inject([RecipesService], (recipesService) => {
            recipesService.getRecipes().subscribe((recipes) => {
                expect(recipes.length).toBeGreaterThan(0);
                expect(recipes[0].id).toEqual('Hot Steak');
            });
        })
    });

    // Negative Test
    it('should get error if no recipe', () => {
        inject([RecipesService], (recipeSerivce => {
            recipesService.updateRecipe(mockRecipe).subscribe((recipes) => {
                expect(Error);
            });
        }))
    });
});
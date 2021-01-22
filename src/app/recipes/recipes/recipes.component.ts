import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RecipesService } from '../_shared/recipes.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'recipes-app',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
    public loaded:boolean = false;
    public recipes:any = [];
    public noRecipesError: 'There are no stored recipes. Please create a new one.'
    public showFields: boolean = false;
    public recipeForm: any;
    public isEdit: boolean = false;
    public rowData:any = [];
    public columnDefs: any;
    public postUrl: any = encodeURI(document.location.href);
    public postTitle: any = encodeURI('Hello, Check out these delicious recipes');

    constructor(private recipesService: RecipesService,
                public dialog: MatDialog) { }

    ngOnInit() {
        this.recipesService.refreshPage.subscribe(value => {
            if (value === true) {
                this.getAllRecipes();
            }
        });
        this.resetForm();
        this.getAllRecipes();
    }

    public getAllRecipes() {
        this.recipesService.getRecipes().subscribe((res) => {
            if (res) {
                this.recipes = res;
                this.setTableData();
                this.loaded = true;
            } else {
                this.loaded = true;
            }
        });
    }

    public setTableData() {
        this.columnDefs = [{field: 'name'}, {field: 'tacoShell'}, {field: 'protein'}, {field: 'toppings'}, {field: 'sauce'}, {field: 'instructions'}];
        this.recipes.forEach((recipe) => {
            this.rowData.push({name: recipe.name, tacoShell: recipe.tacoShell, protein: recipe.protein,
             toppings: recipe.toppings, sauce: recipe.sauce, instructions: recipe.instructions});
        });
    }

    public editRecipe(recipe) {
        this.isEdit = true;
        this.recipeForm = new FormGroup({
            name: new FormControl(recipe.name),
            tacoShell: new FormControl(recipe.tacoShell),
            protein: new FormControl(recipe.protein),
            toppings: new FormControl(recipe.toppings),
            sauce: new FormControl(recipe.sauce),
            instructions: new FormControl(recipe.instructions)
        });
        this.showFields = true;
    }

    public deleteRecipe(recipe) {
        this.recipesService.deleteRecipe(recipe.id).subscribe((response) => {
            this.recipesService.refreshPage.next(true);
        });
    }

    public saveRecipe() {
        const jsonData = this.convertToJson(this.recipeForm.value);
        if (this.isEdit) {
            this.recipesService.updateRecipe(jsonData).subscribe((response) => {
                this.resetForm();
                this.recipesService.refreshPage.next(true);
            });
        } else {
            this.recipesService.saveRecipe(jsonData).subscribe((response) => {
                this.resetForm();
                this.recipesService.refreshPage.next(true);
            });
        }
    }

    public convertToJson(recipe) {
        return {
            id: recipe.name,
            name: recipe.name,
            tacoShell: recipe.tacoShell,
            protein: recipe.protein,
            toppings: recipe.toppings,
            sauce: recipe.sauce,
            instructions: recipe.instructions
        }
    }

    public resetForm() {
        this.showFields = false;
        this.recipeForm = new FormGroup({
        name: new FormControl(),
        tacoShell: new FormControl(),
        protein: new FormControl(),
        toppings: new FormControl(),
        sauce: new FormControl(),
        instructions: new FormControl()
        });
    }
}

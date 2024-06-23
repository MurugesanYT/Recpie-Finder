document.addEventListener('DOMContentLoaded', function() {
    var apiKey = 'gej/LZaIpdCdX1iDG4QG+w==5Ndlcn9fAJpKOTmN'; // Replace with your actual API key
    var currentIndex = 0;
    var recipes = [];

    function fetchRecipes(query) {
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function(result) {
                recipes = result;
                if (recipes.length > 0) {
                    displayRecipe(currentIndex);
                } else {
                    console.error('No recipes found.');
                }
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }

    function displayRecipe(index) {
        var recipeDiv = document.getElementById('recipe');
        recipeDiv.innerHTML = ''; // Clear previous recipe content
        if (recipes.length > 0 && index >= 0 && index < recipes.length) {
            var recipe = recipes[index];
            var recipeLines = recipe.instructions.split('\n');
            var recipeTitle = document.createElement('h2');
            recipeTitle.textContent = recipe.title;
            recipeDiv.appendChild(recipeTitle);
            recipeLines.forEach(function(line) {
                var recipeStep = document.createElement('p');
                recipeStep.textContent = line.trim();
                recipeDiv.appendChild(recipeStep);
            });
        } else {
            console.error('Recipe not found.');
        }
    }

    document.getElementById('searchButton').addEventListener('click', function() {
        var dishName = document.getElementById('dishName').value.trim();
        if (dishName !== '') {
            currentIndex = 0;
            fetchRecipes(dishName);
        } else {
            console.error('Please enter a dish name.');
        }
    });

    document.getElementById('nextRecipe').addEventListener('click', function() {
        if (recipes.length > 0) {
            currentIndex = (currentIndex + 1) % recipes.length;
            displayRecipe(currentIndex);
        }
    });
});

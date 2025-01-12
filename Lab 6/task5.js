const recipes = [];

function addRecipe(name, ingredients, instructions) {
  recipes.push({ name, ingredients, instructions });
}

function listRecipes() {
  console.log("Recipes:");
  recipes.forEach((recipe) => {
    console.log(`- ${recipe.name}:`);
    recipe.ingredients.forEach((ing) => console.log(`   - ${ing}`));
    console.log(`  Instructions: ${recipe.instructions}`);
  });
}

function searchRecipeByIngredient(ingredient) {
  return recipes.filter((recrecipe.ingredients.some((ing) => ing.toLowerCase().includes(ingredient.toLowerCase()))
  );ipe) =>
    
}

addRecipe("Pizza", ["flour", "tomato sause", "cheeese"], "Bake in oven.");
addRecipe("Pasta", ["pasta", "tomato sause", "meat"], "Boil pasta and mix with sause.");
listRecipes();
console.log("Recipes with 'flour':", searchRecipeByIngredient("flour"));
'use strict';

function RecipeMapper() {}

RecipeMapper.prototype = new Mapper();
RecipeMapper.prototype.constructor = RecipeMapper;

RecipeMapper.prototype.mapRecipes = function(rawData) {
	var recipes = this.mapArray(rawData.recipes.recipe, require('./map/recipeAttributeMap'));
	
	recipes.forEach(function(recipe) {
		if(recipe.directions) {
			recipe.directions = this.mapDirections(recipe.directions);
		}
		if(recipe.ingredients) {
			recipe.ingredients = this.mapIngredients(recipe.ingredients);
		}
		if(recipe.categories) {
			recipe.categories = this.mapCategories(recipe.categories);
		}
		if(recipe.images) {
			recipe.images = this.mapArray(recipe.images);
		}
		if(recipe.types) {
			recipe.types = this.mapArray(recipe.types);
		}
	}.bind(this));
	return recipes;
};

RecipeMapper.prototype.mapDirections = function(rawData) {
	return this.mapArray(rawData, require('./map/directionAttributeMap'));
};

RecipeMapper.prototype.mapIngredients = function(rawData) {
	return this.mapArray(rawData, require('./map/ingredientAttributeMap'));
};

RecipeMapper.prototype.mapCategories = function(rawData) {
	return this.mapArray(rawData, require('./map/categoryAttributeMap'));
};

module.exports = RecipeMapper;

// Some sample JSON

/*
{
  "recipe": {
    "cooking_time_min": "15",
    "directions": {
      "direction": [
        {
          "direction_description": "Pre-heat oven to 350 °F (175 °C).",
          "direction_number": "1"
        },
        {
          "direction_description": "Rinse off salmon filet. Place a sheet of aluminum foil on cookie sheet. Place fillet on aluminum foil. Cover with lemon jui
ce. Sprinkle garlic powder on top of fillet.",
          "direction_number": "2"
        },
        {
          "direction_description": "Close foil over fillet. Place cookie sheet in oven. Bake 10 to 20 minutes (depending on thickness) until fillet flakes easi
ly.",
          "direction_number": "3"
        },
        {
          "direction_description": "Enjoy with steamed vegetables and rice or other healthy vegetable side dish.",
          "direction_number": "4"
        }
      ]
    },
    "ingredients": {
      "ingredient": [
        {
          "food_id": "33882",
          "food_name": "Garlic Powder",
          "ingredient_description": "1 tbsp garlic powder",
          "ingredient_url": "http://www.fatsecret.com/calories-nutrition/usda/garlic-powder?portionid=29594&portionamount=1.000",
          "measurement_description": "tbsp",
          "number_of_units": "1.000",
          "serving_id": "29594"
        },
        {
          "food_id": "35849",
          "food_name": "Lemon Juice",
          "ingredient_description": "2 fl oz lemon juice",
          "ingredient_url": "http://www.fatsecret.com/calories-nutrition/usda/lemon-juice?portionid=33133&portionamount=2.000",
          "measurement_description": "fl oz",
          "number_of_units": "2.000",
          "serving_id": "33133"
        },
        {
          "food_id": "38196",
          "food_name": "Atlantic Salmon (Farmed)",
          "ingredient_description": "1 lb salmon",
          "ingredient_url": "http://www.fatsecret.com/calories-nutrition/usda/atlantic-salmon-(farmed)?portionid=48099&portionamount=1.000",
          "measurement_description": "lb",
          "number_of_units": "1.000",
          "serving_id": "48099"
        }
      ]
    },
    "number_of_servings": "4",
    "preparation_time_min": "5",
    "rating": "4",
    "recipe_categories": {
      "recipe_category": [
        {
          "recipe_category_name": "Seafood",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/ingredients/seafood/Default.aspx"
        },
        {
          "recipe_category_name": "Fish",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/ingredients/seafood/fish/Default.aspx"
        },
        {
          "recipe_category_name": "Salmon",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/ingredients/seafood/fish/salmon/Default.aspx"
        },
        {
          "recipe_category_name": "Main Dish",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/meal/main-dish/Default.aspx"
        },
        {
          "recipe_category_name": "Baked Main Dish",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/meal/main-dish/baked/Default.aspx"
        },
        {
          "recipe_category_name": "Fish Main Dish",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/meal/main-dish/fish/Default.aspx"
        },
        {
          "recipe_category_name": "Low Calorie",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/low-calorie/Default.aspx"
        },
        {
          "recipe_category_name": "200-300 Calorie",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/low-calorie/200-300-calorie/Default.aspx"
        },
        {
          "recipe_category_name": "Low Carb",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/low-carb/Default.aspx"
        },
        {
          "recipe_category_name": "1-5 Net Carbs",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/low-carb/1-5-net-carbs/Default.aspx"
        },
        {
          "recipe_category_name": "Low Sodium",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/low-sodium/Default.aspx"
        },
        {
          "recipe_category_name": "Weight Watchers Points",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/weight-watchers-points/Default.aspx"
        },
        {
          "recipe_category_name": "5 Point",
          "recipe_category_url": "http://www.fatsecret.com/recipes/collections/nutrition/weight-watchers-points/5-point/Default.aspx"
        }
      ]
    },
    "recipe_description": "A healthy, easy salmon dish.",
    "recipe_id": "25794",
    "recipe_images": {
      "recipe_image": "http://www.fatsecret.com/static/recipe/2deaf36f-e136-40b0-ade8-3a941014796d.jpg"
    },
    "recipe_name": "Baked Salmon",
    "recipe_types": {
      "recipe_type": "Main Dish"
    },
    "recipe_url": "http://www.fatsecret.com/recipes/baked-salmon/Default.aspx",
    "serving_sizes": {
      "serving": {
        "calcium": "2",
        "calories": "218",
        "carbohydrate": "2.84",
        "cholesterol": "67",
        "fat": "12.32",
        "fiber": "0.2",
        "iron": "2",
        "monounsaturated_fat": "4.386",
        "polyunsaturated_fat": "4.466",
        "potassium": "452",
        "protein": "22.98",
        "saturated_fat": "2.478",
        "serving_size": "1 serving",
        "sodium": "68",
        "sugar": "0.88",
        "trans_fat": "0",
        "vitamin_a": "1",
        "vitamin_c": "20"
      }
    }
  }
}
 */
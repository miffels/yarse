'use strict'

RecipeMapper = require '../../../../src/client/api/mapping/RecipeMapper'

describe 'Mapper', ->
  mapper = null
  beforeEach ->
    mapper = new RecipeMapper
  
  describe '#mapRecipes', ->
    it 'should turn the FatSecret result json into a Backbone attributes set', ->
      resultJSON = {
        recipes: {
          max_results:'50',
          page_number: '0',
          recipe: {
            recipe_description: 'description',
            recipe_id: 'id',
            recipe_name: 'name',
            recipe_url: 'url'
          },
          total_results: '1'
        }
      }
      mapper.mapRecipes(resultJSON).should.eql [{description: 'description', id: 'id', name: 'name'}]

    it 'should be able to deal with complex nested contents', ->
      resultJSON = {
        recipes: {
          recipe: {
            recipe_categories: {
              recipe_category: {
                recipe_category_name: "category",
                recipe_category_url: "http://www.fatsecret.com/recipes/collections/ingredients/seafood/Default.aspx"
              },
            },
            cooking_time_min: 1,
            recipe_description: 'description',
            directions: {
              direction: [
                {
                  direction_description: 'step 1',
                  direction_number: '1'
                },
                {
                  direction_description: 'step 2',
                  direction_number: '2'
                }
              ]
            }
            recipe_id: 'id',
            recipe_images: {
              recipe_image: 'image'
            },
            ingredients: {
              ingredient: {
                ingredient_description: 'description',
                food_id: 'id',
                measurement_description: 'unit',
                food_name: 'ingredient',
                number_of_units: '1.0',
                ingredient_url: 'url',
                serving_id: 'anotherID'
              },
            }
            recipe_name: 'name',
            number_of_servings: 2,
            preparation_time_min: 10,
            rating: 4,
            recipe_types: {
              recipe_type: [
                'type 1', 'type 2'
              ]
            }
          }
        }
      }
      expectedResult = [{
        categories: ['category'],
        cookingTime: 1,
        description: 'description',
        directions: ['step 1', 'step 2'],
        id: 'id',
        images: ['image'],
        ingredients: [
          {
            description: 'description',
            id: 'id',
            name: 'ingredient',
            unit: 'unit',
            units: '1.0'
          }
        ],
        name: 'name',
        numberOfServings: 2,
        preparationTime: 10,
        rating: 4,
        types: ['type 1', 'type 2']
      }]
      result = mapper.mapRecipes(resultJSON)
      result.should.eql expectedResult
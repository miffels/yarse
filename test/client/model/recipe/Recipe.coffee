'use strict'

Recipe = require '../../../../src/client/model/recipe/Recipe'
RecipeIngredient = require '../../../../src/client/model/ingredient/RecipeIngredient'
RecipeIngredientList = require '../../../../src/client/model/ingredient/RecipeIngredientList'
Kitchen = require '../../../../src/client/model/kitchen/Kitchen'
KitchenIngredient = require '../../../../src/client/model/ingredient/KitchenIngredient'

describe 'Recipe', ->
	recipe = null
	beforeEach ->
		recipe = new Recipe ({
			ingredients: new RecipeIngredientList([new RecipeIngredient, new RecipeIngredient])
		})
	describe '#Recipe', ->

		it 'should have a name', ->
			new Recipe({name: 'Beans lard'}).get('name').should.equal 'Beans lard'
			
		it 'should set a default image if none is passed', ->
			new Recipe().get('images').length.should.equal 1
			
		it 'should use the image parameter it is given', ->
			new Recipe({images: ['someImage']}).get('images')[0].should.equal 'someImage'
		
		it 'should find out automatically what kitchen ingredients it contains', ->
			kitchen = new Kitchen
			ingredient = new KitchenIngredient({name: 'Beans'})
			kitchen.addIngredient(ingredient)
			recipeIngredients = new RecipeIngredientList([new RecipeIngredient({name: 'Beans asdfg'})])
			recipe = new Recipe({ingredients: recipeIngredients, kitchen: kitchen})
			recipe.get('ingredientsFromKitchen').models[0].should.equal ingredient
		
		it 'should never point to a null object if it has no kitchen information', ->
			new Recipe().get('ingredientsFromKitchen').should.be.ok
			new Recipe({kitchen: null}).get('ingredientsFromKitchen').should.be.ok
			new Recipe({kitchen: new Kitchen}).get('ingredientsFromKitchen').should.be.ok
	
	describe '#view', ->
		it 'should increase the view count of its ingredients by 1', ->
			recipe.get('ingredients').models[0].get('viewed').should.equal 0
			recipe.get('ingredients').models[1].get('viewed').should.equal 0
			recipe.view()
			recipe.get('ingredients').models[0].get('viewed').should.equal 1
			recipe.get('ingredients').models[1].get('viewed').should.equal 1
			
	describe '#dismiss', ->
		it 'should increase the dismiss count of its ingredients by 1', ->
			recipe.get('ingredients').models[0].get('dismissed').should.equal 0
			recipe.get('ingredients').models[1].get('dismissed').should.equal 0
			recipe.dismiss()
			recipe.get('ingredients').models[0].get('dismissed').should.equal 1
			recipe.get('ingredients').models[1].get('dismissed').should.equal 1
			
	describe '#choose', ->
		it 'should increase the choose count of its ingredients by 1', ->
			recipe.get('ingredients').models[0].get('chosen').should.equal 0
			recipe.get('ingredients').models[1].get('chosen').should.equal 0
			recipe.choose()
			recipe.get('ingredients').models[0].get('chosen').should.equal 1
			recipe.get('ingredients').models[1].get('chosen').should.equal 1
			
	describe '#ignore', ->
		it 'should increase the ignore count of its ingredients by 1', ->
			recipe.get('ingredients').models[0].get('ignored').should.equal 0
			recipe.get('ingredients').models[1].get('ignored').should.equal 0
			recipe.ignore()
			recipe.get('ingredients').models[0].get('ignored').should.equal 1
			recipe.get('ingredients').models[1].get('ignored').should.equal 1
			
	describe '#revokeDismissal', ->
		it 'should decrese the dismiss count of its ingredients by 1', ->
			recipe.get('ingredients').models[0].get('dismissed').should.equal 0
			recipe.get('ingredients').models[1].get('dismissed').should.equal 0
			recipe.revokeDismissal()
			recipe.get('ingredients').models[0].get('dismissed').should.equal -1
			recipe.get('ingredients').models[1].get('dismissed').should.equal -1
			
	describe '#score', ->
		it 'should equal the rating initially', ->
			recipe.set('rating', '3')
			recipe.score().should.equal 3
		
		it 'should take ingredient rating parameters into account if applicable', ->
			recipe.set('rating', '3')
			recipe.get('ingredients').models[0].set('viewed', '1')
			recipe.get('ingredients').models[0].set('dismissed', 2)
			recipe.get('ingredients').models[1].set('chosen', '3')
			recipe.get('ingredients').models[1].set('ignored', 4)
			recipe.score().should.equal 4
		
		it 'should not crash if there are no ingredients or ratings', ->
			recipe.set('ingredients', null)
			recipe.set('rating', null)
			recipe.score().should.equal 0

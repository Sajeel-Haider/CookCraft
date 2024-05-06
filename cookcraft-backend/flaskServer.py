from flask import Flask, request, jsonify
from recommendation import recommend_recipes
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def transform_id(recipes):
    for recipe in recipes:
        recipe['_id'] = str(recipe['_id'])  # Convert ObjectId to string
    return recipes
@app.route('/', methods =['GET'])
def get_articles():
    return jsonify({"He110" : "World"} )

@app.route('/recommend', methods=['POST'])
def recommend():
    input_ingredients = request.json.get('ingredients', [])

    if not input_ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400

    recommended_recipes = recommend_recipes(input_ingredients)
    print(recommended_recipes)
    transformed_recipes = transform_id(recommended_recipes.to_dict(orient='records'))
    return jsonify(transformed_recipes)

if __name__ == '__main__':
    app.run(host="192.168.235.240",debug=True, port=5000)

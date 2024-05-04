from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Connect to MongoDB
client = MongoClient("mongodb+srv://ahmed40152:ahmedabdulla@cluster0.k7swoq1.mongodb.net/CookCraftDB")
db = client['CookCraftDB']
recipes_collection = db.recipe

# Fetch data from MongoDB
data = pd.DataFrame(list(recipes_collection.find()))

# Process the 'ingredients' column to concatenate ingredient names
data['ingredients'] = data['ingredients'].apply(lambda x: ', '.join([ing['name'] for ing in x]) if x else '')

# Now the DataFrame 'ingredients' column contains concatenated names of ingredients

# Your existing TF-IDF and cosine similarity setup remains unchanged

# Preprocess ingredients
data['ingredients'] = data['ingredients'].str.lower().str.replace('[^\w\s]', '', regex=True)
print(data['ingredients'])

# Initialize a TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(data['ingredients'])

# Function to find recipes based on ingredients
def recommend_recipes(input_ingredients):
    #input_ingredients = ' '.join(input_ingredients).lower()  # Normalize input
    #print("input ingred....-<: ",input_ingredients)
    input_vec = vectorizer.transform([input_ingredients])   # Convert input into vector
    cos_similarities = cosine_similarity(input_vec, tfidf_matrix)  # Compute cosine similarities

    # Get indices of top matches
    similar_indices = cos_similarities[0].argsort()[-10:][::-1]

    # Create a DataFrame for the results
    results = data.iloc[similar_indices][['_id', 'Recipe_Title', 'ingredients']]
    #print("results....-<: ",results)
    results['similarity_score'] = cos_similarities[0][similar_indices]  # Append similarity scores

    return results
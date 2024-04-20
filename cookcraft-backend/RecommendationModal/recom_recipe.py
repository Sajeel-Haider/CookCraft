import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load data
data_path = './recipes.csv'
data = pd.read_csv(data_path)

# Preprocess ingredients
data['ingredients'] = data['ingredients'].str.lower().str.replace('[^\w\s]', '', regex=True)

# Initialize a TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(data['ingredients'])

# Function to find recipes based on ingredients
def recommend_recipes(input_ingredients):
    input_ingredients = ' '.join(input_ingredients).lower()  # Normalize input
    input_vec = vectorizer.transform([input_ingredients])   # Convert input into vector
    cos_similarities = cosine_similarity(input_vec, tfidf_matrix)  # Compute cosine similarities

    # Get indices of top matches
    similar_indices = cos_similarities[0].argsort()[-10:][::-1]

    # Create a DataFrame for the results
    results = data.iloc[similar_indices][['_id', 'Recipe_Title', 'ingredients']]
    results['similarity_score'] = cos_similarities[0][similar_indices]  # Append similarity scores

    return results

# Example use
input_ingredients = ['chicken', 'onion', 'tomato']
recommended_recipes = recommend_recipes(input_ingredients)
print(recommended_recipes)

const { PythonShell } = require("python-shell");

app.post("/api/recommend", (req, res) => {
  let options = {
    mode: "text",
    pythonPath: "../RecommendationModal/recom_recipe.py", // Specify the path to the Python executable
    scriptPath: "../RecommendationModal", // Path to the directory containing recommend.py
    args: [JSON.stringify(req.body.ingredients)], // Passing ingredients as JSON
  };

  PythonShell.run("recom_recipe.py", options, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send("Error running recommendation model");
    } else {
      res.json(JSON.parse(results[0]));
    }
  });
});

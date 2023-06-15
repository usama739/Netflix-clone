let Usermodel = require('./models');
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
let app = express();

const port = 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cors());


// Create a schema for the movies
let movieSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    title: {type: String},
    poster_path: {type: String},
});

let Movie = mongoose.model('Movie', movieSchema);
  

app.post('/signup', async(req, res) => {
    // console.log(req.body);                      /// {email: '...', password: '...'}
    const {email, password} = req.body;

    const user =  await Usermodel.findOne({ email: email });

    if (user) {
        // User already exists with the provided email
        console.log('User already exists');
        res.status(400).json({ message: 'User already exists' });
    } else {
        // User with the provided email doesn't exist, you can proceed with insertion
        const user = new Usermodel({ email: email  , password: password });
        user.save()
        .then(() => {
            console.log('User saved successfully');
            res.status(201).json({ message: 'User saved successfully' });;
        })
        .catch((error) => {
            console.log('Error saving user:', error);
        });
    }        
});




app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    const user =  await Usermodel.findOne({ email: email });

    if (!user) {
        console.log('User not found');
        res.status(401).json({ message: 'Authentication failed' });
    }
    else{
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return;
            }
        
            else if (!isMatch) {
                console.log('Invalid password');
                res.status(401).json({ message: 'Authentication failed' });
            }
            else{
                console.log('User authenticated');
                res.status(200).json({ message: 'Authentication successful' });
            }
            
        });
    }

});




// Define the API endpoint for adding a movie to the "Watch Later" list
app.post('/watch-later', async(req, res) => {
    const { id, title, poster_path } = req.body;
//   console.log(title + " " + poster_path);

    const movie = await Movie.findOne({ id: id });
    if (movie) {
        console.log('Movie already exist');
        return;
    }
    
    // Create a new movie instance
    const newMovie = new Movie({
        id: id,
        title: title,
        poster_path: poster_path,
    });
  
    // Save the movie to the database
    newMovie.save()
        .then(() => {
            console.log('Movie saved successfully');
            return res.status(201);
        })
        .catch((error) => {
            console.log('Error while saving:', error);
    });
});



// Create an API endpoint to fetch the movies from the database
app.get('/my-list', async (req, res) => {
    // Fetch the movies from the database
    const movies = await Movie.find({});
      if (!movies) {
        console.error('Error fetching movies:');
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    return res.status(200).json(movies);
});


app.delete('/delete-movie/:id', async(req, res) => {
    const movieId = req.params.id;
  
    // Find and delete the movie with the given movieId from the database
    const deletedMovie = await Movie.findOneAndDelete({ id: movieId });
    if (!deletedMovie) {
        return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    return res.status(200).json({ success: true, message: 'Movie deleted successfully' });
});

    
app.listen(port, () => console.log(`Server listening on port ${port}`));
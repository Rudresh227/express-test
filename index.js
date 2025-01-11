import express from 'express';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());

let teaData = [];
let nextId = 1;

// POST route for creating a new tea
app.post('/teas', (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea); 
  res.status(201).send(newTea);   
});

// GET route for retrieving all teas
app.get('/teas', (req, res) => {
  try {
    if (teaData.length === 0) {
      return res.status(404).send({ message: 'No teas found' });
    }
    res.status(200).send(teaData);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// GET route for retrieving a specific tea by ID
app.get('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send({ message: 'Tea not found' });
  }

  res.status(200).send(tea);
});

// DELETE route for deleting a specific tea by ID
app.delete('/teas/:id', (req, res) => {
  const teaIndex = teaData.findIndex(t => t.id === parseInt(req.params.id));

  if (teaIndex === -1) {
    return res.status(404).send({ message: 'Tea not found' });
  }

  const deletedTea = teaData.splice(teaIndex, 1);
  res.status(200).send({ message: 'Tea deleted', tea: deletedTea[0] });
});

// PUT route for updating a specific tea by ID (optional but useful)
app.put('/teas/:id', (req, res) => {
  const tea = teaData.find(t => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send({ message: 'Tea not found' });
  }

  const { name, price } = req.body;
  tea.name = name || tea.name;
  tea.price = price || tea.price;

  res.status(200).send(tea);
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

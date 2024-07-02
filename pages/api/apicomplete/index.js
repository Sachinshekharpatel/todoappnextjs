// pages/api/apicomplete.js
import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  const client = await MongoClient.connect(
    'mongodb+srv://ftshekhar:ftshekhar@cluster0.2texfgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  const db = client.db();
  const todoCollection = db.collection('todosCompleted');

  if (req.method === 'POST') {
    const { todoTask } = req.body;

    if (!todoTask) {
      res.status(400).json({ message: 'Todo task is required' });
      client.close();
      return;
    }

    try {
      const result = await todoCollection.insertOne({ task: todoTask,completed: 'true' });
      console.log(result);
      client.close();
      res.status(201).json({ message: 'Todo inserted!' });
    } catch (error) {
      console.error('Database connection failed:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const todos = await todoCollection.find().toArray();
      client.close();
      res.status(200).json({ todos });
    } catch (error) {
      console.error('Database connection failed:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ message: 'Todo ID is required' });
      client.close();
      return;
    }

    try {
      const result = await todoCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Todo deleted!' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
      client.close();
    } catch (error) {
      console.error('Database connection failed:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;

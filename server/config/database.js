import mongoose from 'mongoose';
import { Category } from '../models/Category.js';
import { Question } from '../models/Question.js';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-checkpoint';
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create initial data if database is empty
    await createInitialData();
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const createInitialData = async () => {
  try {
    // Check if categories already exist
    const categoryCount = await Category.countDocuments();
    
    if (categoryCount === 0) {
      console.log('Creating initial categories and questions...');
      
      // Create JavaScript category
      const jsCategory = await Category.create({
        name: 'JavaScript'
      });
      
      // Create initial JavaScript questions
      const jsQuestions = [
        'Understand scopes, hoisting, and TDZ',
        'Master closures and their practical applications',
        'Learn prototypes and prototype chain',
        'Understand this binding in different contexts',
        'Master async JavaScript and event loop',
        'Practice event loop tricky scenarios',
        'Understand objects, copying, and memory management',
        'Learn functional programming concepts',
        'Understand modules and bundling',
        'Master browser concepts and DOM manipulation'
      ];
      
      for (let i = 0; i < jsQuestions.length; i++) {
        await Question.create({
          categoryId: jsCategory._id,
          questionText: jsQuestions[i],
          orderIndex: i
        });
      }
      
      console.log('Initial data created successfully!');
    }
  } catch (error) {
    console.error('Error creating initial data:', error);
  }
};

export default connectDB;

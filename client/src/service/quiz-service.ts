import axios from 'axios';
import firebase from '../config/firebase'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';


class QuizService {
  async getUserDetails() {
    try {
      const response = await axios.post('/getuserinfo', {
        data: {
          token: this.getCurrentUserToken()
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }

  }

  async addUserToDatabase(user: any) {
    try {
      const response = await axios.post('/adduser', {
        data: {
           user,
           token: this.getCurrentUserToken()
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  async changeUsername(userName: string) {
    try {
      const response = await axios.post('/changeusername', {
        data: {
           userName: userName,
           token: this.getCurrentUserToken()
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  async createUser(email: string, password: string) {
    try {
      const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = this.addUserToDatabase(data);
      return user;
    } catch (error) {
      throw Error(error)
    }
  }

  async logIn(email: string, password: string) {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      return response;
    } catch (error) {
      throw Error(error)
    }
  }

  async signOut() { 
    try {
      firebase.auth().signOut();
    } catch (error) {
      throw Error(error)
    }
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getCurrentUserToken() {
    return this.getCurrentUser()?.getIdToken();
  }

  getActiveRooms(){
    return axios.post('/activerooms')
    .then(response => response.data)
    .catch(error => console.log(error))
  }

  async getRoom(id: number|string) {
    try {
      const response = await axios.post('/getroom', {
        data: {
           id
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  async getCategories() {
    try {
      const response = await axios.post('/categories');
      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }
  async findQuizesByCategory(category: number) {
    try {
      const response = await axios.post('/getquizes', {
        data: {
           category,
           token: this.getCurrentUserToken()
        }
      });
      
      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }
}

const quizService = new QuizService();
export default quizService;

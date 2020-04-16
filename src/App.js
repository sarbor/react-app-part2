import React, { Component } from 'react'
import Table from './Table'
import Form from './Form';
import axios from 'axios';


class App extends Component {
  state = {
    characters: []
  }

  handleSubmit = character => {
     this.makePostCall(character).then( callResult => {
        if (callResult.status === 201) {
           this.setState({ characters: [...this.state.characters, character] });
        }
     });
   }

  makePostCall(character){
   return axios.post('http://localhost:5000/users', character)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
 }

 // axios.delete(endpoint, { data: bucket_config })
 //          .then(response => response.data)
 //          .catch((error) => {
 //            throw error.response.data
 //          })

  removeCharacter = index => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
         if(i === index){
            axios.delete('http://localhost:5000/users/' + character.id)
              .then(response => response.data)
                .catch((error) => {
                  throw error.response.data
                });

            return false;
         }
         else{
            return true;
         }
      }),
    })
  }

  componentDidMount() {
   axios.get('http://localhost:5000/users')
    .then(res => {
      const characters = res.data.users_list;
      this.setState({ characters });
    })
    .catch(function (error) {
      //Not handling the error. Just logging into the console.
      console.log(error);
    });
  }


  render() {

    const { characters } = this.state
    return (

      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />

        <Form handleSubmit={this.handleSubmit} />

      </div>
    )
  }
}

export default App
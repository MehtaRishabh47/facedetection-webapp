import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';

import './App.css';

const particleOptions =
{
  particles: {
    number: {
      value: 100,

      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}





const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  getLocation = (data) => {
    const detectFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const face = document.getElementById('inputimage');
    const width = Number(face.width);
    const height = Number(face.height);
    return {
      leftCol: detectFace.left_col * width,
      topRow: detectFace.top_row * height,
      rightCol: width - (detectFace.right_col * width),
      bottomRow: height - (detectFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onButtonSubmit = () => {
    this.setState({
      imageURL: this.state.input
    });
    fetch('https://face-detection-api-47.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://face-detection-api-47.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.getLocation(response))
      })
      .catch(err => console.log(err));
  }
  // there was an error
  // .then(
  //   function (response) {
  //     console.log(response)
  //   },
  //   function (err) {
  //     // there was an error
  //   }
  // );}


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }



  render() {


    return (
      <div>
        <div className="App">
          <Particles className='particles'
            params={particleOptions} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          {this.state.route === 'home'
            ?
            <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
            </div>
            :
            (this.state.route === 'signin'
              ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )

          }
        </div>
      </div>
    )
  }
}




export default App;

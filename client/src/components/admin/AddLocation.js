import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLocation } from '../../actions/locationActions'

class AddLocation extends Component {
  state = {
    modal: false,
    title: '',
    description: '',
    adresse: '',
    price: '',
    capacity: '',
    image: '',
    date: Date.now(),
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const newLocation = {
      title: this.state.title,
      description: this.state.description,
      adresse: this.state.adresse,
      price: this.state.price,
      capacity: this.state.capacity,
      image: this.state.image,
    }

    //Add location via addLocation action
    this.props.addLocation(newLocation)
  }

  render() {
    return (
      <div className='container'>
        <div className='row' style={{ marginTop: '3rem' }}>
          <form className='col s12' onSubmit={this.onSubmit}>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Ex: Chateau pour evenements'
                  name='title'
                  id='title'
                  type='text'
                  className='validate'
                  onChange={this.onChange}
                />
                <label htmlFor='title'>Location Title</label>
              </div>
              <div className='input-field col s12'>
                <textarea
                  placeholder='Decription de cette location'
                  name='description'
                  className='materialize-textarea'
                  onChange={this.onChange}
                />
                <label htmlFor='last_name'>Descriptions</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Ex: La Wantzenau/Strasbourg'
                  name='adresse'
                  id=''
                  type='text'
                  className='validate'
                  onChange={this.onChange}
                />
                <label htmlFor='disabled'>Adresse</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Ex: 100€'
                  name='price'
                  id=''
                  type='number'
                  className='validate'
                  onChange={this.onChange}
                />
                <label htmlFor='price'>Prix</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder="Capacité d'acceuil"
                  name='capacity'
                  id='email'
                  type='number'
                  className='validate'
                  onChange={this.onChange}
                />
                <label htmlFor='email'>Capacité</label>
              </div>
            </div>

            <div className='row'>
              <div className='file-field input-field'>
                <div
                  className='btn'
                  style={{
                    marginLeft: '0.5rem',
                  }}
                >
                  <span>Ajouter</span>
                  <input name='image' type='file' multiple />
                </div>
                <div className='file-path-wrapper'>
                  <input
                    className='file-path validate'
                    type='text'
                    placeholder='Upload one or more files'
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>

            <button
              style={{
                width: '150px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
                marginTop: '1rem',
                marginBottom: '2rem',
              }}
              block
              className='btn btn-large waves-effect waves-light hoverable blue accent-3'
            >
              Add to db
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = (state) => ({
  location: state.location,
})

export default connect(mapStatetoProps, { addLocation })(AddLocation)

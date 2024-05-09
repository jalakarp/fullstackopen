import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [name, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [notification, setNotification] = useState({message : null, className : null})
  

  useEffect(() => {
    console.log('Getting persons');
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
      
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let popUp = ""
    let newPerson = {name, number}
    const duplicate = persons.find(person => person.name === name)

    if(duplicate !== undefined) {
      if(window.confirm(`${name} is already in the Phonebook. Replace the old number with a new one?`)) {
        console.log("duplicat", duplicate)
        newPerson = {name, number, id : duplicate.id}
        const newPersons = persons.map(person => person.id !== duplicate.id ? person : newPerson)
        personService
        .update(duplicate.id, newPerson)
          .then(() => setPersons(newPersons))
          .catch(error => {
            setNotification({message : `Information of ${newPerson.name} has already been removed from the server`, className : "error"})
            setTimeout(() => {
              setNotification({message : null, className : null})
            }, 5000)

          })
      } 
      popUp = "Modified"

    } else {
      popUp = "Added"
      personService
      .create(newPerson)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    }
    
    setNotification({message : `${popUp} ${newPerson.name} : ${newPerson.number}`, className : "success"})
    
    setTimeout(() => {
      setNotification({message : null, className : null})
    }, 5000)
    
  }

  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const keyFilter = (searchKey) => function(person) {
    return (person.name && person.name.toLowerCase().match(searchKey) !== null);
  }

  const handleSearch = (event) => {
    if(event.target.value !== "") {
      setSearchKey(event.target.value.toLowerCase())
      console.log(searchKey);
      const localSearchKey = event.target.value.toLowerCase()
      console.log(persons);
      const found = persons.filter(keyFilter(localSearchKey))
      setFiltered(found)
      console.log(found);
    } else {
      setSearchKey("")
      setFiltered([])
    }
  }

  const deleteHandler = (id) => {
      const targetPerson = persons.find(person => person.id === id)
      console.log(persons.find(person => person.id === id))
      if(window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
        personService
          .remove(targetPerson.id)
            .then(() => {
              setPersons(persons.filter(person => person.id !== id))
              setFiltered(filtered.filter(person => person.id !== id))
          })
          .catch(error => {
            setNotification({message : `${popUp} ${newPerson.name} : ${newPerson.number}`, className : "success"})
            setTimeout(() => {
              setNotification({message : null, className : null})
            }, 5000)

          })
     }
  }

  

  const getPersonsList = () => {
    return (searchKey !== "" ? filtered : persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} className={notification.className} />
      <Filter onChange={handleSearch}/>
      <h2>Add</h2>
      <AddForm onChange={{name : handleNameChange, phone : handlePhoneChange}} onSubmit={addPerson}/>
      <h3>Numbers</h3>
      <table>
        <tbody>
          <Phonebook  persons={getPersonsList()} onClick={(id) => deleteHandler(id)}/>
        </tbody>
      </table>
    </div>
  )
}


const Notification = ({ message, className}) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className={className}>
      {message}
    </div>
  )
}


const Phonebook = ({persons, onClick}) => persons.map(person => <Person  key={person.name} person={person} onClick={onClick}/>)

const Person = ({person, onClick}) =>  
    <tr>
      <td>
        {person.name}     {person.number}
        <Button text="delete" onClick={() => onClick(person.id)}></Button>
      </td>
    </tr>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Filter = ({onChange}) =>
   <div>
    search: <input onChange={onChange} name="search field" title="search field" />
  </div>


const AddForm = ({onChange, onSubmit}) => {
  const { name: handleNameChange, phone: handlePhoneChange, add : handleSubmit} = onChange;
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={handleNameChange} name="name input" title="name input" />
      </div>
      <div>
        number: <input onChange={handlePhoneChange} name="phone number input" title="phone number input" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

  

export default App
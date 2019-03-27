import React , {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


// function ListContacts(props) {
//     return (
//
//         <ol className='contact-list'>
//             {props.contacts.map(( contact) =>(
//                 <li key={contact.id} className='contact-list-item'>
//                     <div className='contact-avatar' style={{
//                         backgroundImage: 'url($contact.avartarURL)'
//                     }}/>
//                     <div>
//                         <p>{contact.name}</p>
//                         <p>{contact.email}</p>
//
//                     </div>
//                     <button onClick={() => props.onDeleteContact(contact)}
//                                                 className='contact-remove'>
//                         <p>Remove</p>
//                     </button>
//                 </li>
//             ))}
//
//         </ol>
//     )
// }

// ListContacts.propTypes = {
//     contacts: PropTypes.array.isRequired , //especificação de tipo array
//     onDeleteContacts: PropTypes.func.isRequireds //especificação de tipo func (function)
//
// }

class ListContacts extends Component{

    static propTypes = {
        contacts: PropTypes.array.isRequired , //especificação de tipo array
        onDeleteContacts: PropTypes.func.isRequired //especificação de tipo func (function)
    }

    state = {
        query:''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})// .trim exlui espaços sobrando
    }

    clearQuery = ()=>{
        this.setState({query:''})
    }

    render(){

        const{contacts, onDeleteContact} = this.props
        const {query} = this.state


        let showingContacts
        if(query){
            const match = new RegExp(escapeRegExp(query),'i') //i == ignore case
            showingContacts = contacts.filter((contact)=>  match.test(contact.name))
        }else{
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))    //ordem alfabetica


        return (
            <div className='list-contacts'>
                '<div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={this.state.query}
                        onChange={(event)=> this.updateQuery(event.target.value)}
                    />
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showingContacts.length} of {contacts.length} total.</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showingContacts.map((contact) =>(
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: 'url($contact.avartarURL)'
                            }}/>
                            <div>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>

                            </div>
                            <button onClick={()=>onDeleteContact(contact)} className='contact-remove'>
                                <p>Remove</p>
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts //exportar aqui para importar em outro arquivo
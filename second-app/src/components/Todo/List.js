import React, {useState} from 'react';

const ListOfElement = ({arr}) => {
    const [selectedName, setSelectedName] = useState(null);

    const addSomething = (name) => {
        setSelectedName(name);
    }
return (
    <div>
        <ul>
        {arr.map(item =>{
            
          return (<li key={item.id}>
            {selectedName === item.name && `!!!`}
            {item.name}
            <button onClick={() => addSomething(item.name)}>Изменить кое-что</button>
          </li>
        )}
        )}
      </ul>
      </div>
)
}

export default ListOfElement;

// {
//     arr :[
//         {id: 1, name: 'Alice', age: 25},
//         {id: 2, name: 'Bob', age: 30},
//         {id: 3, name: 'Charlie', age: 40}
//       ]
//   }
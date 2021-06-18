import React from 'react';
import styles from '../../../styles/createsawblades/createInputComponent.module.css'


const CreateInputComponent = ({setSelectorValue, setSerialInput, createNewBladeHandler}) => {
    return (
        <div className={styles.container}>


<select onChange={(e) => setSelectorValue(e.target.value)} name="sagblad" id="sagblad">
  <option value="Kanefusa 2.2-3.6">Kanefusa 2.2-3.6</option>
  <option value="Kanefusa 2.4-3.8">Kanefusa 2.4-3.8</option>
  <option value="Kanefusa 2.6-4.0">Kanefusa 2.6-4.0</option>
  <option value="Kanefusa 2.8-4.2">Kanefusa 2.8-4.2</option>
  <option value="Kanefusa 3.0-4.4">Kanefusa 3.0-4.2</option>
  <option value="Kanefusa 3.2-4.6">Kanefusa 3.-4.6</option>
  <option value="Kanefusa N-blad">Kanefusa N-blad</option>
  <option value="Kanefusa VS-66 venstre">Kanefusa VS-66 venstre</option>
  <option value="Kanefusa VS-66 høyre">Kanefusa VS-66 høyre</option>
  <option value="Kanefusa VS-66 venstre F">Kanefusa VS-66 venstre F</option>
  <option value="Kanefusa VS-66 høyre F">Kanefusa VS-66 høyre F</option>
  <option value="Nessjø VS-66 venstre">Nessjø VS-66 venstre</option>
  <option value="Nessjø VS-66 høyre">Nessjø VS-66 høyre</option>
</select> 
<input onChange={(e) => setSerialInput(e.target.value)} placeholder='Serienummer'/>
<button onClick={createNewBladeHandler}>Legg til</button>
        </div>
    )
}

export default CreateInputComponent
import { useEffect, useRef, useState } from 'react';
import './App.css';




let disableKeys = false;
let trackSize = 0;
let v1 = ['rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)']
let v2 = ['rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)']
let v3 = ['rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)']
let v4 = ['rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)']
let v5 = ['rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)']
let v6 = ['rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)', 'rgb(54, 54, 54)']
let isDone = [false, false, false, false, false, false];
const btnarr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
function App() {
  const [first, setfirst] = useState([])
  const [second, setsecond] = useState([])
  const [third, setthird] = useState([])
  const [forth, setforth] = useState([])
  const [fifth, setfifth] = useState([])
  const [sixth, setsixth] = useState([])

  const [result, setResult] = useState('');

  const answer = useRef('');

  const handlePress = (letter) => {

    if (!disableKeys) {
      setResult('')
      if (first.length < 5) {
        setfirst([...first, letter])
        trackSize++;
      } else if (second.length < 5) {
        setsecond([...second, letter])
        trackSize++;
      } else if (third.length < 5) {
        setthird([...third, letter])
        trackSize++;
      } else if (forth.length < 5) {
        setforth([...forth, letter])
        trackSize++;
      } else if (fifth.length < 5) {
        setfifth([...fifth, letter])
        trackSize++;
      } else if (sixth.length < 5) {
        setsixth([...sixth, letter])
        trackSize++;
      }
    }

  }


  //rules for validation
  //set color green if the position of letter matches answer's letter
  //set color gray is letter not found in that position
  //set color yellow if position not matches but letter includes in answer



  //set color of each letter
  useEffect(() => {
    if (trackSize >= 5) {
      disableKeys = true;
    }
    (async () => {
     await fetchanswer();
    })();

  }, [first, second, third, forth, fifth, sixth])

  function fetchanswer() {
    fetch('https://wordle-answers-solutions.p.rapidapi.com/today', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0a01d435b7msh8dd84c917741e80p1d409fjsn567d6737295a',
        'X-RapidAPI-Host': 'wordle-answers-solutions.p.rapidapi.com'
      }
    })
      .then((response) => response.json())
      .then(data => answer.current = data.today)
      
  }

const checkResult = () => {
  if (first.toString().replaceAll(',', '') === answer.current
    || second.toString().replaceAll(',', '') === answer.current
    || third.toString().replaceAll(',', '') === answer.current
    || forth.toString().replaceAll(',', '') === answer.current
    || fifth.toString().replaceAll(',', '') === answer.current
    || sixth.toString().replaceAll(',', '') === answer.current) {
    setResult('you win!')
    if (!isDone[0]) {
      v1 = ['green', 'green', 'green', 'green', 'green'];
    } else if (!isDone[1]) {
      v2 = ['green', 'green', 'green', 'green', 'green'];
    } else if (!isDone[2]) {
      v3 = ['green', 'green', 'green', 'green', 'green'];
    } else if (!isDone[3]) {
      v4 = ['green', 'green', 'green', 'green', 'green'];
    } else if (!isDone[4]) {
      v5 = ['green', 'green', 'green', 'green', 'green'];
    } else if (!isDone[5]) {
      v6 = ['green', 'green', 'green', 'green', 'green'];
    }
    trackSize = 0;
  } else if (first.length >= 5 && !isDone[0]) {
    isDone[0] = true;
    setResult('no match')
    disableKeys = false;
    trackSize = 0;
    console.log("first result")
    setFieldColor(answer.current, first, v1);
  } else if (second.length >= 5 && !isDone[1]) {
    isDone[1] = true;
    setResult('no match')
    disableKeys = false;
    trackSize = 0;
    console.log("second result")
    setFieldColor(answer.current, second, v2);
  } else if (third.length >= 5 && !isDone[2]) {
    isDone[2] = true;
    setResult('no match')
    disableKeys = false;
    trackSize = 0;
    console.log("third result")
    setFieldColor(answer.current, third, v3);
  } else if (forth.length >= 5 && !isDone[3]) {
    isDone[3] = true;
    setResult('no match')
    disableKeys = false;
    trackSize = 0;
    console.log("forth result")
    setFieldColor(answer.current, forth, v4);
  } else if (fifth.length >= 5 && !isDone[4]) {
    isDone[4] = true;
    setResult('no match')
    disableKeys = false;
    trackSize = 0;
    console.log("fifth result")
    setFieldColor(answer.current, fifth, v5);
  } else if (sixth.length >= 5 && !isDone[5]) {
    isDone[5] = true;
    setResult('You lost!')
    disableKeys = false;
    trackSize = 0;
    console.log("sixth result")
    setFieldColor(answer.current, sixth, v6);
  }
}


const setFieldColor = (answer, field, v) => {
  if (answer.includes(field[0])) {
    if (answer.indexOf(field[0]) === 0) {
      v[0] = 'green';
    } else {
      v[0] = 'yellow';
    }
  } else {
    v[0] = 'gray';
  }

  if (answer.includes(field[1])) {
    if (answer.indexOf(field[1]) === 1) {
      v[1] = 'green';
    } else {
      v[1] = 'yellow';
    }
  } else {
    v[1] = 'gray';
  }

  if (answer.includes(field[2])) {
    if (answer.indexOf(field[2]) === 2) {
      v[2] = 'green';
    } else {
      v[2] = 'yellow';
    }
  } else {
    v[2] = 'gray';
  }

  if (answer.includes(field[3])) {
    if (answer.indexOf(field[3]) === 3) {
      v[3] = 'green';
    } else {
      v[3] = 'yellow';
    }
  } else {
    v[3] = 'gray';
  }

  if (answer.includes(field[4])) {
    if (answer.indexOf(field[4]) === 4) {
      v[4] = 'green';
    } else {
      v[4] = 'yellow';
    }
  } else {
    v[4] = 'gray';
  }
}
const deleteField = () => {

  if (trackSize <= 5 && trackSize > 0) {
    if (first.length <= 5 && first.length > 0 && !isDone[0]) {
      setfirst(first.filter((e, i) => {
        if (i < first.length - 1) {
          console.log(e);
          return e;
        }
      }))
      trackSize--;
      disableKeys = false;
      //check if first is done or not add first seperate boolean field or each
    } else if (second.length <= 5 && second.length > 0 && !isDone[1]) {
      setsecond(second.filter((e, i) => {
        if (i < second.length - 1) {
          console.log(e);
          return e;
        }
      }))
      trackSize--;
      disableKeys = false;
    } else if (third.length <= 5 && third.length > 0 && !isDone[2]) {
      setthird(third.filter((e, i) => {
        if (i < third.length - 1) {
          console.log(e);
          return e;
        }
      }))
      trackSize--;
      disableKeys = false;
    } else if (forth.length <= 5 && forth.length > 0 && !isDone[3]) {
      setforth(forth.filter((e, i) => {
        if (i < forth.length - 1) {
          console.log(e);
          return e;
        }
      }))
      trackSize--;
      disableKeys = false;
    } else if (fifth.length <= 5 && fifth.length > 0 && !isDone[4]) {
      setfifth(fifth.filter((e, i) => {
        if (i < fifth.length - 1) {
          console.log(e);
          return e;
        }
      }))
      trackSize--;
      disableKeys = false;
    } else if (sixth.length <= 5 && sixth.length > 0 && !isDone[5]) {
      setsixth(sixth.filter((e, i) => {
        if (i < sixth.length - 1) {
          console.log(e);
          return e;
        }
      }))
      trackSize--;
      disableKeys = false;
    }
  }
}
return (
  <>
  <div className="App">
    <div>
      <h1  style={{color:'#fff'}}>Wordle Clone</h1>
    </div>
    <div className='input-field-container'>
      <div className='five-inputs'>
        <InputField color={v1[0]}>{first[0]}</InputField>
        <InputField color={v1[1]}>{first[1]}</InputField>
        <InputField color={v1[2]}>{first[2]}</InputField>
        <InputField color={v1[3]}>{first[3]}</InputField>
        <InputField color={v1[4]}>{first[4]}</InputField>
      </div>
      <div className='five-inputs'>
        <InputField color={v2[0]}>{second[0]}</InputField>
        <InputField color={v2[1]}>{second[1]}</InputField>
        <InputField color={v2[2]}>{second[2]}</InputField>
        <InputField color={v2[3]}>{second[3]}</InputField>
        <InputField color={v2[4]}>{second[4]}</InputField>
      </div>
      <div className='five-inputs'>
        <InputField color={v3[0]}>{third[0]}</InputField>
        <InputField color={v3[1]}>{third[1]}</InputField>
        <InputField color={v3[2]}>{third[2]}</InputField>
        <InputField color={v3[3]}>{third[3]}</InputField>
        <InputField color={v3[4]}>{third[4]}</InputField>
      </div>
      <div className='five-inputs'>
        <InputField color={v4[0]}>{forth[0]}</InputField>
        <InputField color={v4[1]}>{forth[1]}</InputField>
        <InputField color={v4[2]}>{forth[2]}</InputField>
        <InputField color={v4[3]}>{forth[3]}</InputField>
        <InputField color={v4[4]}>{forth[4]}</InputField>
      </div>
      <div className='five-inputs'>
        <InputField color={v5[0]}>{fifth[0]}</InputField>
        <InputField color={v5[1]}>{fifth[1]}</InputField>
        <InputField color={v5[2]}>{fifth[2]}</InputField>
        <InputField color={v5[3]}>{fifth[3]}</InputField>
        <InputField color={v5[4]}>{fifth[4]}</InputField>
      </div>
      <div className='five-inputs'>
        <InputField color={v6[0]}>{sixth[0]}</InputField>
        <InputField color={v6[1]}>{sixth[1]}</InputField>
        <InputField color={v6[2]}>{sixth[2]}</InputField>
        <InputField color={v6[3]}>{sixth[3]}</InputField>
        <InputField color={v6[4]}>{sixth[4]}</InputField>
      </div>
    </div>
    <div className='btn-container'>
      {
        btnarr.map((e) => {
          return (
            // eslint-disable-next-line
            <a className='btn' onClick={() => {
              handlePress(e)
            }} key={e}>{e}</a>
          )
        })
      }
      {/*eslint-disable-next-line */}
      <a className='btn'  onClick={deleteField}>BACK</a>
      {/*eslint-disable-next-line */}
    <a className='btn'  onClick={checkResult}>ENTER</a>
    </div>
  </div>
  <h5>created by <span href="">sameer</span></h5>
  </>
);
}

export default App;


function InputField(props) {
  return (
    <div className='field' style={{background:`${props.color}`}}>
      <p className='field-value'>{props.children}</p>
    </div>
  )
}
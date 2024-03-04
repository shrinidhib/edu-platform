import './Question.css'

const Question = ({q}) => {
    const {_id, question,options, answer}=q
  return (
    <div>
        <h3>{question}</h3>
        <div className='options-section'>
            <div className='option'>
                <p>A. {options[0]}</p>
            </div>
            <div className='option'>
                <p>B. {options[1]}</p>
            </div>
            <div className='option'>
                <p>C. {options[2]}</p>
            </div>
            <div className='option'>
                <p>D. {options[3]}</p>
            </div>
        </div>
    </div>
  )
}

export default Question

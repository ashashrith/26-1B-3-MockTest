import './index.css'

const DisplayTasks = props => {
  const {item, onClickType, active} = props
  const {optionId, displayText} = item

  const clsBtn = active ? 'active' : 'non-active'

  const onClickBtn = () => {
    onClickType(optionId)
  }

  return (
    <li className="li" key={optionId}>
      <button type="button" className={clsBtn} onClick={onClickBtn}>
        {displayText}
      </button>
    </li>
  )
}

export default DisplayTasks

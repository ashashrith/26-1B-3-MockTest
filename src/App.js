import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import DisplayTasks from './components/DisplayTasks'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeId: '',
    list: [],
    inputText: '',
    text: '',
    selectValue: '',
  }

  onChangeTask = event => {
    this.setState({inputText: event.target.value})
  }

  onClickAddTask = event => {
    event.preventDefault()
    const {inputText, text, list} = this.state

    const object = {
      disText: text,
      content: inputText,
      itemId: uuidv4(),
    }

    this.setState({
      list: [...list, object],
      selectValue: '',
      inputText: '',
    })
  }

  onChangeValue = event => {
    const {selectValue} = this.state
    this.setState({selectValue: event.target.value})

    const filterList = tagsList.filter(each => each.optionId === selectValue)
    this.setState({text: filterList.displayText})
    console.log(filterList)
  }

  onClickType = id => {
    const {activeId, list} = this.state

    if (activeId === id) {
      this.setState({activeId: ''})
    } else {
      this.setState({activeId: id})
    }
  }

  renderFinalList = () => {
    const {list, activeId} = this.state

    const filterList = list.map(each => each.optionId === activeId)

    if (filterList) {
      const optionList = list.filter(each => each.optionId === activeId)
      this.setState({list: optionList})
    }
    return list
  }

  render() {
    const {activeId, list, inputText, selectValue} = this.state

    console.log(selectValue)
    const emptyView = list.length === 0

    const finalList = this.renderFinalList()

    return (
      <div className="bg-container">
        <form className="create-cont" onSubmit={this.onClickAddTask}>
          <h1 className="heading">Create a task!</h1>
          <label className="label" htmlFor="task">
            Task
          </label>
          <input
            type="text"
            className="input"
            value={inputText}
            id="task"
            onChange={this.onChangeTask}
            placeholder="Enter the task here"
          />
          <label className="label" htmlFor="Tags">
            Tags
          </label>
          <select
            className="input"
            id="Tags"
            onChange={this.onChangeValue}
            value={selectValue}
          >
            {tagsList.map(item => (
              <option key={item.optionId} value={item.optionId}>
                {item.displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="btn">
            Add Task
          </button>
        </form>
        <div className="task-cont">
          <h1 className="head">Tags</h1>
          <ul className="ul">
            {tagsList.map(each => (
              <DisplayTasks
                item={each}
                key={each.optionId}
                active={each.optionId === activeId}
                onClickType={this.onClickType}
              />
            ))}
          </ul>
          <h1 className="head">Tasks</h1>
          {emptyView ? (
            <div className="no-cont">
              <p className="head">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="list">
              {finalList.map(each => (
                <li className="item" key={each.itemId}>
                  <p className="task">{each.content}</p>
                  <div className="div">
                    <p className="p">{each.disText}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App

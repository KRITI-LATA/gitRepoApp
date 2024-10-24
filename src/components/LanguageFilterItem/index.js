// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, dataList, setActiveLanguageId} = props
  const {id, language} = dataList
  const btnClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const onClickLanguageButton = () => {
    setActiveLanguageId(id)
  }

  return (
    <li className="filter-list">
      <button
        type="button"
        className={btnClassName}
        onClick={onClickLanguageButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

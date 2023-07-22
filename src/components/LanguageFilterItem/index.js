import './index.css'

const LanguageFilterItem = props => {
  const {allLanguage, activeId, activeIdStatus} = props

  const {language, id} = allLanguage

  const activeBtn = activeId ? 'active-btn' : ''

  const changeActiveId = () => {
    activeIdStatus(id)
  }

  const navLinks = (
    <li className="lang-nav-links">
      <button
        type="button"
        className={`lang-nav-btn ${activeBtn}`}
        onClick={changeActiveId}
      >
        {language}
      </button>
    </li>
  )
  return navLinks
}

export default LanguageFilterItem

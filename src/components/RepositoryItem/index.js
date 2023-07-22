import './index.css'

const RepositoryItem = props => {
  const {repository} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = repository
  const repoList = (
    <li className="repo-list-item">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="info-icons"
        />
        <p className="info-name">{starsCount} stars</p>
      </div>
      <div className="repo-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="info-icons"
        />
        <p className="info-name">{forksCount} forks</p>
      </div>
      <div className="repo-info">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="info-icons"
        />
        <p className="info-name">{issuesCount} issues</p>
      </div>
    </li>
  )
  return repoList
}

export default RepositoryItem

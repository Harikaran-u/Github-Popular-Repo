import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLang: languageFiltersData[0].id,
    repositoryData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getGitRepository()
  }

  getGitRepository = async () => {
    const {activeLang} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLang}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      console.log(popularRepos)
      const updatedData = popularRepos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))

      this.setState({repositoryData: updatedData, isLoading: false})
    } else {
      this.setState({repositoryData: [], isLoading: false})
    }
  }

  activeIdStatus = activeId => {
    this.setState(
      {activeLang: activeId, isLoading: true},
      this.getGitRepository,
    )
  }

  renderGitHome = () => {
    const {repositoryData} = this.state

    const failure = (
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-img"
        />
        <h1 className="failure-head">Somethings Went Wrong</h1>
      </div>
    )

    const gitHome = (
      <>
        <ul className="repository-list">
          {repositoryData.map(eachRepo => (
            <RepositoryItem key={eachRepo.id} repository={eachRepo} />
          ))}
        </ul>
      </>
    )

    const file = repositoryData.length === 0 ? failure : gitHome

    return file
  }

  render() {
    const {isLoading, activeLang} = this.state

    const app = (
      <div className="main-app-cont">
        <h1 className="main-heading">Popular</h1>
        <ul className="repo-nav-list">
          {languageFiltersData.map(eachLang => (
            <LanguageFilterItem
              key={eachLang.id}
              allLanguage={eachLang}
              activeId={eachLang.id === activeLang}
              activeIdStatus={this.activeIdStatus}
            />
          ))}
        </ul>
        {isLoading ? (
          <div data-testid="loader" className="loader-design">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.renderGitHome()
        )}
      </div>
    )

    return app
  }
}

export default GithubPopularRepos

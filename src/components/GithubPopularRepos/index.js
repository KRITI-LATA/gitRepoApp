import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    repositoryData: [],
    activeLanguageFilterId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getGithubRepository()
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  getGithubRepository = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({apiStatus: apiStatusConstant.inProcess})

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchedData = await response.json()
      const upDatedData = fetchedData.popular_repos.map(eachRepository => ({
        id: eachRepository.id,
        name: eachRepository.name,
        issuesCount: eachRepository.issues_count,
        forksCount: eachRepository.forks_count,
        starsCount: eachRepository.stars_count,
        avatarUrl: eachRepository.avatar_url,
      }))
      this.setState({
        repositoryData: upDatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryItem = () => {
    const {repositoryData} = this.state

    return (
      <ul className="repository-list">
        {repositoryData.map(eachData => (
          <RepositoryItem key={eachData.id} repositoryDetails={eachData} />
        ))}
      </ul>
    )
  }

  renderRepositoreies = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderRepositoryItem()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageId = newerFilterId => {
    this.setState(
      {activeLanguageFilterId: newerFilterId},
      this.getGithubRepository,
    )
  }

  renderLanguageFilterItem = () => {
    const {activeLanguageFilterId} = this.state
    return (
      <ul className="filter-list-container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            dataList={eachLanguage}
            key={eachLanguage.id}
            isActive={eachLanguage.id === activeLanguageFilterId}
            setActiveLanguageId={this.setActiveLanguageId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="git-heading">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderRepositoreies()}
      </div>
    )
  }
}
export default GithubPopularRepos

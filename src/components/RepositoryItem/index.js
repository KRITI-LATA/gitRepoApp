// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    forksCount,
    issuesCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repository-list-item">
      <img src={avatarUrl} className="avatar-image" alt={name} />
      <h1 className="repo-heading-text">{name}</h1>
      <div className="count-container">
        <img
          className="count-image"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="count-text">{starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          className="count-image"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="count-text">{forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          className="count-image"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="count-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

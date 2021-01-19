# HowTo
Have a life hack? Share it on how-to. Posts with the most likes / reviews will be at the top of the feed, simplifying life for everyone.

## Backend
Deployed URL https://howtoapi.herokuapp.com/

### Endpoints

#### Methods
| Endpoint | Method | Requirements | Valid Token in Authorization Header |
| -------- | ------ |--------------|-------------------------------------|
| /api/auth/register | POST | username, password | NO |
| /api/auth/login | POST | username, password | NO |
| /api/auth/user | GET | | YES |
| /api/posts | GET |  | YES |
| /api/posts | POST | title, description | YES |
| /api/posts | POST | title, description | YES |
| /api/posts/user/:id | GET | | YES |
| /api/posts/:id | GET | | YES |
| /api/posts/:id | DELETE | | YES |
| /api/posts/:id | PUT | | YES |
| /api/posts/:id/steps | POST | stepName, stepNumber | YES |

#### Schema for /api/posts
| Name | Type | Required |
|------|------|----------|
| title | String | Yes |
| description | String | Yes |
| materials | String | Yes |
| video | String (url) | No |
| instruction | String | No |

#### Schema for /api/posts/:id/steps
| Name | Type | Required |
|------|------|----------|
| posts_id | integer | Yes |
| stepName | String | Yes |
| stepNumber | String | Yes |

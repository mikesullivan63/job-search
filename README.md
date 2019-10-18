[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dab815f74ca248a6a00d73cf22474477)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mikesullivan63/job-search&amp;utm_campaign=Badge_Grade) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/dab815f74ca248a6a00d73cf22474477)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=mikesullivan63/job-search&utm_campaign=Badge_Coverage)

# Common Platform Job Search Tool 

This app is designed to allow users to search job postings in real-time across many of the common Applicant Tracking Systems such as Greenhouse, Lever, and Hire with Google.

It is functional in its current state: users can register and login, a few dozen sites can be searched, and specifc jobs can be tagged for active review, to be ignored, or to be archived. Additional functionality is intended:

- Build out of profile section
- Closer inspection of Active and Ignored jobs
- Removal of current design frameworks to simplify markup and styling
- Introduction of consistent deisgn tools across all pages
- Auth0 integration for additional login support
- Email integration
- TBD

## Technologies (for now)

### Client
React <https://reactjs.org/>
- React DOM <https://www.npmjs.com/package/react-dom>
- React Router DOM <https://www.npmjs.com/package/react-router-dom>

MobX <https://mobx.js.org/README.html> 
- MobX React <https://www.npmjs.com/package/mobx-react>
- MobX State Stree <https://github.com/mobxjs/mobx-state-tree>

Other
- Universal Cookie <https://www.npmjs.com/package/universal-cookie>

Design components (temporary)
- Formik <https://www.npmjs.com/package/formik>
- Foundation <https://www.npmjs.com/package/foundation-sites>
- Styled Components <https://www.npmjs.com/package/styled-components>
- Yup <https://www.npmjs.com/package/yup>

## Backend
Node <https://nodejs.org>
Express <http://expressjs.com/>
- CORS <https://www.npmjs.com/package/cors>
- Request <https://www.npmjs.com/package/request>
- Request-Promise-Native <https://www.npmjs.com/package/request-promise-native>
- Body Parse <https://www.npmjs.com/package/body-parser>

Authentication
- Express JWT <https://www.npmjs.com/package/express-jwt>
- JSON Web Token <https://www.npmjs.com/package/jsonwebtoken>
- Passport <https://www.npmjs.com/package/passport>

Persistence
- Mongoose <https://www.npmjs.com/package/mongoose>

Parsing
- Cheerio <https://www.npmjs.com/package/cheerio>

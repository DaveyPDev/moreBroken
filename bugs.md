## Bug #1 : Express Router Init

    ** Bug Location 
    - File: 'users.js'
    - Line: #005

    ** Description 
    - const router = new express.Router();
    - is using an incorrect syntax using 'new' express.Router() cause an unexpected error

    ** Test
    - File: users.test.js
    - Line: #025

    ** Fix 
    @ const router = express.Router();
      - remove "new" from const router syntax 
    
    
## Bug #2 : Admin

    ** Bug Location
    -File: 'users.js'
    -Line: #072

    ** Description
    - Check if user exists needs added
    - if no user, expressError User not found
    
    // get user before updating changes
    let user = await User.get(req.params.username)
    if (!user) {
      throw new ExpressError('User not found', 404)
    }

## Bug #3 : 
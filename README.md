# capstone-back-end-
back end server 


**********====================
**********===  THE   =========
**********===  KNOT  =========
**********===  LIST  =========
**********====================
==============================
==============================



***************************
***Proposal Requirements***
***************************
- User Stories
- Wireframes
- Models
- Routes


******************
***USER STORIES***
******************


PREFACE: This application is intended for indiviuduals that are either looking for pre-owned wedding items or looking to post items for sale.


1. Users will be able to create accounts and login.


2. Users will create a Profile. (User Model)


3. Users will create listings and enter them into the database. (Listing Model).
	> The Listing will include:
		- Item Name
		- Category
		- Price
		- Description
		- Quantity
		- images

4. Users will have the ability to click on edit to update information about the listing or "remove" it once it is sold. 

5. Users will be able to interact with prospective buyers that are interested in the listing via a comments section that will be present on each listing. 

6. Users will also be able to browse the listings of other users and interact with them by posting comments on their listings to negotiate a deal

7. (Stretch?) Users will be able to narrow the listings index by miles away from their current location.

8. (Stretch?) When browsing the index, Users will be able to narrow the lsitings index by category.

9. (Stretch?) Users will be able to rate their experiences with other users by leaving them a review.

10. (Stretch) Users will be able to send an offer on a listing they are interested in. 

11. (Stretch) Offers will be sent to the listing owner, and can either be accepted or declined.


************
***Models***
************
1. USER
	> ID
	> first_name
	> last_name
	> email
	> location (zip code / city ???)
	> [Listings]
	> [Offers] // email or back up: notifications 

2. Listing
	> ID
	> seller ID
	> Item Name
	> Category
		enum
	> Price
	> Description
	> Quantity
	> images
	> Relationship: belong to a specific user 

3. Review
	> id
	> Seller ID 
	> Reviewer ID
	> Rating of 1-5 enum?
	> Title
	> Description

4. Offers
	> Buyer ID
	<!-- > Seller ID -->
	> Listing ID
	> Price offered
	> Message
	> Accepted / Declined (True or False)



************
***ROUTES***
************

HOME PAGE

	> Login 
		- POST /auth/login
	> Register
		- POST /auth/register

	[REDIRECT TO ACCOUNT PAGE]


ACCOUNT PAGE

	> Show account for logged-in user
		- GET /user/:id
			EDIT User account
				- POST /user
			Update User Account Info
				- PUT /user/:id
			Delete Account
				- DESTROY /user/:id

	> Add Listing
		- POST /Listing 

	> Listing Index
		- GET /Listing

	> Listing Show
		- GET /Listing/:id

			Listing Edit 
				- POST /Listing

			Listing Update
				- PUT /Listing/:id

			Listing Delete
				- DELETE /Listing/:id

LISTINGS INDEX
	
	> Index route for all listings
		GET /Listing

	> Show page for 1 listing
		GET /Listing/:id

*** How should I handle offers with models and routes???

	> Show page for listings that have a specific zip code or category?
		GET /Listing/:zipcode/:category/:inStock

OTHER PAGES
	
	??? - TBD










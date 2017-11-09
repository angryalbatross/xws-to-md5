# X-Wing Universal List Identifier Service ("Ulysses?")

A RESTful API service to assign [MD5 identifiers](https://en.wikipedia.org/wiki/MD5) to the various possible [xws list combinations](https://github.com/elistevens/xws-spec).

## Using the Service

The service supports to calls: users can POST a json xws document to the service and it will respond with a MD5 identifier, and users can GET with a MD5 indentifier and receive back the a json xws document.

### POST with XWS payload
* **URL**
  /api/v1/id
* **Method:**
  `POST`
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ id : "MD5 Identifier" }`
* **Error Response:**
  * **Code:** 400 <br />
    **Content:** `{code: 1, error: 'json not found'  }`
  * **Code** 400 <br />
    **Content** `{code: 2, error: 'invalid xws'}`  
* **Sample Call:**

    curl --request POST \
      --url http://localhost:5000/api/v1/id \
      --header 'content-type: application/json' \
      --data '  {
    					"faction": "imperial",
    					"pilots": [
    						{
    							"name": "deathfire",
    							"ship": "tiebomber",
    							"upgrades": {
    								"bomb": [
    									"connernet"
    								],
    								"missile": [
    									"homingmissiles"
    								],
    								"mod": [
    									"longrangescanners"
    								],
    								"torpedo": [
    									"extramunitions"
    								]
    							}
    						},
    						{
    							"name": "countessryad",
    							"ship": "tiedefender",
    							"upgrades": {
    								"ept": [
    									"crackshot"
    								],
    								"mod": [
    									"twinionenginemkii"
    								],
    								"title": [
    									"tiex7"
    								]
    							}
    						},
    						{
    							"name": "colonelvessery",
    							"ship": "tiedefender",
    							"upgrades": {
    								"ept": [
    									"pushthelimit"
    								],
    								"mod": [
    									"twinionenginemkii"
    								],
    								"title": [
    									"tiex7"
    								]
    							}
    						}
    					],
    					"vendor": {
    						"listjuggler": {}
    					},
    					"version": "4.2.0"
    				}'
* **Notes:**
    None
### GET with MD5 identifer
* **URL**
  /api/v1/$id
* **Method:**
  `GET`
*  **URL Params** 
   **Required:**
   `id=[MD5 identifier]`
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ xws json }`
* **Error Response:**
  * **Code:** 400 Identifier not found <br />
    **Content:** `{error: 'Could not find identifier provided'  }`
* **Sample Call:**
>>http://localhost:5000/api/v1/41e92654aa3426db3fb199f0dff05df1 

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
git clone git@github.com:angryalbatross/xws-to-md5.git # or clone your own fork
cd xws-to-md5
npm install
npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
heroku create
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


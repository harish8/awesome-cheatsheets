/********************************************************************************************
 * SAILS.JS CHEATSHEET
 * REFERENCE: https://sailsjs.com/documentation/reference
 * CONCEPTS: https://sailsjs.com/documentation/concepts
 * APP STRUCTURE: https://sailsjs.com/documentation/anatomy
 *
 * 1. APPLICATION
 * 2. BLUEPRINT API
 * 3. COMMAND-LINE INTERFACE
 * 4. CONFIGURATION
 * 5. REQUEST
 * 6. RESPONSE
 * 7. WATERLINE ORM
 * 8. WEBSOCKETS
 ********************************************************************************************/

/********************************************************************************************
 * 1. APPLICATION
 * https://sailsjs.com/documentation/reference/application
 ********************************************************************************************/

// A dictionary of all loaded Sails models, indexed by their identity.
sails.models

// A dictionary of all accessible helpers, including organics.
sails.helpers

// A dictionary of all loaded Sails hooks, indexed by their identity.
sails.hooks

// The full set of configuration options for the Sails instance
// It is assembled automatically when Sails loads your app
// merging together command-line arguments, environment variables, your .sailsrc file,
// and the configuration objects exported from any and all modules in your app's config/ directory.
sails.config

// The runtime values of your app's custom configuration settings.
sails.config.custom

// A set of convenience methods for low - level interaction with connected websockets.
sails.sockets

// Talk to Socket.io directly.
sails.io

// A regular expression designed for use in identifying URL paths that seem like they are probably
// for a static asset of some kind (e.g. image, stylesheet, favicon.ico, robots.txt, etc).
sails.LOOKS_LIKE_ASSET_RX

// Return a dictionary of Sails actions.
sails.getActions()

// Look up the first route pointing at the specified target (e.g. MeController.login)
// and return a dictionary containing its method and URL.
sails.getRouteFor(target)

// Look up the first route pointing at the specified target (e.g. entrance/view-login)
// and return its URL.
sails.getUrlFor(target)

// Lift a Sails app programmatically.
// This does exactly what you might be used to seeing by now when you run sails lift.
sailsApp.lift(configOverrides, function(err) {})

// Load a Sails app into memory-- but without lifting an HTTP server.
// Useful for writing tests, command - line scripts, and scheduled jobs.
sailsApp.load(configOverrides, function(err) {})

// Shut down a lifted Sails app and have it cease listening for / responding to any future requests.
sails.lower(callback)

// Register a new Sails action that can then be bound to a route.
sails.registerAction(action, name)

// Register a new action middleware function that will be applied to actions
// with the specified identities.
sails.registerActionMiddleware(actionMiddlewareFns, actionIdentities)

// Flush and reload all Sails actions.
sails.reloadActions()

// Compile a view into an HTML template.
sails.renderView(pathToView, templateData)

// Make a virtual request to a running Sails instance.
sails.request(request)
sails.request(url, body)
sails.request(url, callback)
sails.request(url, body, callback)

// Access a particular datastore, or the default datastore.
sails.getDatastore(datastoreName)

// Log a message or some data at the "debug" log level using Sails' built-in logger.
sails.log(message)

/********************************************************************************************
 * 2. BLUEPRINT API
 * https://sailsjs.com/documentation/reference/blueprint-api
 ********************************************************************************************/

// Find a list of records that match the specified criteria
// and (if possible) subscribe to each of them.
GET /:model

// Look up the record with the specified id from the database
// and (if possible) subscribe to the record to hear about any future changes.
GET /:model/:id

// Populate and return foreign record(s) for the given association of this record.
GET /:model/:id/:association

// Create a new record in your database
// and notify subscribed sockets that a newly record is created
POST /:model

// Update an existing record in the database
// and notify subscribed sockets that it has changed.
PATCH /:model/:id

// Replace all of the foreign records in one of this record's collections
// and notify subscribed sockets to the parent record.
PUT /:model/:id/:association

// Add a foreign record to one of this record's collections
// and notify subscribed sockets to the parent record.
PUT /:model/:id/:association/:fk

// Delete the record specified by id from the database forever
// and notify subscribed sockets that a record has been deleted
DELETE /:model/:id

// Remove a foreign record from one of this record's collections
// and notify subscribed sockets about this removed child
DELETE /:model/:id/:association/:fk

/********************************************************************************************
 * 3. COMMAND-LINE INTERFACE
 * https://sailsjs.com/documentation/reference/command-line-interface
 ********************************************************************************************/

// Lift your Node.js/Sails.js app in interactive mode, and enter the REPL.
// Useful for trying out Waterline queries, quickly managing your data, and checking
// out your project's runtime configuration.
sails console [--dontLift]

// Generate api/models/Foo.js, including attributes with the specified types if provided.
sails generate model

// Generate a standalone action.
sails generate action

// Generate a helper at api/helpers/foo.js.
sails generate helper

// Generate api/controllers/FooController.js, including actions with the specified names if provided.
sails generate controller

// Generate a project hook in api/hooks/foo/.
sails generate hook

// Generate a foo folder containing the files necessary for building a new generator.
sails generate generator

// Generate a custom response at api/responses/foo.js
sails generate response

// Generate a api/adapters/foo/ folder containing the files necessary for building a new adapter.
sails generate adapter

// Generate a sails.io.js file at the specified location, overwriting the default sails.io.js if applicable.
sails generate sails.io.js

// Generate api/models/Foo.js and api/controllers/FooController.js.
sails generate api	

// Alias for sails new.
sails generate new

// Experimental. Adds the following files to your app:
// .gitignore, .jshintrc, .editorconfig, .npmignore, .travis.yml, .appveyor.yml
sails generate etc

// Attach the node debugger and lift the sails app; similar to running node--inspect app.js.
// You can then use a tool like the Chrome DevTools to interactively debug your apps.
sails inspect

// Run the Sails app in the current dir
// (if node_modules/sails exists, it will be used instead of the globally installed Sails)
sails lift [--prod] [--port <portNum>] [--verbose] [--silly]

// Create a new sails project.
sails new <yourAppName> [--no-frontend] [--minimal] [--without=package,package,package]

// Get the version of your computer's globally installed Sails command-line tool
// (i.e. the version you installed with npm install -g sails).
sails version

/********************************************************************************************
 * 4. CONFIGURATION
 * https://sailsjs.com/documentation/reference/configuration
 ********************************************************************************************/

// Determines which TCP port your Sails app will use to listen for incoming requests.
sails.config.port

// Declare the host name of your Sails app (By default, Sails will assume localhost).
sails.config.explicitHost

// The runtime “environment” of your Sails app (usually either development or production).
sails.config.environment

// A time limit, in milliseconds, imposed on all hooks in your app (default to 20000)
sails.config.hookTimeout

// Configure SSL settings for HTTPs and WSS
sails.config.ssl

// These configurable settings allow you to configure the blueprint API in Sails.
sails.config.blueprints

// Asynchronous bootstrap function that runs before your Sails app gets lifted (i.e. starts up).
// Can be used for setting up baseline data, running sanity checks on the status of your database...
sails.config.bootstrap

// Custom configuration for your app (one-off settings specific to your application)
// Things like the domain to use when sending emails, or 3rd party API keys for Stripe, Mailgun...
sails.config.custom

// Datastore configurations(or simply datastores) are like "saved settings" for your adapters.
sails.config.datastores

// Configuration for the global variables that Sails exposes by default.
sails.config.globals

// Configuration for your app's underlying HTTP server.
sails.config.http

// Configuration for Sails' built-in internationalization & localization features.
sails.config.i18n

// Configuration for the logger in your Sails app.
sails.config.log

// Your default project-wide model settings.
sails.config.models

// Dictionary that maps policies to an app’s actions.
sails.config.policies

// Configuration for custom (aka "explicit") routes.
sails.config.routes

// Configuration for your app's security settings.
sails.config.security

// Configuration for Sails's built-in session support.
sails.config.session

// Provide transparent access to Socket.io
sails.config.sockets

// Configuration for your app's server-side views.
sails.config.views

/********************************************************************************************
 * 5. REQUEST
 * https://sailsjs.com/documentation/reference/request-req
 ********************************************************************************************/

// The moment that Sails started processing the request, as a Javascript Date object.
req._startTime

// An object containing text parameters from the parsed request body, defaulting to {}.
// If a request contains one or more file uploads, only the text parameters sent before
// the first file parameter will be available in req.body.
req.body

// An object containing all of the unsigned cookies from this request (req).
req.cookies

// A flag indicating the user-agent sending this request (req) wants "fresh" data
// (as indicated by the "if-none-match", "cache-control", and/or "if-modified-since" request headers.)
req.fresh

// An object containing pre-defined/custom header given in the current request.
req.headers

// Returns the hostname supplied in the host HTTP header.
// This header may be set either by the client or by the proxy.
req.hostname

// The IP address of the client who sent this request (req).
req.ip

// Contains the IP addresses in this request's "X-Forwarded-For" header
// as an array of the IP address strings.
req.ips

// A flag indicating whether or not this request (req) originated from a Socket.io connection.
req.isSocket

// The request method (aka "verb".)
// All requests to a Sails server have a "method", even via WebSockets.
req.method

// Dictionary (plain JavaScript object) of request-agnostic settings available in your app's actions.
req.options

// Retains the original request URL allowing you to rewrite req.url freely for internal routing purposes.
// In almost all cases, you’ll want to use req.url instead.
req.originalUrl

// An object containing parameter values parsed from the URL path.
req.params

// The URL pathname from the request URL string of the current request (req).
req.path

// The protocol used to send this request (req).
req.protocol

// A dictionary containing the parsed query-string, defaulting to {}.
req.query

// Indicates whether or not the request was sent over a secure TLS connection (i.e. https:// or wss://).
req.secure

// A dictionary containing all of the signed cookies from this request (req).
req.signedCookies

// If the current Request (req) originated from a connected Socket.io client,
// req.socket refers to the raw Socket.io socket instance.
req.socket

// An array of all the subdomains in this request's URL.
req.subdomains

// Like req.path, but also includes the query string suffix.
req.url

// A flag indicating whether the requesting client would prefer a JSON response
// (as opposed to some other format, like XML or HTML.)
req.wantsJSON

// A flag indicating whether the current request (req) appears to be an AJAX request.
req.xhr

// Return whether this request (req) advertises that it understands the specified media type.
req.accepts(mediaType)

// Return whether this request (req) advertises that it is able to handle any of the specified
// character set(s), and if so, which one.
req.acceptsCharsets(charset1, charset2, …)

// Return whether this request (req) advertises that it understands any of the specified
// language(s), and if so, which one.
req.acceptsLanguages(language1, language2, …)

// Returns the value of all parameters sent in the request, merged together into a single dictionary
req.allParams()

// Build and return a Skipper Upstream representing an incoming multipart file upload from the specified field.
req.file(field)

// Returns the value of the specified header field in this request (req). Note that header names are case-insensitive.
req.get(header)

// Returns true if this request's declared "Content-Type" matches the specified media/mime type.
req.is(type)

// Returns the value of the parameter with the specified name.
req.param(name[, defaultValue])

// Override the inferred locale for this request.
req.setLocale(override)

// Time out this request if a response is not sent within the specified number of milliseconds.
req.setTimeout(numMilliseconds)

/********************************************************************************************
 * 6. RESPONSE
 * https://sailsjs.com/documentation/reference/response-res
 ********************************************************************************************/

// Indicate to a web browser or other user agent that an outgoing file download sent
// in this response should be "Saved as..." rather than "Opened", and optionally specify the
// name for the newly downloaded file on disk.
res.attachment([filename])

// This method is used to send a 200 ("OK") response back down to the client.
res.ok(data)

// This method is used to send a 400 ("Bad Request") response back down
// to the client indicating that the request is invalid.
res.badRequest(data)

// This method is used to send a 403 ("Forbidden") response back down
// to the client indicating that the request is not allowed.
res.forbidden()

// This method is used to send a 404 ("Not Found") response using either res.json() or res.view().
res.notFound()

// This method is used to send a 500 ("Server Error") response back down to the client indicating
// that some kind of server error occurred (i.e. the error is not the requesting user agent's fault).
res.serverError(err)
res.serverError()

// Sets a cookie with name (name) and value (value) to be sent along with the response.
res.cookie(name, value[, options])

// Clears cookie (name) in the response.
res.clearCookie(name[, options])

// Returns the current value of the specified response header (header).
res.get(header)

// Sets specified response header (header) to the specified value (value).
res.set(header, value)
res.set(headers)

// Sends a JSON response composed of a stringified version of the specified data.
res.json([statusCode,] data)

// Send a JSON or JSONP response.
res.jsonp()

// Sets the "Location" response header to the specified URL expression(url).
res.location(url)

// Redirect the requesting user-agent to the given absolute or relative url.
res.redirect(url)
res.redirect(statusCode, url)

// Send a string response in a format other than JSON (XML, CSV, plain text, etc.
// If you want to send a dictionary or JSON, use res.json().
// If you want to send a custom status code, call req.status() first.
res.send([string])

// Set the status code of this response.
res.status(statusCode)

// Sets the "Content-Type" response header to the specified type.
res.type(type)

// Respond with an HTML page.
res.view(pathToView, locals)
res.view(pathToView)
res.view(locals)
res.view()

/********************************************************************************************
 * 7. WATERLINE ORM
 * https://sailsjs.com/documentation/reference/waterline-orm
 ********************************************************************************************/

/********************************************************************************************
 * 8. WEB SOCKETS
 * https://sailsjs.com/documentation/reference/web-sockets
 ********************************************************************************************/

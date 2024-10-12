import { httpRouter } from 'convex/server';

import { setOfflineRoute } from './actions';

const http = httpRouter();

http.route({
	path: '/setOffline',
	method: 'POST',
	handler: setOfflineRoute,
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;

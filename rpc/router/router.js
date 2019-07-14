function Router() {
  this.routes = {};
}

Router.prototype.use = function use(route, ...routers) {
  this.routes[route] = routers;
};

Router.prototype.route = function route(route, socket, payload, callback) {
  if (route.length === 0) {
    return callback({ error: 'route not found', message: 'route not found' });
  }
  const routes = this.routes[route[0]];
  return getNext(routes, route, socket, payload, callback, 0)();
};

function getNext(routes, path, socket, payload, callback, i) {
  return function processNext() {
    if (!routes || !routes[i]) {
      return callback({ error: 'route not found', message: 'route not found' });
    }
    if (routes[i] instanceof Router) {
      return routes[i].route(path.slice(1), socket, payload, callback);
    }
    if (typeof routes[i] === 'function') {
      return routes[i](socket, payload, callback, getNext(routes, path, socket, payload, callback, i + 1));
    }
    return callback({ error: 'route not found', message: 'route not found' });
  };
}

module.exports = function createRouter() {
  return new Router();
};

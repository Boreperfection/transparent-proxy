/**
 *
 * @param {net.Socket} socket
 * @param data
 */
function socketWrite(socket, data) {
    if (socket && !socket.destroyed) {
        socket.write(data);
    }
}

/**
 *
 * @param {net.Socket} socket
 */
function socketDestroy(socket) {
    if (socket && !socket.destroyed) {
        socket.destroy();
    }
}

class Session extends Object {
    /**
     *
     * @param {string} id
     */
    constructor(id) {
        super();

        this._id = id;
        this._src = null;
        this._dst = null;
        this._tunnel = {};
        this.user = null;
        this.authenticated = false;
    }

    /**
     *
     * @param {buffer|string} data - The data to send.
     */
    clientRequestWrite(data) {
        socketWrite(this._dst, data);
    }

    /**
     *
     * @param {buffer|string} data - The data to send.
     */
    clientResponseWrite(data) {
        socketWrite(this._src, data);
    }

    /**
     *
     */
    destroy() {
        if (this._dst) {
            socketDestroy(this._dst);
        }
        if (this._src) {
            socketDestroy(this._src);
        }
    }

    /**
     *
     * @returns {boolean|null}
     */
    isAuthenticated() {
        return this.authenticated;
    }

    /**
     *
     * @param {net.Socket} socket
     * @returns {Session}
     */
    setResponseSocket(socket) {
        this._src = socket;
        return this;
    }

    /**
     *
     * @param {net.Socket} socket
     * @returns {Session}
     */
    setRequestSocket(socket) {
        this._dst = socket;
        return this;
    }

    /**
     *
     * @returns {string}
     */
    getId() {
        return this._id;
    }

    setTunnelOpt(host, port) {
        this._tunnel.ADDRESS = host;
        this._tunnel.PORT = port;
        return this;
    }

    /**
     *
     * @returns {object}
     */
    getTunnelStats() {
        return this._tunnel;
    }
}

module.exports = Session;
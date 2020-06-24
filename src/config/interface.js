let mode = "dev"

let config = {
    api_host: (function (mode) {
        if (mode === "dev") {
            return "http://127.0.0.1:8800/"
        }
        return "http://127.0.0.1:8800/"
    })(mode)
}

export default config

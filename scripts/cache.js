let XPicsartApiKey = null;

class Cache { // Singleton class
    
    constructor() {
        if (!XPicsartApiKey) {
            XPicsartApiKey = 'eyJraWQiOiI5NzIxYmUzNi1iMjcwLTQ5ZDUtOTc1Ni05ZDU5N2M4NmIwNTEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXRoLXNlcnZpY2UtMWE2YWJjN2YtZjcyMS00NGRmLThmYWMtYjZkOGRhMDM5YTQzIiwiYXVkIjoiMjI3ODc3ODkwMDI4MTAyIiwibmJmIjoxNzI0MjMzNjY0LCJzY29wZSI6WyJiMmItYXBpLmdlbl9haSIsImIyYi1hcGkuaW1hZ2VfYXBpIl0sImlzcyI6Imh0dHBzOi8vYXBpLnBpY3NhcnQuY29tL3Rva2VuLXNlcnZpY2UiLCJvd25lcklkIjoiMjI3ODc3ODkwMDI4MTAyIiwiaWF0IjoxNzI0MjMzNjY0LCJqdGkiOiJkNzRjM2FhMS00ZTk3LTQ4MmEtYmIyOS1iMzcxY2Y1ZTFjYTUifQ.IlRiqhz6SEl2wF1pp0JDo7pkpGyht4k-9IV3GwY7B3YRjpfl-PCVwL-uHFGCtaEOJ33YEUGfsYZSIfZpPU01IrW-WQcosPtTSbnEEG_HYXOZZnk6T_o9YlUTOq-y2Y2Ca5o7w64fwMbdfPlZud0YGaxcxwrCI7G0nRlMrUhDDU56T1LA7g4yytFZNhbjT26P2Oe3gp7_ScNaMi0aegP-RUqmLZNPD6IRSmDS_6Xntw2n4riM-fDiJlT-krUdOqI8liUh-cWQvgmxeJz2ZYZfj_zEWKUdR4_yUqiOwGy3ospa27_1bh7MItBUoJ2argm0c1D0acRFbVxzRfQSzOFP6Q';
        }
    }
    writeInCache() {

    }
    readFromCache() {

    }
    find() {

    }
    getAuthKey() {
        return XPicsartApiKey;
    }
    setAuthKey(key) {
        XPicsartApiKey = key;
    }
};

module.exports = {Cache};
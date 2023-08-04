"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventProviders = void 0;
const client_1 = require("./client");
const provider_1 = require("./fcm/provider");
const scheduler_1 = require("./scheduler");
exports.EventProviders = [client_1.ClientRevalidateEventProvider, scheduler_1.SchedulerEventProvider, provider_1.FCMEventProvider];
//# sourceMappingURL=index.js.map
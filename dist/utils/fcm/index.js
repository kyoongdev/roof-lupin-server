"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FCMProvider = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fcm_config_1 = require("./fcm.config");
let FCMProvider = class FCMProvider {
    constructor() {
        this.firebaseApp = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(fcm_config_1.fcmConfig),
        });
    }
    async sendMessage(props) {
        await this.firebaseApp.messaging().send({
            token: props.token,
            notification: {
                title: props.title,
                body: props.body,
            },
            data: {
                title: props.title,
                body: props.body,
                url: props.link,
            },
            android: {
                data: {
                    title: props.title,
                    body: props.body,
                },
            },
            ...(props.link && {
                webpush: {
                    fcmOptions: {
                        link: props.link,
                    },
                    data: {
                        title: props.title,
                        body: props.body,
                    },
                },
            }),
        });
    }
    async sendMessages(props) {
        await this.firebaseApp.messaging().sendEach(props.map((prop) => ({
            token: prop.token,
            notification: {
                title: prop.title,
                body: prop.body,
            },
            data: {
                title: prop.title,
                body: prop.body,
            },
        })));
    }
};
FCMProvider = __decorate([
    (0, common_1.Injectable)()
], FCMProvider);
exports.FCMProvider = FCMProvider;
//# sourceMappingURL=index.js.map
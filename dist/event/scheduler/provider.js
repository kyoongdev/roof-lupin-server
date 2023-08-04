"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerEventProvider = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const node_schedule_1 = __importDefault(require("node-schedule"));
const constants_1 = require("./constants");
let SchedulerEventProvider = class SchedulerEventProvider {
    async createSchedule(jobId, targetDate, callback) {
        node_schedule_1.default.scheduleJob(jobId, targetDate, callback);
    }
    async deleteSchedule(jobId) {
        node_schedule_1.default.cancelJob(jobId);
    }
    async updateSchedule(jobId, targetDate, callback) {
        this.deleteSchedule(jobId);
        this.createSchedule(jobId, targetDate, callback);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.SCHEDULER_EVENT_NAME.SCHEDULER_CREATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date, Function]),
    __metadata("design:returntype", Promise)
], SchedulerEventProvider.prototype, "createSchedule", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.SCHEDULER_EVENT_NAME.SCHEDULER_DELETE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchedulerEventProvider.prototype, "deleteSchedule", null);
__decorate([
    (0, event_emitter_1.OnEvent)(constants_1.SCHEDULER_EVENT_NAME.SCHEDULER_UPDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date, Function]),
    __metadata("design:returntype", Promise)
], SchedulerEventProvider.prototype, "updateSchedule", null);
SchedulerEventProvider = __decorate([
    (0, common_1.Injectable)()
], SchedulerEventProvider);
exports.SchedulerEventProvider = SchedulerEventProvider;
//# sourceMappingURL=provider.js.map
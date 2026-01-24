"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const db_1 = __importDefault(require("../db"));
const argon2_1 = __importDefault(require("argon2"));
class AuthModel {
    // CREATE
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield argon2_1.default.hash(userData.password);
            const created_user = yield db_1.default.user.create({
                data: {
                    user_username: userData.username,
                    user_email: userData.email,
                    user_password_hash: hashedPassword,
                    user_created_at: new Date()
                }
            });
            return created_user;
        });
    }
    // READ
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findFirst({
                where: { user_email: email },
            });
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findFirst({
                where: { user_id: id }
            });
        });
    }
    static validatePassword(orig_password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield argon2_1.default.verify(hashedPassword, orig_password);
        });
    }
}
exports.AuthModel = AuthModel;
//# sourceMappingURL=auth.model.js.map
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
const db_1 = __importDefault(require("./db"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // seeding data into categories table
        const entertainment = yield db_1.default.category.create({
            data: {
                category_name: "Entertainment & Leisure",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const shopping = yield db_1.default.category.create({
            data: {
                category_name: "Shopping",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const essentials = yield db_1.default.category.create({
            data: {
                category_name: "Essentials",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const misc = yield db_1.default.category.create({
            data: {
                category_name: "Miscellaeneous",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const savings = yield db_1.default.category.create({
            data: {
                category_name: "Savings & Investments",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const family = yield db_1.default.category.create({
            data: {
                category_name: "Family & Others",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const education = yield db_1.default.category.create({
            data: {
                category_name: "Education",
                category_type: "EXPENSE",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const salary = yield db_1.default.category.create({
            data: {
                category_name: "Salary",
                category_type: "INCOME",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
        const allowance = yield db_1.default.category.create({
            data: {
                category_name: "Savings & Investments",
                category_type: "INCOME",
                category_icon: null,
                category_isDefault: true,
                user_id: null,
            }
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield db_1.default.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map